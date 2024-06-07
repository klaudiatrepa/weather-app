let locationInput;
let locationData;
let tempTool;
let tempData;
let todayBtn;
let tommorowBtn;
let currentHourDiv;
let currentDateDiv;
let humData;
let visibilityData;
let airPressureData;
let windData;
let locationPinIcon;


const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
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
    tommorowBtn = document.querySelector('.tommorow');
    currentHourDiv = document.querySelector(".data-hour");
    currentDateDiv = document.querySelector('.data-date');
    humData = document.querySelector('.data-humidity');
    visibilityData = document.querySelector('.data-visibility');
    airPressureData = document.querySelector('.air-pressure-data');
    windData = document.querySelector('.data-wind');
    locationPinIcon = document.querySelector('.location-pin')
}

const prepareDOMEvents = () => {
    locationInput.addEventListener('keyup', enterKeyCheck);
    tempTool.addEventListener('change', getWeather);
    todayBtn.addEventListener('click', underlineToday);
    tommorowBtn.addEventListener('click', underlineTommorow);
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
    if (tempTool.checked == true) {
        imperialUnits();

        const city = locationInput.value;
        const URL = API_LINK + city + API_KEY + API_UNIT_IMPERIAL;

        fetch(URL)
            .then(res => res.json())
            .then(data => {
                console.log(data);
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

            })
            .catch(() => {
                if (locationInput.value == '') {
                    locationInput.setAttribute('placeholder', 'Enter a city name!');
                    locationData.textContent = " ";
                    ocationPinIcon.classList.add('hide-pin')
                } else {
                    locationData.textContent = "Sorry, we can't find your city.";
                    imperialUnits();
                    locationPinIcon.classList.add('hide-pin');
                    locationData.classList.add('location-error-info');
                }
            })

    } else {
        metricUnits();

        const city = locationInput.value;
        const URL = API_LINK + city + API_KEY + API_UNIT_METRIC;

        fetch(URL)
            .then(res => res.json())
            .then(data => {
                console.log(data);
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

            })
            .catch(() => {
                if (locationInput.value == '') {
                    locationInput.setAttribute('placeholder', 'Enter a city name!');
                    locationData.textContent = " ";
                    locationPinIcon.classList.add('hide-pin')
                } else {
                    locationData.textContent = "Sorry, we can't find your city.";
                    metricUnits();
                    locationPinIcon.classList.add('hide-pin');
                    locationData.classList.add('location-error-info');
                }
            })
    }
}

const enterKeyCheck = e => {
    if (e.key === 'Enter')
        getWeather();
}

const underlineTommorow = () => {

    todayBtn.classList.remove('underline');
    tommorowBtn.classList.add('underline');
}

const underlineToday = () => {

    todayBtn.classList.add('underline');
    tommorowBtn.classList.remove('underline');
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

document.addEventListener('DOMContentLoaded', main)
