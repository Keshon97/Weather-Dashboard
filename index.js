const apiKey = 'f8d444cda9241a4d740068858e582423';

const submitButton = () => {
    const cityName = document.querySelector('#inputCity').value;
    
    getWeather(cityName);
    //saves the city to local storage
    localStorage.setItem('cities' , JSON.stringify(cityName));

};

//function to get weather data
const getWeather = (city) => {
    const getCurrentWeather  = 'https:api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
    console.log(city);

    //api call to get current weather
    fetch(getCurrentWeather)
        .then((res) => {
            // console.log(res);
            return res.json();
        })
        .then((res) => {
            console.log(res);
            
            const weather = document.querySelector('#current-Weather');

            //weather card
            const weatherCard = document.createElement('div').classList.add('border', 'border-ridge');
            // console.log(weatherCard);

            //name of the city
            const cityTitle =  document.createElement('h4').innerHTML = city + res.sys.country;

            //current temp of the city
            const currentTemperature = document.createElement('p').innerHTML = 'Current Temperature:' + res.main.temp + 'Farenheit';
            //could not get degree symbol to populate (did alt 0176)

            //current windspeed
            const currentWindSpeed = document.createElement('p').innerHTML = 'Wind Speed:' + res.wind.speed + 'Mph';

            //current humidity
            const currentHumidity = document.createElement('p').innerHTML = res.main.humidity; + '%';
            weatherCard.append(cityTitle, currentTemperature, currentWindSpeed, currentHumidity);
            weather.append(weatherCard);
        });
    const geoCordinates = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;
    
    // api call for geo cordinates in order to get 5 day forecast
    fetch(geoCordinates)
    .then((res) => {
        // console.log(res);
        return res.json();
    })
    .then((res) => {
        // console.log(res);
        const latitude = res[0].lat;
        const longitude = res[0].lon;
        // console.log(latitude);
        // console.log(longitude);
        const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=' + apiKey;
        fetch(forecastUrl)
            .then((res) => {
                // console.log(res);
                return res.json();
            })
            .then((res) => {
                console.log(res);
                // function to make five day forecast card
                const cityForecast = document.querySelector('#forecast');
                cityForecast.remove();
                 //weather card
            const forecastWeatherCard = document.createElement('div').classList.add('border', 'border-ridge');
            console.log(forecastWeatherCard);

            const forecastTemperature = document.createElement('p').innerHTML = 'Current Temperature:' + res.main.temp + 'Farenheit';

            const forecastMaxTemperature = document.createElement('p').innerHTML = 'Mininimu Temperature:' + res.main.temp + 'Farenheit';

            const forecastMinTemperature = document.createElement('p').innerHTML = 'Max Temperature:' + res.main.temp + 'Farenheit';

            const forecastWindSpeed = document.createElement('p').innerHTML = 'Wind Speed:' + res.wind.speed + 'Mph';

            const forecastHumidity = document.createElement('p').innerHTML = res.main.humidity; + '%';

            weatherCard.append(forecastTemperature, forecastMaxTemperature,forecastMinTemperature, forecastWindSpeed, forecastHumidity);
            cityForecast.append(forecastWeatherCard);
        });
    });
};
const onSubmit = document.querySelector('#btn');
onSubmit.addEventListener('click', submitButton);
