const questionEl = document.getElementById("question");
const answer = document.getElementById("answer");
const btn = document.getElementById("btn");

const scoreEl = document.getElementById("score");
const comboEl = document.getElementById("combo");
const timeEl = document.getElementById("time");
const bar = document.getElementById("barFill");
const warning = document.getElementById("warning");

const modal = document.getElementById("modal");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

let score = 0;
let combo = 0;
let correct = 0;
let wrong = 0;

const totalTime = 60;
let time = totalTime;
let currentAnswer = 0;

let sound = JSON.parse(localStorage.getItem("soundEnabled"));
if(sound === null) sound = true;

/* SOUND */
function play(s){
if(!sound) return;
s.currentTime = 0;
s.play();
}

/* QUESTION */
function gen(){
const a = Math.floor(Math.random()*100)+1;
const b = Math.floor(Math.random()*100)+1;

const ops = ["+","-","×","÷"];
const op = ops[Math.floor(Math.random()*ops.length)];

if(op==="+") currentAnswer = a+b;
if(op==="-") currentAnswer = a-b;
if(op==="×") currentAnswer = a*b;
if(op==="÷") currentAnswer = parseFloat((a/b).toFixed(2));

questionEl.textContent = `${a} ${op} ${b}`;
}

gen();

/* AUTO CHANGE EVERY 2s */
let auto = setInterval(()=>{
gen();
combo = 0;
warning.textContent = "⚠️ หมดเวลาโจทย์!";
wrong++;
updateUI();
},30000);

/* TIMER */
let timer = setInterval(() => {

    time--;

    timeEl.textContent = time;

    // ลดความกว้างของแถบ
    bar.style.width = (time / totalTime) * 100 + "%";

    if (time <= 0) {
        time = 0;
        timeEl.textContent = 0;
        bar.style.width = "0%";

        clearInterval(timer);
        clearInterval(auto);

        end();
    }

}, 1000);

/* CHECK */
btn.onclick = ()=>{
const val = parseFloat(answer.value);
if(isNaN(val)) return;

if(val === currentAnswer){
correct++;
combo++;
score += 10;

play(correctSound);

warning.textContent = "✔ ถูก!";
}else{
wrong++;
combo=0;

play(wrongSound);

warning.textContent = "✘ ผิด!";
}

answer.value="";
updateUI();
gen();
};

function updateUI(){
scoreEl.textContent = score;
comboEl.textContent = combo;
}

/* END */
function end(){

answer.disabled = true;
btn.disabled = true;

let high = parseInt(localStorage.getItem("highScore"))||0;

if(score>high){
localStorage.setItem("highScore",score);
high=score;
}

restartBtn.addEventListener(
"click",
()=>location.reload()
);

play(winSound);

document.getElementById("finalScore").textContent = score;
document.getElementById("correct").textContent = correct;
document.getElementById("wrong").textContent = wrong;

let acc = 0;
if(correct+wrong>0){
acc = ((correct/(correct+wrong))*100).toFixed(1);
}

document.getElementById("acc").textContent = acc;
document.getElementById("high").textContent = high;

modal.style.display="flex";
}