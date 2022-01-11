var APIKey = "317001a987fd9756a3e8307ebf9f0f3b" + "&units=imperial";

var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// console.log(queryURL);


var weatherData;

var nameDateEl = document.getElementsByClassName("cityName");
var tempEl = document.getElementsByClassName("temp");
var windEl = document.getElementsByClassName("wind");
var humidityEl = document.getElementsByClassName("humidity");
var uvindexEl = document.getElementsByClassName("uvindex");

var apilatlonURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude +"&lon=" + longitude +"&exclude=current,minutely,hourly&appid=" + APIKey;

function determineCity(){
    city = document.getElementById("cityInput").value;
}
// determineCity();
console.log(city);

function findCoords() {
    determineCity()
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    weatherData = data;
                    renderWeather();
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Did not get a response");
        });
};

function getWeatherData(latitude, longitude) {
    determineCity();
    // var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    weatherData = data;
                    renderWeather();
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Did not get a response");
        });
};



    function renderWeather() {
        for (var i = 0; i < nameDateEl.length; i++) {
            var current = weatherData;
    
            // imgEl[i].src = "assets/images/" + current.weather[0].description + ".jpg"
    
            nameDateEl[i].textContent = unixConversion(current.dt);
            // dayEl[i].textContent = current.temp.day + "\u00B0F";
            // maxEl[i].textContent = "High: " + current.temp.max + "\u00B0F";
            // minEl[i].textContent = "Low: " + current.temp.min + "\u00B0F";
            windEl[i].textContent = "Wind: " + current.wind.speed + " MPH";
            // weatherMainEl[i].textContent = current.weather[0].main;
            // weatherDesEl[i].textContent = current.weather[0].description;
    
        }
    };


    function unixConversion(unix) {
        var date = new Date(unix * 1000);
        var temp = date.toDateString();
        temp = temp.substring(0, temp.length - 4);
        return temp;
    }
    // renderWeather();