<?php
// Configure session cookie before starting session
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '',
    'secure' => !in_array($_SERVER['HTTP_HOST'] ?? 'localhost', ['localhost', 'localhost:3000']),
    'httponly' => true,
    'samesite' => 'Lax'
]);

// Start session for CSRF token
session_start();

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
    header('Access-Control-Allow-Credentials: true');
}

// Generate CSRF token if not exists
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Return the token
echo json_encode(['csrf_token' => $_SESSION['csrf_token']]);
