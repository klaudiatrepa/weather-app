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


const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=850bf7154a3a4b64ad55146334b9b956";
const API_UNIT_METRIC = "&units=metric";
const API_UNIT_IMPERIAL = "&units=imperial";

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    showCurrentTime();
    setInterval(showCurrentTime, 1000);
    showCurrentDate()
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
}

const prepareDOMEvents = () => {
    locationInput.addEventListener('keyup', enterKeyCheck);
    tempTool.addEventListener('change', tempConverter);
    todayBtn.addEventListener('click', underlineToday);
    tommorowBtn.addEventListener('click', underlineTommorow);
}

const getWeather = () => {
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
            windData.textContent = wind + ' m/s'
        })
        .catch(() => { locationData.textContent = "Sorry, we can't find your city." })
}

const searchLocation = () => {
    if (locationInput.value == '') {
        locationInput.setAttribute('placeholder', 'Enter a city name!')
    }
}

const enterKeyCheck = e => {
    if (e.key === 'Enter')
        getWeather()
    searchLocation()
}

const tempConverter = () => {
    if (tempTool.checked == true) {
        tempData.textContent = tempData.textContent * 1.8 + 32;

    } else {
        tempData.textContent = (tempData.textContent - 32) / 1.8
    }
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
    const currentDay = currentDate.getDay();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentCalendarDate = `${currentDay < 10 ? 0 : ""}${currentDay}.${currentMonth < 10 ? 0 : ""}${currentMonth}.${currentYear}`;

    currentDateDiv.innerHTML = currentCalendarDate;
}

document.addEventListener('DOMContentLoaded', main)