const start = document.querySelector("#start");
const game = document.querySelector("#game");
const timer = document.querySelector("#timer");
const result = document.querySelector("#result");
let timeHeader = document.querySelector("#time-header");
let resultHeader = document.querySelector("#result-header");
const gameTime = document.querySelector("#game-time");

let score = 0;
let gameStarted = false;

start.addEventListener("click", startGame);
game.addEventListener("click", boxClick);
gameTime.addEventListener("input", setGameTime);

function show(el) {
  el.classList.remove("hide");
}

function hide(el) {
  el.classList.add("hide");
}

function startGame() {
  score = 0;
  setGameTime();
  gameTime.setAttribute("disabled", "true");

  gameStarted = true;
  hide(start);
  game.style.backgroundColor = "#fff";

  let interval = setInterval(function () {
    let time = parseFloat(timer.textContent);

    if (time <= 0) {
      clearInterval(interval);
      gameOver();
    } else {
      timer.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  render();
}

function gameScore() {
  result.textContent = score.toString();
}

function setGameTime() {
  let time = parseInt(gameTime.value);
  timer.textContent = time.toFixed(1);
  show(timeHeader);
  hide(resultHeader);
}

function gameOver() {
  gameStarted = false;
  gameScore();
  gameTime.removeAttribute("disabled");
  show(start);
  game.style.backgroundColor = "#ccc";
  game.innerHTML = "";
  hide(timeHeader);
  show(resultHeader);
}

function boxClick(e) {
  if (!gameStarted) {
    return null;
  }

  if (e.target.dataset.box) {
    score++;
    render();
  }
}

function render() {
  game.innerHTML = "";
  const box = document.createElement("div");
  const boxSize = getRandom(20, 100);
  const gameSize = game.getBoundingClientRect();
  const maxTop = gameSize.height - boxSize;
  const maxLeft = gameSize.width - boxSize;

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = getRandomColor();
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", true);
  game.prepend(box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const r = getRandom(0, 255);
  const g = getRandom(0, 255);
  const b = getRandom(0, 255);
  return `rgb(${r}, ${g}, ${b}`;
}
