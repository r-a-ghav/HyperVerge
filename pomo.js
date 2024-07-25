let timer;
let isRunning = false;
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

startButton.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    let minutes = parseInt(minutesDisplay.textContent);
    let seconds = parseInt(secondsDisplay.textContent);
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          isRunning = false;
          alert('Time is up!');
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      minutesDisplay.textContent = String(minutes).padStart(2, '0');
      secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }, 1000);
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  minutesDisplay.textContent = '25';
  secondsDisplay.textContent = '00';
});