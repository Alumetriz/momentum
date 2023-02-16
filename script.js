'use strict';
const time = document.querySelector('.time')
const date = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
greeting.textContent = '123123'

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
	return  time.getHours();
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

/* Шf reload - username is saved */
// Save Data
function setLocalStorage() {
	localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

// Data Recovery and Display
function getLocalStorage() {
	if(localStorage.getItem('name')) {
		name.value = localStorage.getItem('name');
	}
}
window.addEventListener('load', getLocalStorage)
/* if reload - username is saved */

/* Time, Date and Greeting block */