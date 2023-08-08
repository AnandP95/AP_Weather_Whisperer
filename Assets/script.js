var apiKey = "f2121762395955c7d6494cc0e3d06558";
var  searchForm = document.getElementById("search_box");
var  searchCity = document.getElementById("city-input");
var  history = document.getElementById("history_list");
var todayWeather =  document.getElementById("current-weather");
var forecastWeather = document.getElementById("forecast");
let temp = document.querySelector('.temp');



searchForm.addEventListener("submit", function(event){
  event.preventDefault();

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(displayData)
    .catch(err => {
      alert("Error fetching weather data. Please check the city name.");
    });
});




var displayData = (weather) => {
  console.log(weather);

  /* Display current weather data here */
  todayWeather.innerHTML = `
    <h2>Current Weather</h2>
    
    <p>Temperature: ${weather.main.temp}°F</p>
    <p>Humidity: ${weather.main.humidity}%</p>
    <p>Wind Speed: ${weather.wind.speed} m/s</p>
    <p>Date: ${formattedDate}</p>
  `;

  /* display the  5-day forecast data  here*/ 
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity.value}&cnt=5&appid=${apiKey}&units=imperial`)
    
  
  .then(response => response.json())
    .then(displayForecast)
    .catch(err => {
      console.error("Error fetching forecast data.", err);
    });
};

var displayForecast = (forecast) => {
  console.log(forecast);

  
  forecastWeather.innerHTML = `
    <h2>5-Day Forecast</h2>
    <ul>
      ${forecast.list.map(item => `
        <li>
          Date: ${item.dt}
          <p>Temperature: ${item.main.temp}°F</p>
          <p>Humidity: ${item.main.humidity}%</p>
          <p>Wind Speed: ${item.wind.speed} m/s</p>
        </li>
      `).join('')}
    </ul>
  `;
};
