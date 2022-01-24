var APIKey = "f199dda3b5bf9b230995121924fee94f" + "&units=imperial";



var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var cities = {

};

var weatherData;

var nameDateEl = document.getElementsByClassName("cityName");
var maintempEl = document.getElementsByClassName("maintemp");
var tempEl = document.getElementsByClassName("temp");
var windEl = document.getElementsByClassName("wind");
var humidityEl = document.getElementsByClassName("humidity");
var uvindexEl = document.getElementsByClassName("uvindex");
var cardImageEl = document.getElementsByClassName("cardImage");


var saveBtnEl = document.getElementsByClassName("searchButton");




var city = cityInput.value;




function findCoords(latitude, longitude) {

    var cityInput = document.getElementById('cityInput');
    document.querySelector('form.search').addEventListener('submit', (e) => {
        e.preventDefault();
    
        console.log(cityInput.value)
    });

    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=" + APIKey;
    

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    weatherData = data;
                    
                    var latitude = weatherData.coord.lat;
                    var longitude = weatherData.coord.lon;

                    
                    getWeatherData(latitude, longitude);

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
            var weather = weatherData.daily[i];
    
            nameDateEl[i].textContent = cityInput.value + ", " + unixConversion(weather.dt);
            tempEl[i].textContent = "Temp: " + weather.temp.day + "\u00B0F";
            windEl[i].textContent = "Wind: " + weather.wind_speed + " MPH";
            humidityEl[i].textContent = "Humidity: " + weather.humidity;
            uvindexEl[0].textContent = "UV Index: " + weatherData.current.uvi;
            cardImageEl[i].setAttribute("src", "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png");
        }
    };

    

    function getWeatherData(latitude, longitude) {
        
        var latlonApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&appid=" + APIKey;
        fetch(latlonApi)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        weatherData = data;
                        console.log(latlonApi);
                       renderWeather(data);
                    });
                } else {
                    alert("Error: " + response.statusText);
                }
            })
            .catch(function (error) {
                alert("Did not get a response");
            });
    };


    function unixConversion(unix) {
        var date = new Date(unix * 1000);
        var temp = date.toDateString();
        temp = temp.substring(0, temp.length - 4);
        return temp;
    }

    
    
    var savedCityCollection = [];
    
    document.querySelector(".searchButton").addEventListener("click", (cities) => {
        cities = document.getElementById('cityInput');
        savedCityCollection.push(cities.value);
        localStorage.setItem("cities", JSON.stringify(savedCityCollection));
        console.log(cities.length);

        // for (var i = 0; i < cities.length; i++) {
        var ulEl = document.querySelector("ul");
        var liEl = document.createElement('li');
        ulEl.appendChild(liEl);

        document.querySelector('li').setAttribute("onclick", "searchSaved()");
        document.querySelector('li').setAttribute("id", "savedCityList");

        const liNumber = document.querySelectorAll("li");


        for (var i = 0; i < liNumber.length; i++)
        document.querySelector("li").append(cities.value);


        // let div = document.getElementById("savedCityList")
        // div.append(cities[i]);
        // };
    });

    function loadFavoriteData() {
        cities = JSON.parse(localStorage.getItem("cities"));
    };


    function searchSaved() {
       const inputSpace = document.getElementById("cityInput");
       const liCity = document.getElementById("savedCityList").textContent;
       inputSpace.append(liCity);
    }


    // saveBtnEl.addEventListener("click", function() {
    //     var title = saveBtnEl.dataset.title;
    //     console.log(title);
    //         favoriteData[title] = { 
    //             longitude: saveBtnEl.dataset.longitude,
    //             latitude: saveBtnEl.dataset.latitude,
    //             text: saveBtnEl.dataset.bodyText,
    //             image: saveBtnEl.dataset.image
    //         };
    //     saveFavoriteData();
    //     renderFavorite();
    // });


    // function renderFavorite() {
    //     favoriteBoxEl.innerHTML = "";
    //     for (var [key] of Object.entries(favoriteData)) {
    //         searchButton.insertAdjacentHTML("beforeend", `<option>${key}</option>`);
    //     }
    // }

    // function saveFavoriteData() {
    //     localStorage.setItem("favoriteData", JSON.stringify(favoriteData));
    // }

    // function loadFavoriteData() {
    //     favoriteData = JSON.parse(localStorage.getItem("favoriteData"));
    // }
    