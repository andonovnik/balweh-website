<?php

// Retention cleanup endpoint for contact form operational files.
// Supports:
// - CLI execution (preferred for cron jobs), no key required
// - HTTP GET execution with key protection
//
// Protected key sources (for HTTP):
// 1) CLEANUP_JOB_KEY env var
// 2) local key file: /api/.log-cleanup.key
//
// Cleanup scope:
// - contact_form_rate_limit.json (remove entries older than 1 hour)
// - contact_form_submissions.log (remove lines older than 30 days)
// - contact_form_log_cleanup.timestamp (update marker)

header('Content-Type: application/json; charset=utf-8');

function get_cleanup_key()
{
    $expected_key = getenv('CLEANUP_JOB_KEY') ?: '';
    $key_file_path = __DIR__ . '/.log-cleanup.key';

    if ($expected_key === '' && file_exists($key_file_path) && is_readable($key_file_path)) {
        $file_key = trim((string) file_get_contents($key_file_path));
        if ($file_key !== '') {
            $expected_key = $file_key;
        }
    }

    return $expected_key;
}

function cleanup_rate_limit_file($path, $window_seconds)
{
    $result = [
        'present' => file_exists($path),
        'entries_before' => 0,
        'entries_after' => 0,
        'ips_before' => 0,
        'ips_after' => 0,
        'removed_entries' => 0,
        'updated' => false,
    ];

    if (!$result['present']) {
        return $result;
    }

    $raw = file_get_contents($path);
    $decoded = is_string($raw) ? json_decode($raw, true) : null;
    if (!is_array($decoded)) {
        $decoded = [];
    }

    $result['ips_before'] = count($decoded);

    $now = time();
    $cleaned = [];
    foreach ($decoded as $ip => $timestamps) {
        if (!is_array($timestamps)) {
            continue;
        }

        $valid_timestamps = array_values(array_filter($timestamps, static function ($timestamp) {
            return is_int($timestamp);
        }));

        $result['entries_before'] += count($valid_timestamps);

        $filtered = array_values(array_filter($valid_timestamps, static function ($timestamp) use ($now, $window_seconds) {
            return ($now - $timestamp) < $window_seconds;
        }));

        if (count($filtered) > 0) {
            $cleaned[$ip] = $filtered;
        }
    }

    $result['ips_after'] = count($cleaned);
    foreach ($cleaned as $timestamps) {
        $result['entries_after'] += count($timestamps);
    }

    $result['removed_entries'] = max(0, $result['entries_before'] - $result['entries_after']);

    file_put_contents($path, json_encode($cleaned), LOCK_EX);
    $result['updated'] = true;

    return $result;
}

function cleanup_log_file($path, $retention_days)
{
    $result = [
        'present' => file_exists($path),
        'lines_before' => 0,
        'lines_after' => 0,
        'removed_lines' => 0,
        'updated' => false,
    ];

    if (!$result['present']) {
        return $result;
    }

    $contents = file_get_contents($path);
    if (!is_string($contents)) {
        return $result;
    }

    $lines = $contents === '' ? [] : explode("\n", $contents);
    $result['lines_before'] = count($lines);

    $threshold = time() - ($retention_days * 86400);
    $new_lines = [];

    foreach ($lines as $line) {
        if (trim($line) === '') {
            continue;
        }

        if (preg_match('/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]/', $line, $matches)) {
            $log_time = strtotime($matches[1]);
            if ($log_time !== false && $log_time > $threshold) {
                $new_lines[] = $line;
            }
        }
    }

    $result['lines_after'] = count($new_lines);
    $result['removed_lines'] = max(0, $result['lines_before'] - $result['lines_after']);

    file_put_contents($path, implode("\n", $new_lines), LOCK_EX);
    $result['updated'] = true;

    return $result;
}

$is_cli = (PHP_SAPI === 'cli');
if (!$is_cli) {
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
    }

    $expected_key = get_cleanup_key();
    if ($expected_key === '') {
        http_response_code(503);
        echo json_encode([
            'status' => 'misconfigured',
            'error' => 'Cleanup job key is not configured',
            'hint' => 'Set CLEANUP_JOB_KEY or create /api/.log-cleanup.key',
        ]);
        exit;
    }

    $provided_key = $_SERVER['HTTP_X_CLEANUP_KEY'] ?? ($_GET['key'] ?? '');
    if (!hash_equals($expected_key, (string) $provided_key)) {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden']);
        exit;
    }
}

$temp_dir = sys_get_temp_dir();
$rate_limit_file = $temp_dir . '/contact_form_rate_limit.json';
$log_file = $temp_dir . '/contact_form_submissions.log';
$cleanup_marker_file = $temp_dir . '/contact_form_log_cleanup.timestamp';

$rate_limit_window_seconds = 3600;
$log_retention_days = 30;

$rate_limit_result = cleanup_rate_limit_file($rate_limit_file, $rate_limit_window_seconds);
$log_result = cleanup_log_file($log_file, $log_retention_days);

file_put_contents($cleanup_marker_file, (string) time(), LOCK_EX);

http_response_code(200);
echo json_encode([
    'status' => 'ok',
    'mode' => $is_cli ? 'cli' : 'http',
    'timestamp' => date('c'),
    'retention' => [
        'rate_limit_seconds' => $rate_limit_window_seconds,
        'log_days' => $log_retention_days,
    ],
    'rate_limit_cleanup' => $rate_limit_result,
    'log_cleanup' => $log_result,
    'cleanup_marker_updated' => true,
], JSON_UNESCAPED_SLASHES);
