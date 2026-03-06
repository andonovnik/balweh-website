<?php

/**
 * Contact Form Handler - GDPR/DSGVO Compliant
 * 
 * Data Processing:
 * - Legal Basis: Art. 6 (1) lit. b DSGVO (contract initiation) & Art. 6 (1) lit. f DSGVO (security)
 * - Collected Data: Name, Email, Phone, Service, Message, IP Address, Timestamp
 * - Purpose: Process contact inquiries, prevent abuse, security monitoring
 * - Retention: Form data (6 months), IP/Rate limiting (1 hour), Logs (30 days), Session (browser close)
 * - Infrastructure: Hostinger International Ltd (hosting provider)
 * - User Rights: Access, rectification, deletion, restriction, objection, portability
 * - Disclosure: See /datenschutz for full privacy policy
 */

// Configure session cookie before starting session
session_set_cookie_params([
    'lifetime' => 3600,
    'path' => '/',
    'domain' => '',
    'secure' => !in_array($_SERVER['HTTP_HOST'] ?? 'localhost', ['localhost', 'localhost:3000']),
    'httponly' => true,
    'samesite' => 'Lax'
]);

// Start session for CSRF validation
session_start();

// Ensure errors are not displayed to the client (rely on server configuration for error levels)
ini_set('display_errors', 0);

// Set response header
header('Content-Type: application/json; charset=utf-8');

// CORS - allow production domains, localhost, and current host (e.g. staging)
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? '';
$current_origin = $host !== '' ? ($scheme . '://' . $host) : '';
$allowed_origins = array_filter([
    'https://balweh.de',
    'https://www.balweh.de',
    'http://localhost:3000',
    $current_origin,
]);
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
    header('Access-Control-Allow-Credentials: true');
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Validate CSRF token
$csrf_token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrf_token)) {
    http_response_code(403);
    echo json_encode(['error' => 'Ungültiger Sicherheitstoken']);
    exit;
}

// Rate limiting - simple file-based rate limiter
$rate_limit_file = sys_get_temp_dir() . '/contact_form_rate_limit.json';
$rate_limit_max = 3; // Max submissions per window
$rate_limit_window = 3600; // 1 hour in seconds
$client_ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

if (file_exists($rate_limit_file)) {
    $raw = file_get_contents($rate_limit_file);
    $decoded = is_string($raw) ? json_decode($raw, true) : null;
    $rate_data = is_array($decoded) ? $decoded : [];

    // Keep only valid timestamps within the rate-limit window for each IP.
    foreach ($rate_data as $ip => $timestamps) {
        if (!is_array($timestamps)) {
            unset($rate_data[$ip]);
            continue;
        }

        $filtered = array_values(array_filter($timestamps, static function ($timestamp) use ($rate_limit_window) {
            return is_int($timestamp) && (time() - $timestamp) < $rate_limit_window;
        }));

        if (count($filtered) === 0) {
            unset($rate_data[$ip]);
        } else {
            $rate_data[$ip] = $filtered;
        }
    }

    if (isset($rate_data[$client_ip]) && count($rate_data[$client_ip]) >= $rate_limit_max) {
        http_response_code(429);
        echo json_encode(['error' => 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.']);
        exit;
    }
} else {
    $rate_data = [];
}

// Record this submission
$rate_data[$client_ip][] = time();
file_put_contents($rate_limit_file, json_encode($rate_data), LOCK_EX);

// Sanitize and validate input
function sanitize_text($data)
{
    // Don't use stripslashes (deprecated magic_quotes legacy)
    // Don't use htmlspecialchars on email body (unnecessary and can break UTF-8)
    return trim($data);
}

// Remove line breaks to prevent header injection
function sanitize_header($data)
{
    return str_replace(["\r", "\n", "\0"], '', trim($data));
}

// Validate and sanitize inputs
$name = sanitize_text($_POST['name'] ?? '');
$email = sanitize_text($_POST['email'] ?? '');
$phone = sanitize_text($_POST['phone'] ?? '');
$service = sanitize_text($_POST['service'] ?? '');
$message = sanitize_text($_POST['message'] ?? '');

// Validate required fields first
if (empty($name)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name ist erforderlich']);
    exit;
}
if (empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'E-Mail ist erforderlich']);
    exit;
}
if (empty($phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Telefonnummer ist erforderlich']);
    exit;
}
if (empty($service)) {
    http_response_code(400);
    echo json_encode(['error' => 'Bitte wählen Sie eine Dienstleistung']);
    exit;
}
if (empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Nachricht ist erforderlich']);
    exit;
}

// Validate length limits to prevent abuse
if (strlen($name) > 100) {
    http_response_code(400);
    echo json_encode(['error' => 'Name ist zu lang (max. 100 Zeichen)']);
    exit;
}
if (strlen($email) > 255) {
    http_response_code(400);
    echo json_encode(['error' => 'E-Mail ist zu lang (max. 255 Zeichen)']);
    exit;
}
if (strlen($phone) > 30) {
    http_response_code(400);
    echo json_encode(['error' => 'Telefonnummer ist zu lang (max. 30 Zeichen)']);
    exit;
}
if (strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['error' => 'Nachricht ist zu lang (max. 5000 Zeichen)']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige E-Mail-Adresse']);
    exit;
}

// Validate phone format (basic check for reasonable phone number)
if (!preg_match('/^[0-9\s\+\-\(\)]{5,30}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Telefonnummer ungültig (mindestens 5 Zeichen erforderlich)']);
    exit;
}

// Map service types to German names (whitelist only)
$service_map = [
    'gebaeudereinigung' => 'Gebäudereinigung',
    'galabau' => 'Garten- und Landschaftsbau',
    'beide' => 'Beide Dienstleistungen'
];

// Reject if service not in whitelist
if (!isset($service_map[$service])) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige Dienstleistung']);
    exit;
}

$service_name = $service_map[$service];

// Prepare email
$to = 'andonov_nikola@outlook.com';
$subject = 'Neue Kontaktanfrage von ' . sanitize_header($name);

// Escape data for email body (prevent any potential issues)
$body = "Neue Kontaktanfrage eingegangen:\n\n";
$body .= "Name: " . $name . "\n";
$body .= "E-Mail: " . $email . "\n";
$body .= "Telefon: " . $phone . "\n";
$body .= "Dienstleistung: " . $service_name . "\n";
$body .= "IP-Adresse: " . $client_ip . "\n";
$body .= "Zeitstempel: " . date('Y-m-d H:i:s') . "\n";
$body .= "\nNachricht:\n";
$body .= $message . "\n";
$body .= "\n" . str_repeat("-", 50) . "\n";
$body .= "Diese E-Mail wurde über das Kontaktformular auf balweh.de versendet.\n";

// Set email headers (use fixed From address to avoid header injection and improve deliverability)
$headers = "From: kontaktformular@balweh.de\r\n";
$headers .= "Reply-To: " . sanitize_header($email) . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Log submission (for security monitoring)
$log_file = sys_get_temp_dir() . '/contact_form_submissions.log';
$log_entry = sprintf(
    "[%s] IP: %s, Email: %s, Name: %s\n",
    date('Y-m-d H:i:s'),
    $client_ip,
    $email,
    $name
);
error_log($log_entry, 3, $log_file);

// Clean up old log entries (delete entries older than 30 days per GDPR)
if (file_exists($log_file) && (time() - filemtime($log_file)) > 86400) { // Check once per day
    $log_contents = file_get_contents($log_file);
    $log_lines = explode("\n", $log_contents);
    $thirty_days_ago = time() - (30 * 86400);
    $new_log = [];

    foreach ($log_lines as $line) {
        if (preg_match('/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]/', $line, $matches)) {
            $log_time = strtotime($matches[1]);
            if ($log_time && $log_time > $thirty_days_ago) {
                $new_log[] = $line;
            }
        }
    }

    if (count($new_log) < count($log_lines)) {
        file_put_contents($log_file, implode("\n", $new_log), LOCK_EX);
    }
}

// Send email
if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(['success' => 'E-Mail erfolgreich versendet']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'E-Mail konnte nicht versendet werden']);
}
