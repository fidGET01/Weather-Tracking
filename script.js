let xhr = new XMLHttpRequest
let selectCities = document.getElementById("cities");
let input = document.getElementById("input")
let city = selectCities.value;
let currentWeatherData = document.getElementById("currentWeatherData")
function GetCurrentData(){
    xhr.open('GET', `http://api.weatherapi.com/v1/current.json?key=fa52bf7d41864d1ab5c144632230306&q=${city}&aqi=no`);
    xhr.send();
    xhr.onload = function(){
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.response);
            render(data);
          } else {
            console.log('Помилка при отриманні даних погоди. Код помилки:', xhr.status);
          }
    };
}

GetCurrentData();
selectCities.addEventListener("change", function(event){
    city = event.target.value;
    GetCurrentData();
});

input.addEventListener("change", function(event){
    city = event.target.value;
    GetCurrentData();
});

function render(data){
    currentWeatherData.innerHTML = `
    <div class = "weather">
        <h3>${data.location.name}</h3>
        <img src = "${data.current.condition.icon}">
        <p>Temperature: ${data.current.temp_c} degrees Celcium</p>
        <p>Humidity: ${data.current.humidity} %</p>
        <p>Wind Speed: ${data.current.wind_kph} km/h</p>
        <p>Wind Direction: ${data.current.wind_dir}</p>
        <p>Pressure: ${data.current.pressure_mb} Pa</p>
        <p>Feels like: ${data.current.feelslike_c} degrees Celcium</p>
        <p>Cloud: ${data.current.cloud} %</p>
    </div>
    `
}
