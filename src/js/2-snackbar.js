'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('input[name="delay"]');
const button = document.querySelector('button');

button.addEventListener('click', event => {
  event.preventDefault();
  const radioButtons = document.querySelectorAll('input[name="state"]');
  const checkedRadioButtons = Array.from(radioButtons).find(
    input => input.checked
  );
  const inputValue = input.value;

  if (inputValue <= 0) {
    iziToast.show({
      message: 'Please enter a valid delay in milliseconds.',
      position: 'topRight',
      color: 'red',
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checkedRadioButtons.value === 'fulfilled') {
        resolve(inputValue);
      } else {
        reject(inputValue);
      }
    }, inputValue);
  });

  promise
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        color: '#59A10D',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        color: '#EF4040',
      });
    });
});
