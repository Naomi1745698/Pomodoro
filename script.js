let workTimer, breakTimer;
let darkMode = false;
let workTime, breakTime;
let isWorkTime = true;

document.addEventListener('DOMContentLoaded', function () {
    const sun = document.getElementById('sun');
    sun.addEventListener('click', toggleDarkMode);

    if (document.getElementById('settings-container')) {
        // Page 1: Settings
        updateSliderText('work');
        updateSliderText('break');
    } else if (document.getElementById('timer-container')) {
        // Page 2: Timer
        initializeTimers();
        startPomodoro();
    }
});

function goPomo() {
    const workTime = document.getElementById('work-timer').value;
    const breakTime = document.getElementById('break-timer').value;
    window.location.href = `timer.html?workTime=${workTime}&breakTime=${breakTime}`;
    startPomodoro();
}
}

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
    // Get workTime and breakTime from URL parameters or other sources
    const urlParams = new URLSearchParams(window.location.search);
    workTime = urlParams.get('workTime') || 25 * 60; // Default to 25 minutes if not provided
    breakTime = urlParams.get('breakTime') || 5 * 60; // Default to 5 minutes if not provided

    const timerContainer = document.getElementById('timer-container');
    const timerDisplay = document.getElementById('timer');

    function switchToBreak() {
        timerContainer.style.backgroundColor = '#D1FFD1'; /* Set your soft pastel green color */
        document.getElementById('message').textContent = 'Break Time!';
        isWorkTime = false;
        timerDisplay.textContent = formatTime(breakTime); // Display initial break time
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
        timerDisplay.textContent = formatTime(workTime); // Display initial work time
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

    switchToWork(); // Start with the initial work session
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

function updateSliderText(type) {
    const slider = type === 'work' ? document.getElementById('work-timer') : document.getElementById('break-timer');
    const value = slider.value;
    const textElement = type === 'work' ? document.getElementById('work-timer-value') : document.getElementById('break-timer-value');

    textElement.textContent = type === 'work' ? `Work Time: ${value} minutes` : `Break Time: ${value} minutes`;

    // Update timer display on timer page if on that page
    if (document.getElementById('timer-container')) {
        document.getElementById('work-time-display').textContent = formatTime(workTime);
        document.getElementById('break-time-display').textContent = formatTime(breakTime);
    }
}

function initializeTimers() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = formatTime(workTime);
    document.getElementById('work-time-display').textContent = formatTime(workTime);
    document.getElementById('break-time-display').textContent = formatTime(breakTime);
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('timer-container')) {
        initializeTimers();
    }
});
