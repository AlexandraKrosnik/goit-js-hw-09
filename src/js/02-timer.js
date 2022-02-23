import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
const ref = {
    inputDate: document.querySelector("#datetime-picker"),
    buttonStart: document.querySelector("[data-start]"),
    valueData: document.querySelectorAll("span.value")
}
let dateSelected = null;
ref.buttonStart.disabled = true;
let options = {
    
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1, 
    
    onClose(selectedDates) {          
        if (selectedDates[0] - Date.now() <= 0 ) {
            Notiflix.Notify.warning("Please choose a date in the future")            
        }
        else {           
            ref.buttonStart.disabled = false;  
            dateSelected = selectedDates[0];
            
        }
          
  },
};

const timer = {
    indexInterval: null,        
    difference: null,
    start() {
        ref.inputDate.nextElementSibling.disabled = true;

        this.indexInterval = setInterval(() => {
            
            this.difference = dateSelected - Date.now();            
            this.stop();
            const { days, hours, minutes, seconds } = this.convertMs(this.difference);
            updateClock({ days, hours, minutes, seconds })                    
        }, 1000)
    },
    stop() {
        if (this.difference < 1000) {
            clearInterval(this.indexInterval);
            ref.inputDate.nextElementSibling.disabled = false;
            ref.buttonStart.disabled = false;
        }
    },
    convertMs(ms) {
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
    },   
}



flatpickr(ref.inputDate, options);
ref.buttonStart.addEventListener("click", (e) => { e.currentTarget.disabled = true; timer.start() })


function pad(value) {
    return String(value).padStart(2, '0');
}


function updateClock(time) {
    ref.valueData.forEach(value => { 
        for (let key in time)
        {
            if (String(key) in value.dataset )
            value.textContent = pad(time[key]);
        }        
        
    })
}