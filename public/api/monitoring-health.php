<?php

// Lightweight monitoring health endpoint for contact form logging/rate limiting.
// Protection model:
// - Requires GET
// - Requires X-Monitor-Key header matching either:
//   1) MONITORING_HEALTH_KEY env var, or
//   2) key in local file: /api/.monitoring-health.key
// - Returns only operational metadata (no personal data)

header('Content-Type: application/json; charset=utf-8');

function count_log_lines($path)
{
    if (!file_exists($path) || !is_readable($path)) {
        return 0;
    }

    $contents = file_get_contents($path);
    if (!is_string($contents) || $contents === '') {
        return 0;
    }

    return substr_count($contents, "\n") + 1;
}

function file_age_seconds($path, $now)
{
    if (!file_exists($path)) {
        return null;
    }

    $modified = filemtime($path);
    if ($modified === false) {
        return null;
    }

    return max(0, $now - $modified);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$expected_key = getenv('MONITORING_HEALTH_KEY') ?: '';
$key_file_path = __DIR__ . '/.monitoring-health.key';

if ($expected_key === '' && file_exists($key_file_path)) {
    $file_key = trim((string) file_get_contents($key_file_path));
    if ($file_key !== '') {
        $expected_key = $file_key;
    }
}
$provided_key = $_SERVER['HTTP_X_MONITOR_KEY'] ?? '';

if ($expected_key === '') {
    http_response_code(503);
    echo json_encode([
        'status' => 'misconfigured',
        'error' => 'Monitoring health key is not configured',
        'hint' => 'Set MONITORING_HEALTH_KEY or create /api/.monitoring-health.key',
    ]);
    exit;
}

if (!hash_equals($expected_key, $provided_key)) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

$now = time();
$log_dir = '/home/u989266693/.logs';
$rate_limit_file = $log_dir . '/contact_form_rate_limit.json';
$log_file = $log_dir . '/contact_form_submissions.log';
$cleanup_marker_file = $log_dir . '/contact_form_log_cleanup.timestamp';

$rate_limit_exists = file_exists($rate_limit_file);
$log_exists = file_exists($log_file);
$marker_exists = file_exists($cleanup_marker_file);

$rate_limit_readable = $rate_limit_exists && is_readable($rate_limit_file);
$log_readable = $log_exists && is_readable($log_file);
$marker_readable = $marker_exists && is_readable($cleanup_marker_file);

$rate_limit_entries = 0;
$rate_limit_unique_ips = 0;
$rate_limit_max_requests_per_ip = 0;
$rate_limit_entries_active = 0;
$rate_limit_unique_ips_active = 0;
$rate_limit_max_requests_per_ip_active = 0;
if ($rate_limit_exists) {
    $raw = file_get_contents($rate_limit_file);
    $decoded = is_string($raw) ? json_decode($raw, true) : null;
    if (is_array($decoded)) {
        $rate_limit_unique_ips = count($decoded);
        foreach ($decoded as $timestamps) {
            if (is_array($timestamps)) {
                $entries_for_ip = count($timestamps);
                $rate_limit_entries += $entries_for_ip;
                if ($entries_for_ip > $rate_limit_max_requests_per_ip) {
                    $rate_limit_max_requests_per_ip = $entries_for_ip;
                }

                $active_entries_for_ip = 0;
                foreach ($timestamps as $timestamp) {
                    if (is_int($timestamp) && ($now - $timestamp) < 3600) {
                        $active_entries_for_ip++;
                    }
                }

                $rate_limit_entries_active += $active_entries_for_ip;
                if ($active_entries_for_ip > 0) {
                    $rate_limit_unique_ips_active++;
                }
                if ($active_entries_for_ip > $rate_limit_max_requests_per_ip_active) {
                    $rate_limit_max_requests_per_ip_active = $active_entries_for_ip;
                }
            }
        }
    }
}

$log_size_bytes = $log_exists ? filesize($log_file) : 0;
$log_last_modified = $log_exists ? filemtime($log_file) : null;
$log_line_count = count_log_lines($log_file);
$log_age_seconds = file_age_seconds($log_file, $now);

$cleanup_marker_time = $marker_readable ? (int) file_get_contents($cleanup_marker_file) : null;
$cleanup_marker_age_seconds = $cleanup_marker_time !== null ? max(0, $now - $cleanup_marker_time) : null;

$cleanup_stale = false;
if ($cleanup_marker_time !== null) {
    $cleanup_stale = ($now - $cleanup_marker_time) > 172800; // 48h threshold
}

$cleanup_recent = $cleanup_marker_time !== null && !$cleanup_stale;



$cron_log_file = $log_dir . '/cron-ran.log';
$cron_log_exists = file_exists($cron_log_file);
$cron_log_readable = $cron_log_exists && is_readable($cron_log_file);
$cron_log_last_modified = $cron_log_exists ? filemtime($cron_log_file) : null;
$cron_log_age_seconds = $cron_log_last_modified !== null ? max(0, $now - $cron_log_last_modified) : null;

$checks = [
    'rate_limit_file_present' => $rate_limit_exists,
    'rate_limit_file_readable' => $rate_limit_readable,
    'log_file_present' => $log_exists,
    'log_file_readable' => $log_readable,
    'cleanup_marker_present' => $marker_exists,
    'cleanup_marker_readable' => $marker_readable,
    'cleanup_marker_stale' => $cleanup_stale,
    'cleanup_recent' => $cleanup_recent,
    'cron_log_present' => $cron_log_exists,
    'cron_log_readable' => $cron_log_readable,
    'cron_log_last_modified' => $cron_log_last_modified,
    'cron_log_age_seconds' => $cron_log_age_seconds,
];

$overall_ok = !$checks['cleanup_marker_stale'];

$warnings = [];

if ($checks['cleanup_marker_stale']) {
    $warnings[] = 'cleanup_marker_stale';
}

if ($log_exists && is_int($log_size_bytes) && $log_size_bytes > 5 * 1024 * 1024) {
    $warnings[] = 'log_file_large';
}

if ($rate_limit_max_requests_per_ip_active >= 3) {
    $warnings[] = 'rate_limit_pressure_high';
}

if (
    $temp_disk_free_bytes !== false
    && $temp_disk_total_bytes !== false
    && $temp_disk_total_bytes > 0
) {
    $free_ratio = $temp_disk_free_bytes / $temp_disk_total_bytes;
    if ($free_ratio < 0.10) {
        $warnings[] = 'temp_disk_low_space';
    }
}

http_response_code($overall_ok ? 200 : 500);

echo json_encode([
    'status' => $overall_ok ? 'ok' : 'warning',
    'timestamp' => date('c', $now),
    'warnings' => $warnings,
    'checks' => $checks,
    'metrics' => [
        'rate_limit_entries_total' => $rate_limit_entries,
        'rate_limit_unique_ips' => $rate_limit_unique_ips,
        'rate_limit_max_requests_per_ip' => $rate_limit_max_requests_per_ip,
        'rate_limit_entries_active' => $rate_limit_entries_active,
        'rate_limit_unique_ips_active' => $rate_limit_unique_ips_active,
        'rate_limit_max_requests_per_ip_active' => $rate_limit_max_requests_per_ip_active,
        'log_size_bytes' => $log_size_bytes,
        'log_line_count' => $log_line_count,
        'log_last_modified_unix' => $log_last_modified,
        'log_last_modified' => $log_last_modified ? date('Y-m-d H:i:s', $log_last_modified) : null,
        'log_age_seconds' => $log_age_seconds,
        'cleanup_marker_unix' => $cleanup_marker_time,
        'cleanup_marker' => $cleanup_marker_time ? date('Y-m-d H:i:s', $cleanup_marker_time) : null,
        'cleanup_marker_age_seconds' => $cleanup_marker_age_seconds,
        'last_cleanup_run_unix' => $cleanup_marker_time,
        'last_cleanup_run' => $cleanup_marker_time ? date('Y-m-d H:i:s', $cleanup_marker_time) : null,
        'cron_log_present' => $cron_log_exists,
        'cron_log_readable' => $cron_log_readable,
        'cron_log_last_modified_unix' => $cron_log_last_modified,
        'cron_log_last_modified' => $cron_log_last_modified ? date('Y-m-d H:i:s', $cron_log_last_modified) : null,
        'cron_log_age_seconds' => $cron_log_age_seconds,
        'temp_disk_free_bytes' => $temp_disk_free_bytes === false ? null : $temp_disk_free_bytes,
        'temp_disk_total_bytes' => $temp_disk_total_bytes === false ? null : $temp_disk_total_bytes,
        'runtime_php_version' => PHP_VERSION,
        'runtime_sapi' => PHP_SAPI,
        'retention_log_days' => 30,
        'retention_rate_limit_seconds' => 3600,
    ],
], JSON_UNESCAPED_SLASHES);
