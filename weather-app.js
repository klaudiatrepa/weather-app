let locationInput;
let locationData;
let tempTool;
let tempData;
let todayBtn;
let tomorrowBtn;
let currentHourDiv;
let currentDateDiv;
let humData;
let visibilityData;
let airPressureData;
let windData;
let locationPinIcon;
let weatherInfo;
let locationDiv;
let comingSoonDiv;
let weatherIcon;

let unit = 'metric';
let day = 'today';
let city;

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_LINK_TOMORROW = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const API_KEY = "&appid=850bf7154a3a4b64ad55146334b9b956";
const API_UNIT_METRIC = "&units=metric";
const API_UNIT_IMPERIAL = "&units=imperial";

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    showCurrentTime();
    setInterval(showCurrentTime, 1000);
    showCurrentDate();
}

const prepareDOMElements = () => {
    locationInput = document.querySelector('.location-input');
    locationData = document.querySelector('.data-location');
    tempTool = document.querySelector('.checkbox');
    tempData = document.querySelector('.data-temp');
    todayBtn = document.querySelector('.today');
    tomorrowBtn = document.querySelector('.tomorrow');
    currentHourDiv = document.querySelector(".data-hour");
    currentDateDiv = document.querySelector('.data-date');
    humData = document.querySelector('.data-humidity');
    visibilityData = document.querySelector('.data-visibility');
    airPressureData = document.querySelector('.air-pressure-data');
    windData = document.querySelector('.data-wind');
    locationPinIcon = document.querySelector('.location-pin');
    weatherInfo = document.querySelector('.weather-info');
    locationDiv = document.querySelector('.location-div');
    comingSoonDiv = document.querySelector('.coming-soon');
    weatherIcon = document.querySelector('.weather-icon');
}

const prepareDOMEvents = () => {
    locationInput.addEventListener('keyup', (e) => {
        city = e.target.value;
        if (e.key === 'Enter') {
            getWeather();
        }
    });
    tempTool.addEventListener('change', (e) => {
        unit = e.target.checked ? 'imperial' : 'metric';
        getWeather();
    });
    todayBtn.addEventListener('click', () => {
        day = 'today';
        getWeather();
    });
    tomorrowBtn.addEventListener('click', () => {
        day = 'tomorrow';
        getWeather();
    });
}

const imperialUnits = () => {
    tempData.textContent = '-- °F';
    humData.textContent = "-- %";
    visibilityData.textContent = '-- m';
    airPressureData.textContent = '-- hPa';
    windData.textContent = '-- mph';
}

const metricUnits = () => {
    tempData.textContent = '-- °C';
    humData.textContent = "-- %";
    visibilityData.textContent = '-- m';
    airPressureData.textContent = '-- hPa';
    windData.textContent = '-- m/s';
}

const getWeather = () => {
    if (day === 'today') {
        underlineToday();
        showCurrentDate();
        getWeatherToday();
    } else {
        underlineTomorrow();
        showTomorrowDate();
        getWeatherTomorrow();
    }
}

const getWeatherToday = () => {
    if (unit === 'metric') {
        metricUnits();

        const URL = API_LINK + city + API_KEY + API_UNIT_METRIC;

        fetch(URL)
            .then(res => res.json())
            .then(data => {

                const city = data.name;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const visibility = data.visibility;
                const airPressure = data.main.pressure;
                const wind = data.wind.speed;

                locationData.textContent = city;
                tempData.textContent = Math.floor(temperature) + '°C';
                humData.textContent = humidity + "%";
                visibilityData.textContent = visibility + ' m';
                airPressureData.textContent = airPressure + ' hPa';
                windData.textContent = wind + ' m/s';

                locationPinIcon.classList.remove('hide-pin');
                locationData.classList.remove('location-error-info');
                weatherIcon.classList.remove('hide');

                const status = data.weather[0].id

                if (status >= 200 && status < 300) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/thunderstorm.svg')
                } else if (status >= 300 && status < 400) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/rainy.svg')
                } else if (status >= 500 && status < 600) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/rainy.svg')
                } else if (status >= 600 && status < 700) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/snow.svg')
                } else if (status >= 700 && status < 800) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/foggy.svg')
                } else if (status == 800) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/sunny.svg')
                } else if (status >= 800 && status < 900) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/cloud.svg')
                }
            })
            .catch(() => {
                if (locationInput.value == '') {
                    locationInput.setAttribute('placeholder', 'Enter a city name!');
                    locationData.textContent = " ";
                    locationPinIcon.classList.add('hide-pin');
                    weatherIcon.classList.add('hide')
                } else {
                    locationData.textContent = "Sorry, we can't find your city.";
                    metricUnits();
                    locationPinIcon.classList.add('hide-pin');
                    locationData.classList.add('location-error-info');
                    weatherIcon.classList.add('hide');
                }
            })
    }
    else {
        imperialUnits();

        const URL = API_LINK + city + API_KEY + API_UNIT_IMPERIAL;

        fetch(URL)
            .then(res => res.json())
            .then(data => {

                const city = data.name;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const visibility = data.visibility;
                const airPressure = data.main.pressure;
                const wind = data.wind.speed;

                locationData.textContent = city;
                tempData.textContent = Math.floor(temperature) + '°F';
                humData.textContent = humidity + "%";
                visibilityData.textContent = visibility + ' m';
                airPressureData.textContent = airPressure + ' hPa';
                windData.textContent = wind + ' mph';

                locationPinIcon.classList.remove('hide-pin');
                locationData.classList.remove('location-error-info');
                weatherIcon.classList.remove('hide');

                const status = data.weather[0].id

                if (status >= 200 && status < 300) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/thunderstorm.svg')
                } else if (status >= 300 && status < 400) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/rainy.svg')
                } else if (status >= 500 && status < 600) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/rainy.svg')
                } else if (status >= 600 && status < 700) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/snow.svg')
                } else if (status >= 700 && status < 800) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/foggy.svg')
                } else if (status == 800) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/sunny.svg')
                } else if (status >= 800 && status < 900) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/cloud.svg')
                }

            })
            .catch(() => {
                if (locationInput.value == '') {
                    locationInput.setAttribute('placeholder', 'Enter a city name!');
                    locationData.textContent = " ";
                    locationPinIcon.classList.add('hide-pin');
                    weatherIcon.classList.add('hide');
                } else {
                    locationData.textContent = "Sorry, we can't find your city.";
                    imperialUnits();
                    locationPinIcon.classList.add('hide-pin');
                    locationData.classList.add('location-error-info');
                    weatherIcon.classList.add('hide');
                }
            })
    }
}

const getWeatherTomorrow = () => {
    if (unit === 'metric') {
        metricUnits();

        const URL_TOMORROW = API_LINK_TOMORROW + city + API_KEY + API_UNIT_METRIC;

        fetch(URL_TOMORROW)
            .then(res => res.json())
            .then(data => {

                const city = data.city.name;
                const temperature = data.list[9].main.temp;
                const humidity = data.list[9].main.humidity;
                const visibility = data.list[9].visibility;
                const airPressure = data.list[9].main.pressure;
                const wind = data.list[9].wind.speed;


                locationData.textContent = city;
                tempData.textContent = Math.floor(temperature) + '°C';
                humData.textContent = humidity + "%";
                visibilityData.textContent = visibility + ' m';
                airPressureData.textContent = airPressure + ' hPa';
                windData.textContent = wind + ' m/s';

                locationPinIcon.classList.remove('hide-pin');
                locationData.classList.remove('location-error-info');
                weatherIcon.classList.remove('hide');

                const status = data.list[10].weather[0].id

                if (status >= 200 && status < 300) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/thunderstorm.svg')
                } else if (status >= 300 && status < 400) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/rainy.svg')
                } else if (status >= 500 && status < 600) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/rainy.svg')
                } else if (status >= 600 && status < 700) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/snow.svg')
                } else if (status >= 700 && status < 800) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/foggy.svg')
                } else if (status == 800) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/sunny.svg')
                } else if (status >= 800 && status < 900) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/cloud.svg')
                }
            })
            .catch(() => {
                if (locationInput.value == '') {
                    locationInput.setAttribute('placeholder', 'Enter a city name!');
                    locationData.textContent = " ";
                    locationPinIcon.classList.add('hide-pin');
                    weatherIcon.classList.add('hide')
                } else {
                    locationData.textContent = "Sorry, we can't find your city.";
                    metricUnits();
                    locationPinIcon.classList.add('hide-pin');
                    locationData.classList.add('location-error-info');
                    weatherIcon.classList.add('hide');
                }
            })
    }
    else {
        imperialUnits();

        const URL_TOMORROW = API_LINK_TOMORROW + city + API_KEY + API_UNIT_IMPERIAL;

        fetch(URL_TOMORROW)
            .then(res => res.json())
            .then(data => {

                const city = data.city.name;
                const temperature = data.list[9].main.temp;
                const humidity = data.list[9].main.humidity;
                const visibility = data.list[9].visibility;
                const airPressure = data.list[9].main.pressure;
                const wind = data.list[9].wind.speed;

                locationData.textContent = city;
                tempData.textContent = Math.floor(temperature) + '°F';
                humData.textContent = humidity + "%";
                visibilityData.textContent = visibility + ' m';
                airPressureData.textContent = airPressure + ' hPa';
                windData.textContent = wind + ' mph';

                locationPinIcon.classList.remove('hide-pin');
                locationData.classList.remove('location-error-info');
                weatherIcon.classList.remove('hide');

                const status = data.list[10].weather[0].id;

                if (status >= 200 && status < 300) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/thunderstorm.svg')
                } else if (status >= 300 && status < 400) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/rainy.svg')
                } else if (status >= 500 && status < 600) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/rainy.svg')
                } else if (status >= 600 && status < 700) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/snow.svg')
                } else if (status >= 700 && status < 800) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/foggy.svg')
                } else if (status == 800) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/sunny.svg')
                } else if (status >= 800 && status < 900) {
                    weatherIcon.setAttribute('src', '/Users/klaudiatrepa/Praca/weather-app/svg/cloud.svg')
                }
            })
            .catch(() => {
                if (locationInput.value == '') {
                    locationInput.setAttribute('placeholder', 'Enter a city name!');
                    locationData.textContent = " ";
                    locationPinIcon.classList.add('hide-pin');
                    weatherIcon.classList.add('hide');
                } else {
                    locationData.textContent = "Sorry, we can't find your city.";
                    imperialUnits();
                    locationPinIcon.classList.add('hide-pin');
                    locationData.classList.add('location-error-info');
                    weatherIcon.classList.add('hide');
                }
            })
    }
}

const underlineTomorrow = () => {
    todayBtn.classList.remove('underline');
    tomorrowBtn.classList.add('underline');
}

const underlineToday = () => {
    todayBtn.classList.add('underline');
    tomorrowBtn.classList.remove('underline');
}

const showCurrentTime = () => {
    const currentDateTime = new Date();
    const currentHour = currentDateTime.getHours();
    const currentMinutes = currentDateTime.getMinutes();
    const currentTime = `${currentHour}:${currentMinutes < 10 ? 0 : ""}${currentMinutes}`;

    currentHourDiv.innerHTML = currentTime;
}

const showCurrentDate = () => {
    const currentDate = new Date();
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yyyy = currentDate.getFullYear();
    const today = dd + "." + mm + "." + yyyy;

    currentDateDiv.innerHTML = today;
}

const showTomorrowDate = () => {
    const currentDate = new Date((new Date().getTime() + 24 * 60 * 60 * 1000));
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yyyy = currentDate.getFullYear();
    const tomorrow = dd + "." + mm + "." + yyyy;

    currentDateDiv.innerHTML = tomorrow;
}

document.addEventListener('DOMContentLoaded', main)
