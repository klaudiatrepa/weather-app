let locationInput;
let locationData;
let tempTool;
let tempData;
let todayBtn;
let tommorowBtn;
let currentHourDiv;


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    showCurrentTime();
    setInterval(showCurrentTime, 1000);
}

const prepareDOMElements = () => {
    locationInput = document.querySelector('.location-input');
    locationData = document.querySelector('.data-location');
    tempTool = document.querySelector('.checkbox');
    tempData = document.querySelector('.data-temp');
    todayBtn = document.querySelector('.today');
    tommorowBtn = document.querySelector('.tommorow');
    currentHourDiv = document.querySelector(".data-hour");

}

const prepareDOMEvents = () => {
    locationInput.addEventListener('keyup', enterKeyCheck);
    tempTool.addEventListener('change', tempConverter);
    todayBtn.addEventListener('click', underlineToday);
    tommorowBtn.addEventListener('click', underlineTommorow);
}


const searchLocation = () => {
    if (locationInput.value !== '') {
        locationData.textContent = locationInput.value

    } else {
        locationInput.setAttribute('placeholder', 'Enter a city name!')

    }
}

const enterKeyCheck = e => {
    if (e.key === 'Enter')
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




document.addEventListener('DOMContentLoaded', main);