<?php
if (isset($_GET['file'])) {
    // Get the file identifier from the URL parameter
    $file_identifier = $_GET['file'];

    // Remove any characters other than alphanumeric and underscores
    $file_identifier = preg_replace("/[^A-Za-z0-9_]/", "", $file_identifier);

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

    // Prepare the SQL statement to find the matching download_url
    $sql = "SELECT file_name, expiration_date FROM uploaded_files WHERE download_url = '$file_identifier'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Match found, get the file_name and expiration_date
        $row = $result->fetch_assoc();
        $file_name = $row['file_name'];
        $expiration_date = $row['expiration_date'];

        // Calculate the time remaining before expiration
        $current_time = time();
        $expiration_timestamp = strtotime($expiration_date);
        $time_remaining = max(0, $expiration_timestamp - $current_time);

        // Convert the time remaining to days, hours, minutes, and seconds
        $days_remaining = floor($time_remaining / (24 * 60 * 60));
        $time_remaining -= $days_remaining * (24 * 60 * 60);
        $hours_remaining = floor($time_remaining / (60 * 60));
        $time_remaining -= $hours_remaining * (60 * 60);
        $minutes_remaining = floor($time_remaining / 60);
        $seconds_remaining = $time_remaining % 60;

        // Prepare the response data
        $response = array(
            'file_name' => $file_name,
            'days_remaining' => $days_remaining,
            'hours_remaining' => $hours_remaining,
            'minutes_remaining' => $minutes_remaining,
            'seconds_remaining' => $seconds_remaining
        );

        // Provide a JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // No match found, redirect to error.html
        header("Location: Error.html");
        exit();
    }

    // Close the database connection
    $conn->close();
}
?>
