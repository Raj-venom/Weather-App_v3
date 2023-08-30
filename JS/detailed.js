const WAPI = `https://api.openweathermap.org/data/2.5/weather?q=`;
const AKEY = `Your API key`;

const searchBox = document.querySelector(".search-box");
const weatherIcon = document.querySelector(".weather-icon");

async function weather(city) {
  document.querySelector(".city").innerHTML = "Loading...";

  const response = await fetch(`${WAPI}${city}&appid=${AKEY}&units=metric`);
  var data = await response.json();

  return data;
}

function displayWeatherData(data2) {
  if (!data2 || data2.cod === "404") {
    document.querySelector(".city").innerHTML = "City not found";
    document.querySelector(".temp").innerHTML = "404";
    document.querySelector(".humidity").innerHTML = "";
    document.querySelector(".wind").innerHTML = "";
    document.querySelector(".pressure").innerHTML = "";
    document.querySelector(".date").innerHTML = "";
    document.querySelector(".description").innerHTML = "";
    weatherIcon.src = "images/invalid.png";
    document.body.style.backgroundImage = "none";
    return;
  } else {
    let temp = Math.round(data2.main.temp);
    let wind = data2.wind.speed;
    let humidity = data2.main.humidity;
    let pressure = data2.main.pressure;
    let description = data2.weather[0].description;
    let date = new Date(data2.dt * 1000).toDateString();
    let place = data2.name;

    document.querySelector(".city").innerHTML = place;
    document.querySelector(".temp").innerHTML = temp + "°C";
    document.querySelector(".humidity").innerHTML = `<strong> Humidity: ${humidity}% </strong>`;
    document.querySelector(".wind").innerHTML = `<strong> Wind Speed: ${wind} km/h </strong>`;
    document.querySelector(".pressure").innerHTML = `<strong> Pressure: ${pressure} hPa </strong>`;
    document.querySelector(".date").innerHTML = `<strong> Date: ${date} </strong>`;
    document.querySelector(".description").innerHTML = `<strong> Description: ${description} </strong>`;


    if (data2.weather[0].main !== "Rain") {
      document.querySelector(".container").style.background = "none";
    }

    // Update background images and weather icon based on weather condition
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
      document.body.style.backgroundImage = "url('img/thunderstorm.jpg')";
    } else {
      weatherIcon.src = "images/invalid.png";
      document.body.style.backgroundImage = "none";
    }
  }
}


// Add an event listener for the "Enter" key press
searchBox.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value;
    weather(city).then((data2) => {
      displayWeatherData(data2);
      if (data2.cod !== "404") {
        let val_str = JSON.stringify(data2);
        localStorage.setItem(city, val_str);
      }
    }).catch((error) => {
      let val_json = JSON.parse(localStorage.getItem(city));
      displayWeatherData(val_json);
      console.log("Error due to:", error);
    });
  }
});

// Display default city data
weather("Stockton-on-Tees").then((data2) => {
  displayWeatherData(data2);
  let val_str = JSON.stringify(data2);
  localStorage.setItem("Stockton-on-Tees", val_str);
}).catch((error) => {
  let val_json = JSON.parse(localStorage.getItem("Stockton-on-Tees"));
  displayWeatherData(val_json);
  console.log("Error due to:", error);
});



