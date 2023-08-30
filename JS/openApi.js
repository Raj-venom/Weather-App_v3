const WAPI = `https://api.openweathermap.org/data/2.5/weather?q=`;
const AKEY = `Your API KEY`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// var city = "Stockton-on-Tees";
// var city = "kathmandu";

// fetching api
async function weather(city) {
  document.querySelector(".city").innerHTML = "Loading...";

  const response = await fetch(`${WAPI}${city}&appid=${AKEY}&units=metric`);
  var data = await response.json();
  // var data = response.json();

  return data;
}

function displayWeatherData(data2) {
  //to check fetched data
  console.log(data2);

  if (!data2 || data2.cod === "404") {
    // City not found
    document.querySelector(".city").innerHTML = "City not found";
    document.querySelector(".temp").innerHTML = "404";
    document.querySelector(".humidity").innerHTML = "check history";
    document.querySelector(".wind").innerHTML = "below";
    weatherIcon.src = "images/invalid.png";
    document.body.style.backgroundImage = "none";
    return;
  } else {
    // Stored required data in variable
    let temp = Math.round(data2.main.temp);
    let wind = data2.wind.speed;
    let place = data2.name;
    let humidity = data2.main.humidity;

    // to check the incoming data
    // console.log(temp + " °C");
    // console.log(wind + " km/h");
    // console.log(place);
    // console.log(humidity + "%");

    // To display weather data
    document.querySelector(".city").innerHTML = place;
    document.querySelector(".temp").innerHTML = temp + "°C";
    document.querySelector(".humidity").innerHTML = humidity + "%";
    document.querySelector(".wind").innerHTML = wind + " km/h";

    // to change background to delfault i.e none
    if (data2.weather[0].main !== "Rain") {
      document.querySelector(".container").style.background = "none";
    }

    if (data2.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      document.body.style.backgroundImage = "url('img/clouds.jpg')";
    } else if (data2.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
      document.body.style.backgroundImage = "url('img/clear.jpg')";
    } else if (data2.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
      document.body.style.backgroundImage = "url('img/rain.jpg')";
      document.querySelector(".container").style.background = "#04fff780";
    } else if (data2.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
      document.body.style.backgroundImage = "url('img/drizzle.jpg')";
    } else if (data2.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
      document.body.style.backgroundImage = "url('img/mist.jpg')";
    } else if (data2.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
      document.body.style.backgroundImage = "url('img/snow.jpg')";
    } else if (data2.weather[0].main == "Haze") {
      weatherIcon.src = "images/haze.png";
      document.body.style.backgroundImage = "url('img/haze.jpg')";
      document.querySelector(".container").style.background = "#fffdfd33";
    } else if (data2.weather[0].main == "Thunderstorm") {
      weatherIcon.src = "images/thunderstorm.png";
      document.body.style.backgroundImage = "url('img/thunderstor.jpg')";
    } else {
      weatherIcon.src = "images/invalid.png";

      document.body.style.backgroundImage = "none";
    }
  }
}

// Weather data by Searching
searchBtn.addEventListener("click", async () => {
  const city = searchBox.value;
  const data2 = await weather(city);
  displayWeatherData(data2);
});

const input = document.querySelector("#input");

input.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value;
    weather(city).then((data2) => {
      displayWeatherData(data2);
      let val = data2;

      if (data2.cod !== "404"){

        // to convert json to string as local storage only store string data type
        let val_str = JSON.stringify(val);
        
        // Storing data in local Storage
        localStorage.setItem(city, val_str);
      }
    })

    .catch((error) => {
        let val_json = JSON.parse(localStorage.getItem(city));
    
        displayWeatherData(val_json);
    
        console.log(val_json)
        // console.log("this is error in kerypress");
        console.log("Error due to:", error);
      });
  }
});

// Display defult city data
weather("Stockton-on-Tees")
  .then((data2) => {
    displayWeatherData(data2);
    let val = data2;

    // to convert json to string as local storage only store string data type
    let val_str = JSON.stringify(val);

    // Storing data in local Storage
    localStorage.setItem("Stockton-on-Tees", val_str);

    // console.log(val_str);
  })

  .catch((error) => {
    let val_json = JSON.parse(localStorage.getItem("Stockton-on-Tees"));

    displayWeatherData(val_json);

    // console.log(:adsf)
    // console.log(val_json)
    console.log("this is error");
    // console.log("Error due to:", error);
  });
