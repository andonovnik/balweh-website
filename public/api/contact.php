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

// Load PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

// Load key=value entries from local .env file for environments without process env vars.
function load_local_env_file($env_path)
{
    if (!file_exists($env_path) || !is_readable($env_path)) {
        return;
    }

    $lines = file($env_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!is_array($lines)) {
        return;
    }

    foreach ($lines as $line) {
        $trimmed = trim($line);
        if ($trimmed === '' || strpos($trimmed, '#') === 0) {
            continue;
        }

        $parts = explode('=', $trimmed, 2);
        if (count($parts) !== 2) {
            continue;
        }

        $key = trim($parts[0]);
        $value = trim($parts[1]);
        if ($key === '') {
            continue;
        }

        // Strip optional wrapping quotes from values.
        $len = strlen($value);
        if ($len >= 2) {
            $first = $value[0];
            $last = $value[$len - 1];
            if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                $value = substr($value, 1, -1);
            }
        }

        putenv($key . '=' . $value);
        $_ENV[$key] = $value;
    }
}

function send_email_smtp($smtp_config, $to, $subject, $body, $from_email, $from_name, $reply_to_email = null, $reply_to_name = null, $is_auto_reply = false, $is_html = false, $alt_body = '')
{
    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = $smtp_config['host'];
        $mail->Port = (int) $smtp_config['port'];
        $mail->SMTPAuth = true;
        $mail->Username = $smtp_config['username'];
        $mail->Password = $smtp_config['password'];
        // Hostinger commonly uses SMTPS on 465 and STARTTLS on 587.
        if ((int) $smtp_config['port'] === 465) {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } else {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        }
        $mail->CharSet = 'UTF-8';
        $mail->Hostname = 'balweh.de';
        $mail->MessageID = '<' . uniqid('contact_', true) . '@balweh.de>';
        $mail->XMailer = 'Balweh Contact API';

        $mail->setFrom($from_email, $from_name);
        $mail->addAddress($to);

        if (!empty($reply_to_email)) {
            $mail->addReplyTo($reply_to_email, $reply_to_name ?: '');
        }

        if ($is_auto_reply) {
            // Mark autoresponses explicitly to help mailbox providers classify them correctly.
            $mail->addCustomHeader('Auto-Submitted', 'auto-replied');
            $mail->addCustomHeader('X-Auto-Response-Suppress', 'All');
        }

        $mail->isHTML($is_html);
        $mail->Subject = $subject;
        $mail->Body = $body;
        if ($is_html) {
            $mail->AltBody = $alt_body !== '' ? $alt_body : trim(strip_tags(str_replace(['<br>', '<br/>', '<br />'], "\n", $body)));
        }

        $sent = $mail->send();
        return [
            'success' => (bool) $sent,
            'error' => ''
        ];
    } catch (Exception $e) {
        $smtp_error = $mail->ErrorInfo ?: $e->getMessage();
        error_log('PHPMailer SMTP error: ' . $smtp_error);
        return [
            'success' => false,
            'error' => $smtp_error
        ];
    }
}

function resolve_client_ip()
{
    // Prefer proxy-forwarded client IP when available (common on shared hosting/CDN setups).
    $candidates = [];

    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        $candidates[] = trim((string) $_SERVER['HTTP_CF_CONNECTING_IP']);
    }

    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $forwarded = explode(',', (string) $_SERVER['HTTP_X_FORWARDED_FOR']);
        if (isset($forwarded[0])) {
            $candidates[] = trim($forwarded[0]);
        }
    }

    if (!empty($_SERVER['REMOTE_ADDR'])) {
        $candidates[] = trim((string) $_SERVER['REMOTE_ADDR']);
    }

    foreach ($candidates as $candidate) {
        if (filter_var($candidate, FILTER_VALIDATE_IP)) {
            return $candidate;
        }
    }

    return 'unknown';
}

load_local_env_file(__DIR__ . '/.env');

// Load SMTP configuration from environment or config file
$smtp_config = [
    'host' => getenv('SMTP_HOST') ?: 'smtp.hostinger.com',
    'port' => getenv('SMTP_PORT') ?: 465,
    'username' => getenv('SMTP_USERNAME') ?: 'no-reply@balweh.de',
    'password' => getenv('SMTP_PASSWORD') ?: '', // MUST be set via environment variable or .htaccess
    'from_email' => getenv('SMTP_FROM_EMAIL') ?: 'no-reply@balweh.de',
    'from_name' => getenv('SMTP_FROM_NAME') ?: 'Balweh Gebäudereinigung und Galabau'
];

// Configure session cookie before starting session
session_set_cookie_params([
    'lifetime' => 0,
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
$log_dir = '/home/u989266693/.logs';
$rate_limit_file = $log_dir . '/contact_form_rate_limit.json';
$rate_limit_max = 3;
$rate_limit_window = 3600;
$client_ip = resolve_client_ip();

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
        $oldest = min($rate_data[$client_ip]);
        $retry_after = max(1, $rate_limit_window - (time() - $oldest));
        header('Retry-After: ' . (string) $retry_after);
        http_response_code(429);
        echo json_encode([
            'error' => 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
            'retry_after' => $retry_after
        ]);
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
$to = 'info@balweh.de';
$subject = 'Neue Kontaktanfrage von ' . sanitize_header($name);

// Escape data for email body (prevent any potential issues)
$body = "Neue Kontaktanfrage eingegangen:\n\n";
$body .= "Name: " . $name . "\n";
$body .= "E-Mail: " . $email . "\n";
$body .= "Telefon: " . $phone . "\n";
$body .= "Dienstleistung: " . $service_name . "\n";
$body .= "Zeitstempel: " . date('Y-m-d H:i:s') . "\n";
$body .= "\nNachricht:\n";
$body .= $message . "\n";
$body .= "\n" . str_repeat("-", 50) . "\n";
$body .= "Diese E-Mail wurde über das Kontaktformular auf balweh.de versendet.\n";

// Log submission (for security monitoring)
$log_file = $log_dir . '/contact_form_submissions.log';
$cleanup_marker_file = $log_dir . '/contact_form_log_cleanup.timestamp';

// Run retention cleanup at most once per day using an independent marker file.
$should_run_cleanup = true;
if (file_exists($cleanup_marker_file)) {
    $last_cleanup = (int) file_get_contents($cleanup_marker_file);
    $should_run_cleanup = (time() - $last_cleanup) > 86400;
}

if ($should_run_cleanup && file_exists($log_file)) {
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

    file_put_contents($log_file, implode("\n", $new_log), LOCK_EX);
    file_put_contents($cleanup_marker_file, (string) time(), LOCK_EX);
}

$log_entry = sprintf(
    "[%s] IP: %s\n",
    date('Y-m-d H:i:s'),
    $client_ip
);
error_log($log_entry, 3, $log_file);

if ($smtp_config['password'] === '') {
    http_response_code(500);
    echo json_encode(['error' => 'SMTP ist nicht konfiguriert. Bitte kontaktieren Sie den Website-Betreiber.']);
    exit;
}

$from_email = sanitize_header($smtp_config['from_email']);
$from_name = sanitize_header($smtp_config['from_name']);

// Send email to Balweh via SMTP.
$inquiry_result = send_email_smtp(
    $smtp_config,
    $to,
    $subject,
    $body,
    $from_email,
    $from_name,
    $email,
    $name
);

if ($inquiry_result['success']) {
    // Auto-reply should not block contact form success if delivery fails.
    $auto_reply_subject = 'Ihre Anfrage ist bei uns eingegangen';
    $safe_name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $safe_service_name = htmlspecialchars($service_name, ENT_QUOTES, 'UTF-8');
    $auto_reply_body = '<!doctype html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#17313a;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;"><tr><td align="center" style="padding:34px 18px 36px 18px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;"><tr><td align="center" style="padding:0 12px 24px 12px;"><img src="https://staging.balweh.de/social/og-image.png" alt="Balweh Logo" width="220" style="display:block;margin:0 auto;outline:none;text-decoration:none;height:auto;max-width:100%;"></td></tr><tr><td style="padding:0 12px 12px 12px;font-size:15px;line-height:1.7;"><h1 style="margin:0 0 14px 0;font-size:29px;line-height:1.2;color:#073646;font-weight:700;">Vielen Dank für Ihre Anfrage</h1><p style="margin:0 0 12px 0;">Hallo ' . $safe_name . ',</p><p style="margin:0 0 12px 0;">wir haben Ihre Anfrage zu <strong style="color:#073646;">' . $safe_service_name . '</strong> erhalten.</p><p style="margin:0 0 18px 0;">Unser Team meldet sich schnellstmöglich bei Ihnen.</p><p style="margin:0;color:#17313a;">Mit freundlichen Grüßen<br><strong>Balweh Gebäudereinigung und Galabau Team</strong></p></td></tr><tr><td style="padding:22px 12px 0 12px;font-size:13px;line-height:1.6;color:#34515b;"><div style="font-weight:700;color:#073646;font-size:14px;">Balweh Gebäudereinigung und Galabau</div><div>Professionelle Gebäudereinigung und Garten- und Landschaftsbau</div><div style="margin-top:10px;">Telefon: <a href="tel:+4915567200971" style="color:#5a7b70;text-decoration:none;font-weight:700;">+49 155 - 67200971</a></div><div>E-Mail: <a href="mailto:info@balweh.de" style="color:#5a7b70;text-decoration:none;">info@balweh.de</a></div><div>Web: <a href="https://balweh.de" style="color:#5a7b70;text-decoration:none;">https://balweh.de</a></div><div style="margin-top:8px;">Rechtliches: <a href="https://balweh.de/impressum" style="color:#5a7b70;text-decoration:none;">Impressum</a> | <a href="https://balweh.de/datenschutz" style="color:#5a7b70;text-decoration:none;">Datenschutz</a></div></td></tr></table></td></tr></table></body></html>';
    $auto_reply_text = "Hallo " . $name . ",\n\n";
    $auto_reply_text .= "vielen Dank für Ihre Anfrage zu \"" . $service_name . "\".\n";
    $auto_reply_text .= "Wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich bei Ihnen.\n\n";
    $auto_reply_text .= "Mit freundlichen Grüßen\n";
    $auto_reply_text .= "Balweh Gebäudereinigung und Galabau\n";
    $auto_reply_text .= "Professionelle Gebäudereinigung & Garten- und Landschaftsbau\n";
    $auto_reply_text .= "Telefon: +49 155 - 67200971\n";
    $auto_reply_text .= "E-Mail: info@balweh.de\n";
    $auto_reply_text .= "Web: https://balweh.de\n";
    $auto_reply_text .= "Impressum: https://balweh.de/impressum\n";
    $auto_reply_text .= "Datenschutz: https://balweh.de/datenschutz\n";

    $auto_reply_result = send_email_smtp(
        $smtp_config,
        $email,
        $auto_reply_subject,
        $auto_reply_body,
        $from_email,
        $from_name,
        null,
        null,
        true,
        true,
        $auto_reply_text
    );

    if (!$auto_reply_result['success']) {
        error_log('Auto-reply email could not be sent for contact form submission from ' . $email);
    }

    http_response_code(200);
    echo json_encode(['success' => 'E-Mail erfolgreich versendet']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'E-Mail konnte nicht versendet werden']);
}
