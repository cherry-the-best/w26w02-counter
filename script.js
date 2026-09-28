// 설정 값 (초 단위)
const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

// 상태 변수
let timeLeft = WORK_TIME;
let timerId = null;
let currentMode = "WORK"; // "WORK" 또는 "BREAK"

// DOM 요소
const timerDisplay = document.getElementById("timer-display");
const modeTitle = document.getElementById("mode-title");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const workModeBtn = document.getElementById("work-mode-btn");
const breakModeBtn = document.getElementById("break-mode-btn");

// 화면 시간 표시 업데이트
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// 타이머 시작
function startTimer() {
  if (timerId !== null) return;

  startBtn.disabled = true;
  pauseBtn.disabled = false;

  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      alert(currentMode === "WORK" ? "작업 끝! 휴식하세요." : "휴식 끝! 다시 작업에 집중해보세요.");
      switchMode(currentMode === "WORK" ? "BREAK" : "WORK");
    }
  }, 1000);
}

// 타이머 일시정지
function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// 타이머 리셋
function resetTimer() {
  pauseTimer();
  timeLeft = currentMode === "WORK" ? WORK_TIME : BREAK_TIME;
  updateDisplay();
}

// 모드 전환
function switchMode(mode) {
  pauseTimer();
  currentMode = mode;

  if (mode === "WORK") {
    timeLeft = WORK_TIME;
    modeTitle.textContent = "작업 시간";
    timerDisplay.style.color = "#ff5e57";
    workModeBtn.classList.add("active");
    breakModeBtn.classList.remove("active");
  } else {
    timeLeft = BREAK_TIME;
    modeTitle.textContent = "휴식 시간";
    timerDisplay.style.color = "#2bcbba";
    breakModeBtn.classList.add("active");
    workModeBtn.classList.remove("active");
  }

  updateDisplay();
}

// 이벤트 리스너 등록
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

workModeBtn.addEventListener("click", () => switchMode("WORK"));
breakModeBtn.addEventListener("click", () => switchMode("BREAK"));

// 초기화
updateDisplay();