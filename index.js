const apiKey = 'f8d444cda9241a4d740068858e582423';


const submitButton = () => {
    const cityName = document.querySelector('#inputCity').value;
    
    getWeather(cityName);
    //saves the city to local storage
    localStorage.setItem('cities' , JSON.stringify([cityName]));

};