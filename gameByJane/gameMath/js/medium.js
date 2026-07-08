const questionEl = document.getElementById("question");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");

const scoreEl = document.getElementById("score");
const comboEl = document.getElementById("combo");
const timerEl = document.getElementById("timer");

const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progressBar");

const comboText = document.getElementById("comboText");

const resultModal = document.getElementById("resultModal");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

let score = 0;
let combo = 0;
let correct = 0;
let wrong = 0;

let timeLeft = 60;
let answer = 0;

let soundEnabled = JSON.parse(localStorage.getItem("soundEnabled"));
if (soundEnabled === null) soundEnabled = true;

function playSound(sound) {
    if (!soundEnabled) return;
    sound.currentTime = 0;
    sound.play();
}

/* ---------------- TIMER ---------------- */
const timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    progressBar.style.width = (timeLeft / 60) * 100 + "%";

    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
    }
}, 1000);

/* ---------------- QUESTION ---------------- */
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;

    const ops = ["+", "-", "×"];
    const op = ops[Math.floor(Math.random() * ops.length)];

    if (op === "+") answer = num1 + num2;
    if (op === "-") answer = num1 - num2;
    if (op === "×") answer = num1 * num2;

    questionEl.textContent = `${num1} ${op} ${num2}`;
}

generateQuestion();

/* ---------------- CHECK ANSWER ---------------- */
submitBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkAnswer();
});

function checkAnswer() {
    const user = parseInt(answerInput.value);

    if (isNaN(user)) return;

    if (user === answer) {
        correct++;
        combo++;
        score += 10;

        playSound(correctSound);

        feedback.className = "correct";
        feedback.textContent = "✅ ถูกต้อง!";

        /* COMBO BONUS */
        if (combo === 2) {
            score += 5;
            comboText.textContent = "🔥 Combo x2 +5!";
        }

        if (combo === 3) {
            score += 10;
            comboText.textContent = "🔥🔥 Combo x3 +10!";
        }

    } else {
        wrong++;
        combo = 0;

        playSound(wrongSound);

        feedback.className = "wrong";
        feedback.textContent = "❌ ผิด!";
        comboText.textContent = "";
    }

    scoreEl.textContent = score;
    comboEl.textContent = combo;

    answerInput.value = "";
    generateQuestion();
}

restartBtn.addEventListener(
"click",
()=>location.reload()
);

/* ---------------- END GAME ---------------- */
function endGame() {
    answerInput.disabled = true;
    submitBtn.disabled = true;

    let highScore = parseInt(localStorage.getItem("highScore")) || 0;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", score);
    }

    playSound(winSound);

    document.getElementById("finalScore").textContent = score;
    document.getElementById("correctCount").textContent = correct;
    document.getElementById("wrongCount").textContent = wrong;

    let accuracy = 0;
    if (correct + wrong > 0) {
        accuracy = ((correct / (correct + wrong)) * 100).toFixed(1);
    }

    document.getElementById("accuracy").textContent = accuracy;
    document.getElementById("highScore").textContent = highScore;

    resultModal.style.display = "flex";
}