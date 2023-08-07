var apiKey = "f2121762395955c7d6494cc0e3d06558";
var  searchForm = document.getElementById("search_box");
var  searchCity = document.getElementById("city-input");
var  history = document.getElementById("history_list");
var todayWeather =  document.getElementById("current-weather");
var forecastWeather = document.getElementById("forecast");
let temp = document.querySelector('.temp');



searchForm.addEventListener("submit", function(event){
  event.preventDefault();
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${f2121762395955c7d6494cc0e3d06558}&units=metric`)
    .then(response => response.json())
    .then(displayData)
    .catch(err => {
      console.error(err);
      alert("Error fetching weather data. Please check the city name.");
    });
});

var displayData = (weather) => {
  temp.innerText = `${weather.main.temp}°C`;
};