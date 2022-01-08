const width = 28;
const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
//to grab the element of score
const squares = [];
let score = 0;

//Create an array to prevent square overlap.
//28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

//using for loops to create squares
//create board
const createBoard = () => {
  for (let i = 0; i < layout.length; i++) {
    // create a square
    const square = document.createElement("div");
    //put square in a grid
    grid.appendChild(square);
    //put square in squares array
    squares.push(square);

    //an if else statement to create the layout
    if (layout[i] === 0) {
      squares[i].classList.add("pac-dot");
    } else if (layout[i] === 1) {
      squares[i].classList.add("wall");
    } else if (layout[i] === 2) {
      squares[i].classList.add("ghost-lair");
    } else if (layout[i] === 3) {
      squares[i].classList.add("power-pellet");
    } else if (layout[i] === 4) {
      squares[i].classList.add("empty");
    }
  }
};
//call the function
createBoard();

//starting current position of pacman
let pacmanCurrentIndex = 490;

squares[pacmanCurrentIndex].classList.add("pacman");

// creating controlling keys using eventlistener and switch statement
const control = (e) => {
  //to toggle pacman we use classList.remove & use modulus operator to move pacman
  squares[pacmanCurrentIndex].classList.remove("pacman");
  switch (e.key) {
    case "ArrowDown":
      console.log("pressed down");
      //to avoid hitting the wall we use the classlist contain to illustrate the div
      //to avoid going to ghost lair
      if (
        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair") &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        pacmanCurrentIndex + width < width * width
      )
        pacmanCurrentIndex += width;
      break;
    case "ArrowUp":
      console.log("pressed up");
      if (
        !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair") &&
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        pacmanCurrentIndex - width > width / width
      )
        pacmanCurrentIndex -= width;
      break;
    case "ArrowLeft":
      console.log("pressed left");
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair") &&
        !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
        pacmanCurrentIndex % width !== 0
      )
        pacmanCurrentIndex -= 1;
      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391;
      }
      break;
    case "ArrowRight":
      console.log("pressed right");
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair") &&
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        pacmanCurrentIndex % width !== 0
      )
        pacmanCurrentIndex += 1;
      //to go the other side
      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364;
      }
      break;
  }
  //to readd pacman to its new location
  squares[pacmanCurrentIndex].classList.add("pacman");
  //invoke pacDot eaten function
  pacDotEaten();
  //invoke powerpellet function
  powerPelletEaten();
  //invoke win
  checkForWin();
  //invoke gameover
  gameOver();
};

document.addEventListener("keyup", control);

// create a function to display change when a pacman eats a pacdot, display score
const pacDotEaten = () => {
  //if statement to add score
  if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
    score++;
    //remove the class of pacdot
    squares[pacmanCurrentIndex].classList.remove("pac-dot");
    //to diplay score
    scoreDisplay.innerHTML = score;
  }
};
//using settimeout for alert when pacman eat a big powerpellet so that it can vanish

const powerPelletEaten = () => {
  //if square pacman is in contains a power pellet
  if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
    //removing class of power-pellet from square
    squares[pacmanCurrentIndex].classList.remove("power-pellet");
    //add a score of 10
    score += 10;

    //change each of the four ghosts to isScared using for each
    ghosts.forEach((ghost) => (ghost.isScared = true));

    //use setTimeout to unscare ghosts after 10 seconds
    setTimeout(unScareGhosts, 10000);
  }
};
const unScareGhosts = () => {
  ghosts.forEach((ghost) => (ghost.isScared = false));
};

// will use class constructor to create ghosts
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    //to track where the ghosts are all the time
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}
//array for ghosts
const ghosts = [
  new Ghost("blinky", 348, 250),
  new Ghost("pinky", 376, 400),
  new Ghost("inky", 351, 300),
  new Ghost("clyde", 379, 500),
];
//draw my ghosts into my grid using for each
ghosts.forEach((ghost) => {
  squares[ghost.currentIndex].classList.add(ghost.className);
  //add a class of ghost(invisible) so that each ghost has its own class
  squares[ghost.currentIndex].classList.add("ghost");
});

//move the ghosts with for each loop
ghosts.forEach((ghost) => moveGhost(ghost));
function moveGhost(ghost) {
  //a ghost move any direction
  const directions = [+1, -1, -width, +width];
  //use math floor array to enable the ghost to move around.
  let direction = directions[Math.floor(Math.random() * directions.length)];
  //use setInterval to move the ghosts with a timer
  ghost.timerId = setInterval(function () {
    //if the next square does NOT contain a wall and does not contain a ghost
    if (
      !squares[ghost.currentIndex + direction].classList.contains("wall") &&
      !squares[ghost.currentIndex + direction].classList.contains("ghost")
    ) {
      //remove any ghost class
      squares[ghost.currentIndex].classList.remove(ghost.className);
      //prevent hovering of ghost
      //add scared-ghost to remove a trail of scared ghosts
      squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
      //add direction to current Index
      ghost.currentIndex += direction;
      //add ghost class
      squares[ghost.currentIndex].classList.add(ghost.className);
      squares[ghost.currentIndex].classList.add("ghost");
    } else direction = directions[Math.floor(Math.random() * directions.length)];

    // if the ghost is scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
    }
    //if the ghost is current scared AND pacman is on it
    if (
      ghost.isScared &&
      squares[ghosts.CurrentIndex].classList.contains("pacman")
    ) {
      //remove classnames - ghost.className, 'ghost', 'scared-ghost'
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
      // change ghosts currentIndex back to its startIndex
      ghost.currentIndex = ghost.startIndex;

      //add a score of 100
      score += 100;

      //re-add classnames of ghost.className and 'ghost' to the ghosts new postion
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    } //invoke gameover
    //gameOver();
  }, ghost.speed);
}
//check for gme over
const gameOver = () => {
  //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost
  if (
    squares[pacmanCurrentIndex].classList.contains("ghost") &&
    !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
  )
    //for each ghost - we need to stop it moving using clear interval
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
  //remove eventlistener from our control function
  document.removeEventListener("keyup", control);
  //tell user the game is over
  scoreDisplay.innerHTML = "You lose";
};
//check for win
function checkForWin() {
  if (score === 274) {
    //stop each ghost
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    //remove the eventListener for the control function
    document.removeEventListener("keyup", control);
    //tell our user we have won
    scoreDisplay.innerHTML = "You win";
  }
}
