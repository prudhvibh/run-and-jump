let interval = 0
let position = 0;
let score = 0;

let startGame = function() {
  let startButton = document.getElementById("start");
  interval = setInterval(moveObstacle, 0.01);
  startButton.onclick = null;
}

let jump = function() {
  let player = document.getElementById("playerFileld")
  if (event.keyCode == 32) {
    player.style.bottom =  "150px";
    setTimeout(function() {
      player.style.bottom = "0px";
    }, 600);
  }
}

let moveObstacle = function() {
  let obstacle = document.getElementById('obstacles');
  position++;
  obstacle.style.right = position + "px";
  checkForCollision();
  if (position > 1240) {
    obstacle.style.backgroundColor = randomColour();
    score = updateScore();
    position = 10;
  }
}

let checkForCollision = function() {
  let obstacle = document.getElementById("obstacles");
  let player = document.getElementById("player");
  let obstaclePosition = obstacle.style.right.slice(0, -2);
  if (obstaclePosition > 1150 && player.y > 350){
    alertScore()
    pauseGame();
    resetGame();
  }
}

let pauseGame = function() {
  let startButton = document.getElementById("start");
  clearInterval(interval);
  startButton.onclick = startGame;
}

let updateScore = function() {
  let score = document.getElementById('score').innerText++;
  return score;
}

let resetGame = function() {
  location.reload();
}

let alertScore = function() {
  let score = document.getElementById('score').innerText;
  alert('you lose the game'+'\n'+`Your score is ${score}`)
}

let randomColour = function() {
  let colors=['red','green','blue','white','black','skyblue','orange','yellow'];
  let randomNumber = Math.floor(Math.random() * colors.length);
  return colors[randomNumber];
}
