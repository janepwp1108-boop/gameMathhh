// ==============================
// เอฟเฟกต์ตัวหนังสือ
// ==============================

const letters = document.querySelectorAll(".game-title span");

const colors = [
"#ff3b3b",
"#ffd500",
"#00d4ff",
"#00ff66",
"#ff66ff",
"#ff8800",
"#66ffff",
"#ffffff"
];

setInterval(()=>{

letters.forEach(letter=>{

letter.style.color =
colors[Math.floor(Math.random()*colors.length)];

});

},500);


// ==============================
// เอฟเฟกต์ดาวตก
// ==============================

function createMeteor(){

const meteor =
document.createElement("div");

meteor.className="meteor";

meteor.style.left=
Math.random()*window.innerWidth+"px";

meteor.style.top=
Math.random()*200+"px";

meteor.style.animationDuration=
2+Math.random()*2+"s";

document.body.appendChild(meteor);

setTimeout(()=>{

meteor.remove();

},4000);

}

setInterval(createMeteor,1200);


// ==============================
// ประกายรอบปุ่ม
// ==============================

const playBtn =
document.querySelector(".play-btn");

playBtn.addEventListener("mouseenter",()=>{

for(let i=0;i<18;i++){

const star=
document.createElement("div");

star.className="spark";

const rect=
playBtn.getBoundingClientRect();

star.style.left=
rect.left+70+(Math.random()*120-60)+"px";

star.style.top=
rect.top+70+(Math.random()*120-60)+"px";

document.body.appendChild(star);

setTimeout(()=>{

star.remove();

},900);

}

});


// ==============================
// กดเล่นเกม
// ==============================

playBtn.addEventListener("click",function(e){

e.preventDefault();

playBtn.style.transform="scale(.8)";

playBtn.style.boxShadow="0 0 120px white";

setTimeout(()=>{

window.location.href="page/index.html";

},500);

});


// ==============================
// ดาววิบวับ
// ==============================

for(let i=0;i<80;i++){

const star=
document.createElement("div");

star.className="small-star";

star.style.left=
Math.random()*window.innerWidth+"px";

star.style.top=
Math.random()*window.innerHeight+"px";

star.style.animationDelay=
Math.random()*5+"s";

document.body.appendChild(star);

}