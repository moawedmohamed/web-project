<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'db_connect.php';

$response = ['success' => false, 'errors' => []];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = trim($_POST["first_name"] ?? '');
    $last_name = trim($_POST["last_name"] ?? '');
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $password = $_POST["password"] ?? '';
    $confirm_password = $_POST["confirm_password"] ?? '';

    // التحقق من الصحة
    if (empty($first_name)) $response['errors'][] = "First name is required";
    if (empty($last_name)) $response['errors'][] = "Last name is required";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $response['errors'][] = "Invalid email format";
    if (strlen($password) < 6) $response['errors'][] = "Password must be at least 6 characters";
    if ($password !== $confirm_password) $response['errors'][] = "Passwords do not match";

    if (empty($response['errors'])) {
        try {
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->rowCount() > 0) {
                $response['errors'][] = "Email already exists";
            } else {
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $pdo->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
                $stmt->execute([$first_name, $last_name, $email, $hashed_password]);
                
                $response['success'] = true;
                $response['message'] = "Registration successful!";
            }
        } catch (PDOException $e) {
            $response['errors'][] = "Database error: " . $e->getMessage();
        }
    }
} else {
    $response['errors'][] = "Invalid request method";
}

echo json_encode($response);
