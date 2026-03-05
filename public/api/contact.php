<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set response header
header('Content-Type: application/json');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Sanitize and validate input
function sanitize_input($data)
{
    return htmlspecialchars(stripslashes(trim($data)), ENT_QUOTES, 'UTF-8');
}

$name = sanitize_input($_POST['name'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$phone = sanitize_input($_POST['phone'] ?? '');
$service = sanitize_input($_POST['service'] ?? '');
$message = sanitize_input($_POST['message'] ?? '');

// Validate required fields
if (empty($name) || empty($email) || empty($phone) || empty($service) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Alle Felder sind erforderlich']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige E-Mail-Adresse']);
    exit;
}

// Map service types to German names
$service_map = [
    'gebaeudereinigung' => 'Gebäudereinigung',
    'galabau' => 'Garten- & Landschaftsbau',
    'beide' => 'Beide Dienstleistungen'
];

$service_name = $service_map[$service] ?? $service;

// Prepare email
$to = 'andonov_nikola@outlook.com';
$subject = 'Neue Kontaktanfrage von ' . $name;

$body = "Neue Kontaktanfrage eingegangen:\n\n";
$body .= "Name: " . $name . "\n";
$body .= "E-Mail: " . $email . "\n";
$body .= "Telefon: " . $phone . "\n";
$body .= "Dienstleistung: " . $service_name . "\n";
$body .= "\nNachricht:\n";
$body .= $message . "\n";
$body .= "\n" . str_repeat("-", 50) . "\n";
$body .= "Diese E-Mail wurde über das Kontaktformular auf balweh.de versendet.\n";

// Set email headers
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(['success' => 'E-Mail erfolgreich versendet']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'E-Mail konnte nicht versendet werden']);
}
