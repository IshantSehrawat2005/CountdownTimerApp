// DOM elements
const daysInput = document.getElementById("daysInput");
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let countdownInterval;
let countdownTime = 0;
let endTime = 0;

startBtn.addEventListener("click", function() {
  // Clear any existing countdown interval
  clearInterval(countdownInterval);

  // Get values from input fields, default to 0 if empty
  const days = parseInt(daysInput.value) || 0;
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  // Calculate total milliseconds for the countdown
  countdownTime = (days * 24 * 60 * 60 * 1000) +
                  (hours * 60 * 60 * 1000) +
                  (minutes * 60 * 1000) +
                  (seconds * 1000);

  if (countdownTime <= 0) {
    alert("Please enter a valid countdown time.");
    return;
  }

  // Get current time and target time
  const startTime = new Date().getTime();
  endTime = startTime + countdownTime;

  // Update countdown every second
  countdownInterval = setInterval(updateCountdown, 1000);

  // Disable input fields after countdown starts
  daysInput.disabled = true;
  hoursInput.disabled = true;
  minutesInput.disabled = true;
  secondsInput.disabled = true;
});

stopBtn.addEventListener("click", function() {
  clearInterval(countdownInterval);

  // Enable input fields when stopped
  daysInput.disabled = false;
  hoursInput.disabled = false;
  minutesInput.disabled = false;
  secondsInput.disabled = false;
});

resetBtn.addEventListener("click", function() {
  clearInterval(countdownInterval);
  daysInput.value = '0';
  hoursInput.value = '0';
  minutesInput.value = '0';
  secondsInput.value = '0';

  // Enable input fields when reset
  daysInput.disabled = false;
  hoursInput.disabled = false;
  minutesInput.disabled = false;
  secondsInput.disabled = false;
});

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endTime - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    daysInput.value = '0';
    hoursInput.value = '0';
    minutesInput.value = '0';
    secondsInput.value = '0';

    // Enable input fields when countdown ends
    daysInput.disabled = false;
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;

    return;
  }

  const daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secondsRemaining = Math.floor((distance % (1000 * 60)) / 1000);

  daysInput.value = daysRemaining;
  hoursInput.value = hoursRemaining;
  minutesInput.value = minutesRemaining;
  secondsInput.value = secondsRemaining;
}
