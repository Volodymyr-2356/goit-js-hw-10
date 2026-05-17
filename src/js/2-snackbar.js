import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

  const delay = Number(event.currentTarget.delay.value);
  const state = event.currentTarget.state.value;

  createPromise(delay, state)
    .then(delay => {
      iziToast.show({  message: `✅ Fulfilled promise in ${delay}ms`, position: 'topRight',backgroundColor: 'red',messageColor: 'white', titleColor:'white' });
    })
      .catch(delay => {
          iziToast.show({  message: `❌ Rejected promise in ${delay}ms`, position: 'topRight',backgroundColor: 'red',messageColor: 'white', titleColor:'white' });
 
    });

  event.currentTarget.reset();
    
});



function createPromise(delay, state) {
  const promise= new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  }); 
    return promise;
}