const questionEl =
document.getElementById("question");

const answerInput =
document.getElementById("answerInput");

const submitBtn =
document.getElementById("submitBtn");

const scoreEl =
document.getElementById("score");

const comboEl =
document.getElementById("combo");

const feedback =
document.getElementById("feedback");

const timeText =
document.getElementById("timeText");

const progressBar =
document.getElementById("progressBar");

const restartBtn =
document.getElementById("restartBtn");

let score = 0;
let combo = 0;
let correct = 0;
let wrong = 0;

let answer = 0;

let timeLeft = 60;

const soundEnabled =
JSON.parse(
localStorage.getItem(
"soundEnabled"
)
);

const correctSound =
document.getElementById(
"correctSound"
);

const wrongSound =
document.getElementById(
"wrongSound"
);

const winSound =
document.getElementById(
"winSound"
);

generateQuestion();

const timer =
setInterval(() => {

timeLeft--;

timeText.textContent =
timeLeft;

progressBar.style.width =
(timeLeft / 60) * 100 + "%";

if(timeLeft <= 0){

clearInterval(timer);

endGame();

}

},1000);

submitBtn.addEventListener(
"click",
checkAnswer
);

answerInput.addEventListener(
"keydown",
e=>{

if(e.key==="Enter")
checkAnswer();

}
);

restartBtn.addEventListener(
"click",
()=>location.reload()
);

function generateQuestion(){

const num1 =
Math.floor(
Math.random()*20
)+1;

const num2 =
Math.floor(
Math.random()*20
)+1;

const operators =
["+", "-"];

const op =
operators[
Math.floor(
Math.random()*operators.length
)
];

if(op === "+"){

answer = num1 + num2;

}

if(op === "-"){

answer = num1 - num2;

}

questionEl.textContent =
`${num1} ${op} ${num2}`;

}

function checkAnswer(){

const userAnswer =
parseInt(
answerInput.value
);

if(isNaN(userAnswer))
return;

if(userAnswer === answer){

score += 10;

combo++;

correct++;

if(combo === 5){

score += 5;

feedback.innerHTML =
"🔥 BONUS +5";

}

feedback.className =
"correct";

feedback.innerHTML =
"✅ ถูกต้อง";

if(soundEnabled)
correctSound.play();

}else{

wrong++;

combo = 0;

feedback.className =
"wrong";

feedback.innerHTML =
"❌ ผิด";

if(soundEnabled)
wrongSound.play();

}

scoreEl.textContent =
score;

comboEl.textContent =
combo;

answerInput.value = "";

generateQuestion();

}

function endGame(){

answerInput.disabled = true;

submitBtn.disabled = true;

let highScore =
parseInt(
localStorage.getItem(
"highScore"
)
)||0;

if(score > highScore){

highScore = score;

localStorage.setItem(
"highScore",
score
);

}

if(soundEnabled)
winSound.play();

document.getElementById(
"finalScore"
).textContent = score;

document.getElementById(
"correctCount"
).textContent = correct;

document.getElementById(
"wrongCount"
).textContent = wrong;

let accuracy = 0;

if(correct + wrong > 0){

accuracy =
(
correct /
(correct + wrong)
*100
).toFixed(1);

}

document.getElementById(
"accuracy"
).textContent =
accuracy;

document.getElementById(
"modalHighScore"
).textContent =
highScore;

document.getElementById(
"resultModal"
).style.display =
"flex";

}