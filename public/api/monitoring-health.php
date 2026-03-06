<?php

// Lightweight monitoring health endpoint for contact form logging/rate limiting.
// Protection model:
// - Requires GET
// - Requires X-Monitor-Key header matching either:
//   1) MONITORING_HEALTH_KEY env var, or
//   2) key in local file: /api/.monitoring-health.key
// - Returns only operational metadata (no personal data)

header('Content-Type: application/json; charset=utf-8');

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
$temp_dir = sys_get_temp_dir();
$rate_limit_file = $temp_dir . '/contact_form_rate_limit.json';
$log_file = $temp_dir . '/contact_form_submissions.log';
$cleanup_marker_file = $temp_dir . '/contact_form_log_cleanup.timestamp';

$rate_limit_exists = file_exists($rate_limit_file);
$log_exists = file_exists($log_file);
$marker_exists = file_exists($cleanup_marker_file);

$rate_limit_entries = 0;
if ($rate_limit_exists) {
    $raw = file_get_contents($rate_limit_file);
    $decoded = is_string($raw) ? json_decode($raw, true) : null;
    if (is_array($decoded)) {
        foreach ($decoded as $timestamps) {
            if (is_array($timestamps)) {
                $rate_limit_entries += count($timestamps);
            }
        }
    }
}

$log_size_bytes = $log_exists ? filesize($log_file) : 0;
$log_last_modified = $log_exists ? filemtime($log_file) : null;
$cleanup_marker_time = $marker_exists ? (int) file_get_contents($cleanup_marker_file) : null;

$cleanup_stale = false;
if ($cleanup_marker_time !== null) {
    $cleanup_stale = ($now - $cleanup_marker_time) > 172800; // 48h threshold
}

$checks = [
    'temp_dir_writable' => is_writable($temp_dir),
    'rate_limit_file_present' => $rate_limit_exists,
    'log_file_present' => $log_exists,
    'cleanup_marker_present' => $marker_exists,
    'cleanup_marker_stale' => $cleanup_stale,
];

$overall_ok = $checks['temp_dir_writable'] && !$checks['cleanup_marker_stale'];

http_response_code($overall_ok ? 200 : 500);

echo json_encode([
    'status' => $overall_ok ? 'ok' : 'warning',
    'timestamp' => date('c', $now),
    'checks' => $checks,
    'metrics' => [
        'rate_limit_entries_total' => $rate_limit_entries,
        'log_size_bytes' => $log_size_bytes,
        'log_last_modified_unix' => $log_last_modified,
        'cleanup_marker_unix' => $cleanup_marker_time,
    ],
], JSON_UNESCAPED_SLASHES);
