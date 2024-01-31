let workTimer, breakTimer;
let darkMode = false;
let workTime, breakTime;

// Ongoing to check user clicks dark mode
document.addEventListener('DOMContentLoaded', function () {
    const sun = document.getElementById('sun');
    sun.addEventListener('click', toggleDarkMode);
});

function toggleDarkMode() {
    const body = document.body; // Changes entire page
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

    document.body.innerHTML = `
        <div id="timer-container">
            <h1 class="title">Pomodoro Timer</h1>
            <div id="timer-info">
                <p>Work Time: ${formatTime(workTime)}</p>
                <p>Break Time: ${formatTime(breakTime)}</p>
            </div>
            <div id="timer">${formatTime(workTime)}</div>
            <img id="tomato-img" src="tomato.png" alt="Tomato Image">
            <div id="message"></div>
        </div>
        <img class="back-icon" src="back.png" alt="Back Icon" onclick="goBack()">
        <!-- div for the sun/moon icon for light/dark mode -->
        <div id="sun" class="sun"></div>
    `;

    workTimer = setInterval(() => {
        workTime--;
        document.getElementById('timer').textContent = formatTime(workTime);

        if (workTime === 0) {
            clearInterval(workTimer);
            document.body.style.backgroundColor = '#FFD1D1'; /* Set your break color */
            document.getElementById('message').textContent = 'Break Time!';
            setTimeout(startBreak, 1000);
        }
    }, 1000);

    function startBreak() {
        breakTimer = setInterval(() => {
            breakTime--;
            document.getElementById('timer').textContent = formatTime(breakTime);

            if (breakTime === 0) {
                clearInterval(breakTimer);
                document.body.style.backgroundColor = '#fff'; /* Set your original background color */
                document.getElementById('message').textContent = '';
                setTimeout(startPomodoro, 1000);
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
