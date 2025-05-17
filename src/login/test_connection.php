<?php
// إظهار جميع الأخطاء للمساعدة في التشخيص
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>اختبار اتصال قاعدة البيانات</h2>";

// معلومات الاتصال
$host = 'localhost';
$dbname = 'login';
$username = 'root';
$password = '';

try {
    // 1. محاولة الاتصال
    echo "<p>جاري محاولة الاتصال بقاعدة البيانات...</p>";
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // 2. اختبار الاتصال الناجح
    echo "<p style='color:green;'>✔ تم الاتصال بنجاح بقاعدة البيانات!</p>";
    
    // 3. اختبار استعلام بسيط
    echo "<h3>اختبار استعلام SELECT</h3>";
    $stmt = $pdo->query("SELECT 1+1 AS result");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "<p>نتيجة استعلام الاختبار: " . $result['result'] . " (يجب أن تكون 2)</p>";
    
    // 4. التحقق من وجود جدول المستخدمين
    echo "<h3>فحص جدول المستخدمين</h3>";
    $stmt = $pdo->query("SHOW TABLES LIKE 'users'");
    if ($stmt->rowCount() > 0) {
        echo "<p style='color:green;'>✔ جدول users موجود</p>";
        
        // 5. عرض هيكل الجدول
        echo "<h4>هيكل جدول users:</h4>";
        $stmt = $pdo->query("DESCRIBE users");
        echo "<table border='1' cellpadding='5'>";
        echo "<tr><th>الحقل</th><th>النوع</th><th>NULL</th><th>مفتاح</th><th>الافتراضي</th><th>إضافي</th></tr>";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr>";
            echo "<td>" . $row['Field'] . "</td>";
            echo "<td>" . $row['Type'] . "</td>";
            echo "<td>" . $row['Null'] . "</td>";
            echo "<td>" . $row['Key'] . "</td>";
            echo "<td>" . $row['Default'] . "</td>";
            echo "<td>" . $row['Extra'] . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "<p style='color:red;'>✖ جدول users غير موجود</p>";
    }
    
    // 6. اختبار إدراج بيانات
    echo "<h3>اختبار إدراج بيانات</h3>";
    try {
        $testName = "Test User";
        $testEmail = "test_" . time() . "@example.com";
        $testPass = password_hash("test123", PASSWORD_DEFAULT);
        
        $stmt = $pdo->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
        $stmt->execute([$testName, $testName, $testEmail, $testPass]);
        $lastId = $pdo->lastInsertId();
        
        echo "<p style='color:green;'>✔ تم إدراج بيانات اختبار بنجاح (ID: $lastId)</p>";
        
        // 7. اختبار حذف بيانات الاختبار
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$lastId]);
        echo "<p>تم حذف بيانات الاختبار</p>";
    } catch (PDOException $e) {
        echo "<p style='color:red;'>✖ فشل إدراج بيانات الاختبار: " . $e->getMessage() . "</p>";
    }
    
} catch (PDOException $e) {
    echo "<p style='color:red;'>✖ فشل الاتصال بقاعدة البيانات: " . $e->getMessage() . "</p>";
    
    // نصائح استكشاف الأخطاء
    echo "<h3>نصائح استكشاف الأخطاء:</h3>";
    echo "<ul>";
    echo "<li>تأكد من تشغيل خادم MySQL (XAMPP/WAMP/LAMP)</li>";
    echo "<li>تحقق من اسم المستخدم وكلمة المرور</li>";
    echo "<li>تأكد من وجود قاعدة البيانات '" . $dbname . "'</li>";
    echo "<li>تحقق من أن ملف db_connect.php موجود في المسار الصحيح</li>";
    echo "<li>جرب الاتصال باستخدام كود PHP مباشرة كما في هذا الملف</li>";
    echo "</ul>";
}

// 8. معلومات إضافية
echo "<h3>معلومات إضافية:</h3>";
echo "<p>إصدار PHP: " . phpversion() . "</p>";
if (extension_loaded('pdo_mysql')) {
    echo "<p style='color:green;'>✔ امتداد PDO_MySQL مفعل</p>";
} else {
    echo "<p style='color:red;'>✖ امتداد PDO_MySQL غير مفعل</p>";
}
?>