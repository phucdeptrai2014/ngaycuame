const giftBox = document.getElementById("giftBox");
const giftScreen = document.getElementById("giftScreen");
const mainContent = document.getElementById("mainContent");

let opened = false;

// CLICK HỘP QUÀ
giftBox.onclick = () => {
if (opened) return;
opened = true;

giftBox.classList.add("open");

setTimeout(() => {
giftScreen.style.display = "none";
mainContent.classList.remove("hidden");

startTyping();
startSlides();
startHearts();
startFireworks();

}, 900);
};



// ✍️ CHỮ GÕ AN TOÀN
function startTyping(){
const text = "Gửi mẹ yêu ❤️ Con yêu mẹ rất nhiều...";
let i = 0;
const el = document.getElementById("typing");

function run(){
if(i < text.length){
el.innerHTML += text[i];
i++;
setTimeout(run, 70);
}
}
run();
}



// 📸 SLIDESHOW KHÔNG LỖI
function startSlides(){
const slides = document.querySelectorAll(".slide");
let i = 0;

setInterval(() => {
slides.forEach(s => s.classList.remove("active"));
i = (i + 1) % slides.length;
slides[i].classList.add("active");
}, 2500);
}



// ❤️ TIM BAY (GIỚI HẠN TRÁNH LAG)
function startHearts(){
setInterval(() => {
const heart = document.createElement("div");
heart.className = "heart";
heart.innerHTML = "❤️";

heart.style.left = Math.random()*window.innerWidth + "px";
heart.style.fontSize = (10 + Math.random()*20) + "px";

document.body.appendChild(heart);

setTimeout(() => heart.remove(), 4000);

}, 300);
}



// 🎆 PHÁO HOA ỔN ĐỊNH
function startFireworks(){
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function create(x,y){
return {
x,y,
vx:Math.random()*4-2,
vy:Math.random()*4-2,
alpha:1
};
}

function explode(){
for(let i=0;i<25;i++){
particles.push(create(
Math.random()*canvas.width,
Math.random()*canvas.height/2
));
}
}

setInterval(explode, 1200);

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach((p,i)=>{
p.x += p.vx;
p.y += p.vy;
p.alpha -= 0.01;

ctx.fillStyle = `rgba(255,105,180,${p.alpha})`;
ctx.beginPath();
ctx.arc(p.x,p.y,3,0,Math.PI*2);
ctx.fill();

if(p.alpha <= 0) particles.splice(i,1);
});

requestAnimationFrame(draw);
}

draw();
}