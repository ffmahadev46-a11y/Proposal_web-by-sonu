// script.js
const proposalText = document.getElementById('proposal-text');
const yesBtn = document.getElementById('yes-button');
const noInitBtn = document.getElementById('no-button-initial');
const noTeleportBtn = document.getElementById('no-button-teleport');
const buttonsContainer = document.getElementById('buttons-container');
const successMsg = document.getElementById('success-msg');
const sadMsg = document.getElementById('sad-msg');
const heartEmitter = document.getElementById('heart-emitter');
let no_count = 0;
const heartTypes = ['💕','♥','💖','❤️'];
function createHeart(){
  const heart = document.createElement('span');
  heart.textContent = heartTypes[Math.floor(Math.random()*heartTypes.length)];
  heart.className = 'heart';
  heart.style.setProperty('--duration', (Math.random()*6 + 6) + 's');
  heart.style.setProperty('--left', (Math.random()*100) + 'vw');
  const color = (Math.random()>0.5) ? '#ff69b4' : '#ff0000';
  heart.style.setProperty('--heart-color', color);
  heartEmitter.appendChild(heart);
  setTimeout(()=> heart.remove(), 12000);
}
setInterval(createHeart, 200);
yesBtn.addEventListener('click', ()=>{
  proposalText.style.display = 'none';
  buttonsContainer.style.display = 'none';
  noTeleportBtn.style.display = 'none';
  sadMsg.style.display = 'none';
  successMsg.textContent = "It feels like all the stars just aligned for me! ✨ My heart is yours, and now I know my life is complete. I promise to cherish you always. 🥰";
  successMsg.style.display = 'block';
  noTeleportBtn.onmouseover = null;
  noTeleportBtn.removeEventListener('touchmove', teleportNoButton);
  noTeleportBtn.removeEventListener('touchstart', handleNoTouchStart);
});
noInitBtn.addEventListener('click', ()=> handleNo(1));
function handleNo(stage){
  no_count = stage;
  if(no_count === 1){
    proposalText.innerHTML = "No? 🥺 That wasn't the answer I was hoping for. <strong>Are you absolutely sure? 😔</strong>";
    noInitBtn.textContent = "STILL NO 😫";
    noInitBtn.onclick = () => handleNo(2);
    sadMsg.textContent = "I feel a little heartbroken. 💔";
    sadMsg.style.display = 'block';
  } else if(no_count === 2){
    proposalText.innerHTML = "Please don't do this! 😭 I honestly believe we'd be amazing together. Just choose YES! 👇";
    noInitBtn.style.display = 'none';
    noTeleportBtn.style.display = 'block';
    noTeleportBtn.textContent = "NO";
    noTeleportBtn.onclick = () => alert("It seems your only choice is YES! 😉");
    noTeleportBtn.onmouseover = teleportNoButton;
    noTeleportBtn.addEventListener('touchmove', teleportNoButton);
    noTeleportBtn.addEventListener('touchstart', handleNoTouchStart);
    noTeleportBtn.style.position = 'fixed';
    teleportNoButton();
    sadMsg.textContent = "My heart is getting worried now. 😥";
    sadMsg.style.display = 'block';
  }
}
function teleportNoButton(){
  const btnW = noTeleportBtn.offsetWidth || 80;
  const btnH = noTeleportBtn.offsetHeight || 40;
  const maxW = Math.max(window.innerWidth - btnW - 20, 0);
  const maxH = Math.max(window.innerHeight - btnH - 20, 0);
  const newX = Math.floor(Math.random()*maxW);
  const newY = Math.floor(Math.random()*maxH);
  noTeleportBtn.style.left = newX + 'px';
  noTeleportBtn.style.top = newY + 'px';
  noTeleportBtn.style.zIndex = 9999;
}
function handleNoTouchStart(e){
  if(no_count === 2){
    e.preventDefault();
    teleportNoButton();
  }
}
noTeleportBtn.addEventListener('touchstart', handleNoTouchStart);