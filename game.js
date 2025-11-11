let gameSeq = [];
let userSeq = [];

let btns = ["red", "purple", "green", "yellow"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let scoreDisplay = document.querySelector("#score");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game started");
        started = true;
        levelUp(); // Start the game
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 1000);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randbtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    btnFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = `Game Over! Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor="red ";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnPress() {
    scoreDisplay.innerText = `Score: 0`;
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    scoreDisplay.innerText = `Score: ${level}`;
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}