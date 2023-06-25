let xhr = new XMLHttpRequest
let selectCities = document.getElementById("cities");
let selectDays = document.getElementById("days");
let input = document.getElementById("input")
let city = selectCities.value;
let days = selectDays.value;
let futureWeatherData = document.getElementById("futureWeatherData")

function GetFutureData(){
    xhr.open('GET', `http://api.weatherapi.com/v1/forecast.json?key=fa52bf7d41864d1ab5c144632230306&q=${city}&days=${days}&aqi=no&alerts=no`);
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

GetFutureData();
selectCities.addEventListener("change", function(event){
    city = event.target.value;
    GetFutureData();
});

selectDays.addEventListener("change", function(event){
    days = event.target.value;
    GetFutureData();
});

input.addEventListener("change", function(event){
    city = event.target.value;
    GetFutureData();
});

function render(data){
    futureWeatherData.innerHTML = null;
    for (let day of data.forecast.forecastday) {
        document.getElementById("futureWeatherData").innerHTML +=`
        <div id="day">
            <h3 class="date">${day.date}</h3>
            <div id="hours-${day.date}" class="hours"></div>
        </div>
        `
    

    for(let i = 0; i < 24;i+=3){
    
    document.getElementById(`hours-${day.date}`).innerHTML += `
    <div class="futureweather">
        <h3>${new Date(day.hour[i].time).toLocaleTimeString()}</h3>
        <img src = "${data.forecast.forecastday[0].hour[i].condition.icon}">
        <p>${data.forecast.forecastday[0].hour[i].time}</p>
        <p>Temperature: ${data.forecast.forecastday[0].hour[i].temp_c} degrees Celcium</p>
        <p>Humidity: ${data.forecast.forecastday[0].hour[i].humidity} %</p>
        <p>Wind Speed: ${data.forecast.forecastday[0].hour[i].wind_kph} km/h</p>
        <p>Wind Direction: ${data.forecast.forecastday[0].hour[i].wind_dir}</p>
        <p>Pressure: ${data.forecast.forecastday[0].hour[i].pressure_mb} Pa</p>
        <p>Feels like: ${data.forecast.forecastday[0].hour[i].feelslike_c} degrees Celcium</p>
        <p>Cloud: ${data.forecast.forecastday[0].hour[i].cloud} %</p>
    </div>
    `
        }
    }
}
