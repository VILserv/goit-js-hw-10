'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const userDate = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let selectedDate;
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      button.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: 'red',
      });
    } else {
      button.disabled = false;
      selectedDate = selectedDates[0].getTime();
    }
  },
};

const dataPicker = flatpickr(userDate, options);

button.addEventListener('click', () => {
  let countdownInterval = setInterval(() => {
    let different = selectedDate - new Date().getTime();
    let time = convertMs(different);

    daysElement.textContent = `${addLeadingZero(time.days)}`;
    hoursElement.textContent = `${addLeadingZero(time.hours)}`;
    minutesElement.textContent = `${addLeadingZero(time.minutes)}`;
    secondsElement.textContent = `${addLeadingZero(time.seconds)}`;

    different -= 1000;

    if (different <= 0) {
      clearInterval(countdownInterval);
      button.disabled = false;
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
