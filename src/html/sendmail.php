<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = ""; // Default XAMPP password is empty
$dbname = "contact_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Set charset to support UTF-8
$conn->set_charset("utf8");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize input
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST["subject"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Validation
    $errors = [];

    if (strlen($name) < 2) {
        $errors[] = "Name must be at least 2 characters.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email address.";
    }

    if (empty($subject)) {
        $errors[] = "Subject is required.";
    }

    if (strlen($message) < 10) {
        $errors[] = "Message must be at least 10 characters.";
    }

    // If no errors, insert into DB
    if (empty($errors)) {
        $stmt = $conn->prepare("INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $subject, $message);

        if ($stmt->execute()) {
            echo "<h3>✅ Message sent successfully!</h3>";
            echo "<p>Thank you, <strong>$name</strong>. We have received your message.</p>";
        } else {
            echo "<h3>❌ Error!</h3>";
            echo "<p>Something went wrong: " . $stmt->error . "</p>";
        }

        $stmt->close();
    } else {
        // Show validation errors
        echo "<h3>❌ Please fix the following errors:</h3><ul>";
        foreach ($errors as $error) {
            echo "<li>$error</li>";
        }
        echo "</ul>";
    }
}

$conn->close();
?>
