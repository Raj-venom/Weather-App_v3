<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SQL data Fetching using JS</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/opeanApi.css">
</head>

<body>

    <div class="container">
        <div class="search">
            <input id="input" type="text" spellcheck="false" placeholder="Search for location         🔍">
            <button id="btn" style="display: none">search</button>
        </div>

        <div class="weather">
            <img src="images/clear.png" class="weather-icon">
            <h1 class="temp"></h1>
            <h2 class="city"></h2>

            <div class="details">
                <div class="col">
                    <img src="images/humidity.png" alt="humidity">

                    <div>
                        <p class="humidity"></p>
                        <p></p>

                    </div>
                </div>

                <div class="col">
                    <img src="images/wind.png" alt="humidity">

                    <div>
                        <p class="wind"></p>
                        <p></p>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <div class="history">
        <table class="table">
            <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Pressure</th>
                    <th>Wind Speed</th>
                    <th>Humidity</th>
                </tr>
            </thead>
            <tbody class="row">
                <!-- <tr>
                        <td>New York</td>
                        <td>25°C</td>
                        <td>Sunny</td>
                        <td>2023-08-14</td>
                        <td>1012 hPa</td>
                        <td>10 km/h</td>
                        <td>50%</td>
                    </tr> -->
            </tbody>

<!-- <h1 class="heading"> History of "Stockton-on-Tees"</h1> -->

<div class="heading-container">
  <h1 class="heading">History of "Stockton-on-Tees"</h1>
</div> 
<br>
            <!-- <p id="title">Load History From </p> -->
            <button id="date-history-btn"  class="history-btn">Load History According to date</button>
            <button id="temp-history-btn"  class="history-btn">High to Low Temperature</button>
            <button id="history-7day" class="history-btn" onclick="window.open('index.html', '_self')">Detailed forecast</button>

        </table>
    </div>

</body>


<script src="JS/script.js"></script>
<script src="JS/openapi.js"> </script>

</html>


 <!-- To Insert data in Database -->

<?php

$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Stockton-on-Tees&units=metric&appid={your api key}";

$curl = curl_init($apiUrl);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$apiResponse = curl_exec($curl);

if ($apiResponse === false) {
  echo "Error fetching weather data from the API: " . curl_error($curl);
  curl_close($curl);
  exit();
}
curl_close($curl);

$weatherData = json_decode($apiResponse, true);

if ($weatherData['cod'] === 200) {
  $city = $weatherData['name'];
  $temperature = $weatherData['main']['temp'];
  $description = $weatherData['weather'][0]['description'];
  $currentDate = date('Y-m-d');
  $pressure = $weatherData['main']['pressure'];
  $windSpeed = $weatherData['wind']['speed'];
  $humidity = $weatherData['main']['humidity'];
  $icon = $weatherData['weather'][0]['icon'];


  include 'includes/conn.php';
  
  
  $checkSql = "SELECT * FROM weather_data WHERE current_day_and_date = ?";
  $checkStmt = mysqli_prepare($conn, $checkSql);
  mysqli_stmt_bind_param($checkStmt, "s", $currentDate);
  mysqli_stmt_execute($checkStmt);
  $checkResult = mysqli_stmt_get_result($checkStmt);

  if (mysqli_num_rows($checkResult) === 0) {
    $insertSql = "INSERT INTO weather_data (city, temperature, description, current_day_and_date, pressure, wind_speed, humidity, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $insertStmt = mysqli_prepare($conn, $insertSql);
    mysqli_stmt_bind_param($insertStmt, "ssssssss", $city, $temperature, $description, $currentDate, $pressure, $windSpeed, $humidity, $icon);

    mysqli_stmt_execute($insertStmt);
  }

  mysqli_close($conn);
}
?>


?>
