<?php

// conn.php file imported 
include 'conn.php';

// echo "Check connection";

// it select only 7 data in descending order  according to date
$sql = "SELECT * FROM weather_data ORDER BY current_day_and_date DESC LIMIT 7";



$result = mysqli_query($conn, $sql);
$output = [];

if(mysqli_num_rows($result) > 0){

    while($row = mysqli_fetch_assoc($result)){
        $output[] = $row;
    }
}

else{
    $output['empty'] = ['empty'];
}

mysqli_close($conn);

header('Content-Type: application/json'); // Set the content type to JSON
echo json_encode($output);


?>