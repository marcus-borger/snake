window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#gc"); //canvas
  const ctx = canvas.getContext("2d"); //context
  const scoreDiv = document.querySelector("#score"); //displays score
  const highscoreDiv = document.querySelector("#highscore"); //displays highscore
  let xVel = 0; //x Velocity
  let yVel = 0; //y Velocity
  let playerX = 10; //Player's X coordinate
  let playerY = 10; //Player's Y coordinate
  const gridSize = 20; //grid size
  const tileCount = 20; //amount of tiles
  let appleX = 15; //Apple's X coordinate
  let appleY = 15; //Apple's Y coordinate
  let trail = []; //snake's trail
  let tail = 5; //snake's default length
  let score = 0; //current score
  let highscore = 0; //highscore

  //on arrow key push
  document.addEventListener("keydown", keyPush);

  //gameloop
  setInterval(game, 1000 / 15);

  function game() {
    playerX += xVel; //horizontal movement
    playerY += yVel; //vertical movement

    if (playerX < 0) playerX = tileCount - 1; //wrap around left side of the screen
    if (playerX > tileCount - 1) playerX = 0; //wrap around right side of the screen

    if (playerY < 0) playerY = tileCount - 1; //wrap around top of the screen
    if (playerY > tileCount - 1) playerY = 0; //wrap around bottom of the screen

    //background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //apple
    ctx.fillStyle = "red";
    ctx.fillRect(
      appleX * gridSize,
      appleY * gridSize,
      gridSize - 2,
      gridSize - 2
    );

    //snake
    ctx.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(
        trail[i].x * gridSize,
        trail[i].y * gridSize,
        gridSize - 2,
        gridSize - 2
      );

      //reset snake size if he bites his butt
      if (trail[i].x === playerX && trail[i].y === playerY) {
        tail = 5;

        //if current score is higher than highscore, set new highscore
        highscore = score > highscore ? score : highscore;
        highscoreDiv.innerText = highscore;

        //reset score
        score = 0;
        scoreDiv.innerText = score;
      }
    }

    //increase snake size
    trail.push({ x: playerX, y: playerY });

    while (trail.length > tail) {
      trail.shift();
    }

    //eat an apple
    if (appleX === playerX && appleY === playerY) {
      tail++;
      appleX = Math.floor(Math.random() * tileCount);
      appleY = Math.floor(Math.random() * tileCount);
      score++;
      scoreDiv.innerText = score;
    }
  }

  function keyPush(e) {
    switch (e.keyCode) {
      case 37: //LEFT
        xVel = -1;
        yVel = 0;
        break;
      case 38: // UP
        xVel = 0;
        yVel = -1;
        break;
      case 39: //RIGHT
        xVel = 1;
        yVel = 0;
        break;
      case 40: //DOWN
        xVel = 0;
        yVel = 1;
        break;
    }
  }
});
