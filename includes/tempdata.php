
<?php


// Include the database connection file
include 'conn.php';

// Query to fetch temperature data
$sql = "SELECT * FROM weather_data ORDER BY temperature DESC LIMIT 7";
$result = mysqli_query($conn, $sql);

// Initialize an array to store the data
$data = [];

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
} else {
    $data['empty'] = true; // Indicate that the result set is empty
}

// Close the database connection
mysqli_close($conn);

// Set the appropriate content type header
header('Content-Type: application/json');

// Output the data as JSON
echo json_encode($data);

?>






