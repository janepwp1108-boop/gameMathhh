const highScoreElement =
document.getElementById("highScore");

const playCountElement =
document.getElementById("playCount");

const resetBtn =
document.getElementById("resetBtn");

const soundBtn =
document.getElementById("soundBtn");

const clickSound =
document.getElementById("clickSound");

let soundEnabled =
JSON.parse(localStorage.getItem("soundEnabled"));

if(soundEnabled === null){
soundEnabled = true;
localStorage.setItem(
"soundEnabled",
true
);
}

loadStats();

function loadStats(){

const highScore =
localStorage.getItem("highScore") || 0;

const playCount =
localStorage.getItem("playCount") || 0;

highScoreElement.textContent =
highScore;

playCountElement.textContent =
playCount;

updateSoundButton();

}

function updateSoundButton(){

soundBtn.innerHTML =
soundEnabled
? "🔇 ปิดเสียง"
: "🔊 เปิดเสียง";

}

soundBtn.addEventListener("click",()=>{

soundEnabled = !soundEnabled;

localStorage.setItem(
"soundEnabled",
JSON.stringify(soundEnabled)
);

updateSoundButton();

playClick();

});

resetBtn.addEventListener("click",()=>{

const confirmReset =
confirm(
"ต้องการรีเซ็ตสถิติทั้งหมดหรือไม่?"
);

if(confirmReset){

localStorage.setItem(
"highScore",
0
);

localStorage.setItem(
"playCount",
0
);

loadStats();

alert("รีเซ็ตเรียบร้อย");

}

});

document
.querySelectorAll(".btn")
.forEach(btn=>{

btn.addEventListener("click",()=>{

increasePlayCount();

playClick();

});

});

function increasePlayCount(){

let count =
parseInt(
localStorage.getItem("playCount")
) || 0;

count++;

localStorage.setItem(
"playCount",
count
);

}

function playClick(){

if(!soundEnabled) return;

clickSound.currentTime = 0;

clickSound.play();

}