<?php
require_once 'db_connect.php';

session_start();
$response = ['success' => false, 'errors' => []];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $password = $_POST["password"] ?? '';

    if (empty($email)) $response['errors'][] = "Email is required";
    if (empty($password)) $response['errors'][] = "Password is required";

    if (empty($response['errors'])) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
                
                $response['success'] = true;
                $response['message'] = "Login successful!";
                $response['redirect'] = "index.html";
            } else {
                $response['errors'][] = "Invalid email or password";
            }
        } catch (PDOException $e) {
            $response['errors'][] = "Database error: " . $e->getMessage();
        }
    }
}

echo json_encode($response);
?>