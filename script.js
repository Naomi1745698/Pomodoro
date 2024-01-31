let workTimer, breakTimer;
let darkMode = false;
let workTime, breakTime;
let isWorkTime = true;

document.addEventListener('DOMContentLoaded', function () {
    const sun = document.getElementById('sun');
    sun.addEventListener('click', toggleDarkMode);

    if (document.getElementById('settings-container')) {
        // Page 1: Settings
        document.getElementById('sun').style.backgroundImage = darkMode ? "url('moon.png')" : "url('sun.png')";
    } else if (document.getElementById('timer-container')) {
        // Page 2: Timer
        startPomodoro();
    }
});

function updateSliderText(type) {
    const slider = type === 'work' ? document.getElementById('work-timer') : document.getElementById('break-timer');
    const value = slider.value;
    const textElement = type === 'work' ? document.getElementById('work-timer-value') : document.getElementById('break-timer-value');

    textElement.textContent = type === 'work' ? `Work Time: ${value} minutes` : `Break Time: ${value} minutes`;
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
    workTime = document.getElementById('work-timer').value * 60;
    breakTime = document.getElementById('break-timer').value * 60;

    const timerContainer = document.getElementById('timer-container');

    function switchToBreak() {
        timerContainer.style.backgroundColor = '#D1FFD1'; /* Set your soft pastel green color */
        document.getElementById('message').textContent = 'Break Time!';
        isWorkTime = false;
        setTimeout(startPomodoro, 1000);
    }

    function switchToWork() {
        timerContainer.style.backgroundColor = '#FFD1D1'; /* Set your soft pastel red color */
        document.getElementById('message').textContent = 'Work Time!';
        isWorkTime = true;
        setTimeout(startPomodoro, 1000);
    }

    if (isWorkTime) {
        workTimer = setInterval(() => {
            workTime--;
            document.getElementById('timer').textContent = formatTime(workTime);

            if (workTime === 0) {
                clearInterval(workTimer);
                switchToBreak();
            }
        }, 1000);
    } else {
        breakTimer = setInterval(() => {
            breakTime--;
            document.getElementById('timer').textContent = formatTime(breakTime);

            if (breakTime === 0) {
                clearInterval(breakTimer);
                switchToWork();
            }
        }, 1000);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function goBack() {
    clearInterval(workTimer);
    clearInterval(breakTimer);
    location.reload();
}
