// script.js

let workTimer, breakTimer;
let darkMode = false;
let workTime, breakTime;
let isWorkTime = true;

document.addEventListener('DOMContentLoaded', function () {
    const sun = document.getElementById('sun');
    sun.addEventListener('click', toggleDarkMode);

    if (document.getElementById('settings-container')) {
        // Page 1: Settings
    } else if (document.getElementById('timer-container')) {
        // Page 2: Timer
        startPomodoro();
    }
});

function toggleDarkMode() {
    const body = document.body;
    const sun = document.getElementById('sun');

    darkMode = !darkMode;
    body.classList.toggle('dark-mode', darkMode);

    if (darkMode) {
        sun.style.backgroundImage = "url('moon.png')";
    } else {
        sun.style.backgroundImage = "url('sun.png')";
    }
}

function startPomodoro() {
    workTime = document.getElementById('work-timer').value * 60;
    breakTime = document.getElementById('break-timer').value * 60;

    const timerContainer = document.getElementById('timer-container');
    const timerDisplay = document.getElementById('timer');

    function switchToBreak() {
        timerContainer.style.backgroundColor = '#D1FFD1'; /* Set your soft pastel green color */
        document.getElementById('message').textContent = 'Break Time!';
        isWorkTime = false;
        breakTimer = setInterval(updateBreakTime, 1000);
    }

    function updateBreakTime() {
        breakTime--;
        timerDisplay.textContent = formatTime(breakTime);

        document.getElementById('work-time-display').textContent = formatTime(workTime);
        document.getElementById('break-time-display').textContent = formatTime(breakTime);

        if (breakTime === 0) {
            clearInterval(breakTimer);
            switchToWork();
        }
    }

    function switchToWork() {
        timerContainer.style.backgroundColor = '#FFD1D1'; /* Set your soft pastel red color */
        document.getElementById('message').textContent = 'Work Time!';
        isWorkTime = true;
        workTimer = setInterval(updateWorkTime, 1000);
    }

    function updateWorkTime() {
        workTime--;
        timerDisplay.textContent = formatTime(workTime);

        document.getElementById('work-time-display').textContent = formatTime(workTime);
        document.getElementById('break-time-display').textContent = formatTime(breakTime);

        if (workTime === 0) {
            clearInterval(workTimer);
            switchToBreak();
        }
    }

    // Initialize with the first work session
    switchToWork();
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function goBack() {
    clearInterval(workTimer);
    clearInterval(breakTimer);
    window.location.href = 'index.html';
}
