<?php
// Check if the form is submitted and the file is uploaded successfully
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["file"])) {
    // Database connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "temp_storage";
    $port = 3336;

    // Create a database connection
    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get the uploaded file details
    $file = $_FILES["file"];
    $filename = $file["name"];
    $file_tmp_name = $file["tmp_name"];
    $file_size = $file["size"];

    $originalName = $filename;

    // Generate the download URL based on current date and time in hexadecimal format
    $current_time = date("mdYHis");
    $hex_time = dechex($current_time);
    $download_filename = $hex_time . ".zip"; // Filename as hexadecimal with .zip extension
    $download_url = "http://localhost/downloads/" . $download_filename; // URL as hexadecimal with .zip extension
    $file_path = "downloads/" . $download_filename; // Path to the download folder with .zip extension

    // Get additional information
    $uploader_ip = $_SERVER["REMOTE_ADDR"];
    $file_path = "downloads/" . $download_filename; // Path to the uploads folder with .zip extension
    $expiration_value = $_POST['expiration'];
    if ($expiration_value == "forever") {
        // Cant expire if its forever, so its set to null
        $expiration_date = null;
    } else {
        // sets the selected date, to the expire date
        $expiration_date = date("Y-m-d H:i:s", strtotime("+{$expiration_value} days"));
    }

    // Move the uploaded file to the desired location
    if (move_uploaded_file($file_tmp_name, $file_path)) {
        // Prepare the SQL statement to insert data into the database using prepared statements
        $stmt = $conn->prepare("INSERT INTO uploaded_files (uploader_ip, file_name, file_path, file_size, expiration_date, download_url)
                                VALUES (?, ?, ?, ?, ?, ?)");

        // Bind parameters to the statement
        $stmt->bind_param("sssiss", $uploader_ip, $originalName, $file_path, $file_size, $expiration_date, $download_url); // Use $download_filename instead of $filename

        // Execute the SQL statement

        if ($stmt->execute()) {
            // Close the statement
            $stmt->close();
        
            // Redirect to download.html with the appropriate file name
            $data = array(
                'download_url' => $download_filename
            );
            
            header('Content-Type: application/json');
            echo json_encode($data);
            exit();
        } else {
            echo "Error: " . $stmt->error;
        }
    } else {
        echo "Error moving the uploaded file.";
    }

    // Close the database connection
    $conn->close();
}
?>
