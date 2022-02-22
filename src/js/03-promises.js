import Notiflix from 'notiflix';
const ref = {
  form: document.querySelector(".form"),
  delay: document.querySelector("[name='delay']"),
  step: document.querySelector("[name='step']"),
  amount: document.querySelector("[name='amount']"),
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
      
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
        
    
  })  
}
function submitForm(e) {
  e.preventDefault();

  let delay = parseInt(ref.delay.value);
  let step = parseInt(ref.step.value);
  let amount = parseInt(ref.amount.value);
  let count = 0;

  setTimeout(() => {
    let intervalId = setInterval(() => {
      count += 1;
      
      if (count === amount)
      {
        clearInterval(intervalId)
      }
      let delayTotal = delay + step*(count-1)
      createPromise(count, delayTotal)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });                 
    }, step)
  },delay)
 
  
          
      
    
 
   
  
}

ref.form.addEventListener("submit", submitForm)