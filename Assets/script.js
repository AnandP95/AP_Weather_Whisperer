
/* API key for fetch data from open weatherMap */
var apiKey = "f2121762395955c7d6494cc0e3d06558";

/* declare the variable here */
var searchForm = document.getElementById("search_box");
var searchCity = document.getElementById("city-input");
var searchButton = document.getElementById("searchButton");
var historyList = document.getElementById("history_list");

var searchedCityEl = document.getElementById("searchedCity");
var todayWeather = document.getElementById("current-weather");
var forecastWeather = document.getElementById("forecast");
var historyCities = document.querySelectorAll(".history-city");
var searchHistory = [];


/* event listener for form submit */
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  /* get the city name from this field*/
  var cityName = searchCity.value;
  fetch(

    /* fetch the weather data using this websites */
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
      /* this variable used for display the current weather data */
      displayData(data);

        /* this variable used for add city to search history section */
      addToHistory(cityName);

      /* Fetch and display weather data for the selected city*/ 
      fetchWeatherData(cityName);
    })
    .catch((err) => {
      alert("Error fetching weather data. Please check the city name.");
    });
});


 /* Set a function for add city input to  search history */
function addToHistory(cityName) {
  
  if (!searchHistory.includes(cityName)) {
    searchHistory.push(cityName);
     updateHistory();
      saveHistory();
  }
}

/* Set a function for save input search history to local storage */
function saveHistory(){
  localStorage.setItem("searchHistory",JSON.stringify(searchHistory));
}

/* seta function for update a search history */
function updateHistory() {
  historyList.innerHTML = searchHistory
    .map((city) => `<li class="history-city">${city}</li>`)
    .join("");


    /* Update the list of history cities */ 
  historyCities = document.querySelectorAll(".history-city"); 
  
  historyCities.forEach((historyCity) => {
    historyCity.addEventListener("click", () => {
      var cityName = historyCity.textContent; 

      fetchWeatherData(cityName); 
    });
  });
}



/* set a Function to load search history from local storage*/ 
function loadHistory() {
  const storedHistory = localStorage.getItem("searchHistory");

  if (storedHistory) {
    
    searchHistory = JSON.parse(storedHistory);
    updateHistory();
  }
}



function fetchWeatherData(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
      displayData(data);
    })
    .catch(err => {
      alert("Error fetching weather data. Please check the city name.");
    });
}

document.addEventListener("DOMContentLoaded", loadHistory);


var displayData = (weather) => {
  var currentDate = new Date();
  var formattedDate = currentDate.toLocaleDateString();
  /* Display current weather data here */
  todayWeather.innerHTML = `
    <h2>Current Weather</h2>
    <ul>
    <li>
    <p>${weather.name}</p>
    <p>${formattedDate}</p>
    <img src="https://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="Weather Icon">
    <p>Temperature: ${weather.main.temp}°F</p>
    <p>Humidity: ${weather.main.humidity}%</p>
    <p>Wind Speed: ${weather.wind.speed} m/s</p>
    </li>
    </ul>
  `;

  /* Display the 5-day forecast data here */
  
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${weather.name}&appid=${apiKey}&units=imperial`
  )
    .then((response) => response.json())
    .then(displayForecast)
    .catch((err) => {
      console.error("Error fetching forecast data.", err);
    });
};

var displayForecast = (forecast) => {
  console.log(forecast);

  const filteredForecast = forecast.list.filter((item, index) => index % 8 === 0);

  forecastWeather.innerHTML = `
      <h2>5-Day Forecast</h2>
      <ul>
          ${filteredForecast.map(item => {
              var urlIcon = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
              var forecastDate = new Date(item.dt_txt);
              var formattedDate = forecastDate.toLocaleDateString('en-US', {  month: 'numeric',  day: 'numeric',year: 'numeric' });

              return `
              <li>
                  <p>Date: ${formattedDate}</p>
                  <img src=${urlIcon}>
                  <p>Temperature: ${item.main.temp}°F</p>
                  <p>Humidity: ${item.main.humidity}%</p>
                  <p>Wind Speed: ${item.wind.speed} m/s</p>
              </li>`;
          }).join('')}
      </ul>
  `;
};
