'use strict';
const time = document.querySelector('.time')
const date = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const body = document.querySelector('body')
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const speed = document.querySelector('.speed');
const speedDescription = document.querySelector('.speed-description');
const humidityC = document.querySelector('.humidity-c');
const humidityDescription = document.querySelector('.humidity-description');

/* Time and Date block */
function showTime() {
	const timer = new Date()
	time.textContent = timer.toLocaleTimeString()
	showDate()
	showGreeting()
	setTimeout(showTime, 1000)
}

showTime();

function showDate() {
	const calendar = new Date();
	const options = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	}
	date.textContent = calendar.toLocaleDateString('en-EN', options)
}

function getHours() {
	let time = new Date();
	return time.getHours();
}

function getTimeOfDay() {
	const time = getHours();
	let timeOfDay;
	if (time < 12) {
		timeOfDay = 'morning';
	} else if (time < 18) {
		timeOfDay = 'afternoon'
	} else if (time < 22) {
		timeOfDay = 'evening'
	} else {
		timeOfDay = 'night'
	}
	return timeOfDay
}

function showGreeting() {
	const timeOfDay = getTimeOfDay();
	greeting.textContent = `Good ${timeOfDay}`;
}

/* If reload - username is saved */

// Save Data
function setLocalStorage() {
	localStorage.setItem('name', name.value);
	//
	localStorage.setItem('city', city.value);
}

window.addEventListener('beforeunload', setLocalStorage)

// Data Recovery and Display
function getLocalStorage() {
	if (localStorage.getItem('name')) {
		name.value = localStorage.getItem('name');
	}
	if (localStorage.getItem('city')) {
		city.value = localStorage.getItem('city');
		getWeather();
		city.blur();
	}
}

window.addEventListener('load', getLocalStorage)
/* if reload - username is saved */

/* Time, Date and Greeting block */


/* Image Slider */
let randomNum;
function getRandomNum() {
	randomNum = Math.floor(Math.random() * 20) + 1
	return randomNum
}

getRandomNum()

function setBg() {
	let timeOfDay = getTimeOfDay();
	let bgNum = randomNum;
	bgNum = bgNum.toString().padStart(2, '0')
	const img = new Image();
	img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
	img.onload = () => {
		body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
	};
}
setBg()

function getSlideNext() {
	randomNum < 20 ? randomNum++ : randomNum = 1
	setBg();
}

function getSlidePrev() {
	randomNum > 1 ? randomNum-- : randomNum = 20
	setBg()
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
/* Image Slider */


/* Weather */
async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=c64951852107a25165b37ccf1dc2be09&units=metric`;
	const res = await fetch(url);
	const data = await res.json();
	
	weatherIcon.className = 'weather-icon owf';
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
	temperature.textContent = `${data.main.temp.toFixed(0)}??C`;
	weatherDescription.textContent = data.weather[0].description;
	speed.textContent = `Wind speed: `
	speedDescription.textContent = `${data.wind.speed}m / s`
	humidityC.textContent = `Humidity: `;
	humidityDescription.textContent = `${data.main.humidity}%`
}

function setCity(event) {
	if (event.code === 'Enter') {
		getWeather();
		city.blur();
	}
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
/* Weather */