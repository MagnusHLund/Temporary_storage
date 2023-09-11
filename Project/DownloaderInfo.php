<?php

var_dump($_POST);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get the downloader's IP address
    $downloaderIp = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'];

    // Get the file identifier (file_id) from the URL
    $fileId = $_GET['file'];

    // Get the current date and time
    $downloadDate = date("Y-m-d H:i:s");

    // Database connection details
    $servername = "192.168.1.249";
    $username = "temp";
    $password = "";
    $dbname = "temp_storage";
    $port = 3306;

    // Create a database connection
    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL statement to insert downloader info
    $stmt = $conn->prepare("INSERT INTO downloaders_info (Downloader_ip, file_id, download_date) VALUES (?, ?, ?)");

    // Bind parameters to the statement
    $stmt->bind_param("ssi", $downloaderIp, $fileId, $downloadDate);

    // Execute the SQL statement
    if ($stmt->execute()) {
        // Successfully recorded downloader info
        $stmt->close();
        echo "Download recorded successfully!";
    } else {
        echo "Error recording download: " . $stmt->error;
    }

    // Close the database connection
    $conn->close();
}
?>
