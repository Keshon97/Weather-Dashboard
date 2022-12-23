const apiKey = 'f8d444cda9241a4d740068858e582423';

const submitButton = () => {
    const cityName = document.querySelector('#inputCity').value;

    getWeather(cityName);
    //saves the city to local storage
    localStorage.setItem('cities', JSON.stringify(cityName));

};

//function to get weather data
const getWeather = (cityName) => {
    const getCurrentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey + '&units=imperial';
    // console.log(cityName);

    //api call to get current weather
    fetch(getCurrentWeather)
        .then((res) => {
            // console.log(res);
            return res.json();
        })
        .then((res) => {
            console.log('currentWeather: ', res);

            const weather = document.querySelector('#current-weather');
            weather.classList.add('border', 'border-ridge');
            // weather.remove();

            //weather card
            // const weatherCard = document.createElement('div').classList.add('border', 'border-ridge');
            // console.log(weatherCard);

            //name of the city
            const cityTitle = document.createElement('h4');
            cityTitle.innerHTML = '<br>' + cityName + ', ' + res.sys.country + '</br>';

            //current temp of the city
            const currentTemperature = document.createElement('p');
            currentTemperature.innerHTML = '<br>Current Temperature: ' + res.main.temp + ' °F </br>';
            //current windspeed
            const currentWindSpeed = document.createElement('p');
            currentWindSpeed.innerHTML = '<br> Wind Speed: ' + res.wind.speed + 'Mph </br>';

            //current humidity
            const currentHumidity = document.createElement('p');
            currentHumidity.innerHTML = '<br> Humidity: ' + res.main.humidity + '% </br>';
            weather.append(cityTitle, currentTemperature, currentWindSpeed, currentHumidity);
            // weather.append(weatherCard);
        });
    forecastWeather(cityName);
};

const forecastWeather = (cityName) => {
    const geoCordinates = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + apiKey + '&units=imperial';

    // api call for geo cordinates in order to get 5 day forecast
    fetch(geoCordinates)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            console.log('geo: ', res);
            const latitude = res[0].lat;
            console.log('lat: ', latitude);
            const longitude = res[0].lon;
            console.log('longitude: ', longitude);
            const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=' + apiKey;
            console.log('forecast: ', forecastUrl);
            fetch(forecastUrl)
    
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            console.log('forecast: ', res);
            // for (let i = 0; i < res.length; i++) {
            const cityForecast = document.querySelector('#forecast');
            cityForecast.classList.add('border', 'border-ridge');
            
            // for (let i = 0; i < res.length; i++) {
            const forecastTemperature = document.createElement('p')
            forecastTemperature.innerHTML = '<br> Current Temperature: ' + res.list[0].main.temp + '°F </br>';

            const forecastMaxTemperature = document.createElement('p')
            forecastMaxTemperature.innerHTML = '<br> Maximum Temperature: ' + res.list[0].main.temp_max + '°F </br>';

            const forecastMinTemperature = document.createElement('p')
            forecastMinTemperature.innerHTML = '<br> Max Temperature: ' + res.list[0].main.temp_min + '°F </br>';

            const forecastWindSpeed = document.createElement('p')
            forecastWindSpeed.innerHTML = '<br> Wind Speed: ' + res.list[0].wind.speed + 'Mph </br>';

            const forecastHumidity = document.createElement('p')
            forecastHumidity.innerHTML = '<br>' + res.list[0].main.humidity; + '% <br>';

            cityForecast.append(forecastTemperature, forecastMaxTemperature, forecastMinTemperature, forecastWindSpeed, forecastHumidity);
            // }
        });
    })
};
const onSubmit = document.querySelector('#btn');
onSubmit.addEventListener('click', submitButton);
