import Notiflix from 'notiflix';
const ref = {
  form: document.querySelector(".form"), 
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
  
  let delay = parseInt(e.currentTarget.elements[0].value);
  let step = parseInt(e.currentTarget.elements[1].value);
  let amount = parseInt(e.currentTarget.elements[2].value);
  let count = 0;
  e.currentTarget.elements[0].value = '';
  e.currentTarget.elements[1].value = '';
  e.currentTarget.elements[2].value = '';

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