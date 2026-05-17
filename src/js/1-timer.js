import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



//Підклбючаємо бібліотеку flatpickr з параметрами options  на елемент , на наш инпут
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      const selectedDate = selectedDates[0];
      const currentData = new Date();
      if (selectedDate <= currentData) {
          iziToast.show({ title: 'Error', message: 'Please choose a date in the future',position: 'topRight',backgroundColor: 'red',messageColor: 'white', titleColor:'white' });
          clockBtnStart.disabled = true;
          return;
      }
      userSelectedDate = selectedDate;
      clockBtnStart.disabled = false;
     

      
  },
};

flatpickr("#datetime-picker", options);

// шукаємо наші елменти в ДОМ
const clockElem = document.querySelector('.timer');
const clockBtnStart = document.querySelector('button[data-start]');
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
const inputEl = document.querySelector("#datetime-picker");
console.log(inputEl);

let userSelectedDate;
let intervalId;
clockBtnStart.disabled = true;
inputEl.disabled = false;


clockBtnStart.addEventListener("click", () => {
    clockBtnStart.disabled = true;
     inputEl.disabled = true;

    
    intervalId = setInterval(() => {
        const currentTime = new Date();
        const timeLeft = userSelectedDate - currentTime;
        
       
        if (timeLeft <= 0) {
            clearInterval(intervalId);
             ;

            updateTimer({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
        
            return;
            
            
        }
        inputEl.disabled = false;
        clockBtnStart.disabled = true;
         updateTimer(convertMs(timeLeft));
        
        

    }, 1000);
    
})





// convert Ms to  time
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

function addLeadingZero(value){
    return String(value).padStart(2, "0");

}

function updateTimer({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
    
}