/******************************/
/**********Positions***********/
/******************************/
const startPositions = [
  {	x: 210, y: 139	},
  {	x: 273, y: 68	},
  {	x: 330, y: 138	},
  {	x: 393, y: 68	},
];

const boardPositions = [
  {x: 0,	  y: 0,   action:'Start'},
  {x: 185,	y: 229, action:''},
  {x: 120,	y: 299, action:'P&R+D'},
  {x: 121,	y: 393, action:''},
  {x: 214,	y: 432, action:'P&R+D'},
  {x: 272,	y: 353, action:''},
  {x: 331,	y: 276, action:''},
  {x: 409,	y: 316, action:'P&R+D'},
  {x: 413,	y: 413, action:''},
  {x: 385,	y: 500, action:'Volta 1'},
  {x: 315,	y: 561, action:''},
  {x: 222,	y: 540, action:''},
  {x: 133,	y: 565, action:'P&R+D'},
  {x: 137,	y: 654, action:''},
  {x: 223,	y: 691, action:'P&R+D'},
  {x: 320,	y: 687, action:''},
  {x: 414,	y: 670, action:'Volta 1'},
  {x: 496,	y: 620, action:''},
  {x: 534,	y: 532, action:'P&R+D'},
  {x: 527,	y: 438, action:''},
  {x: 581,	y: 363, action:'P&R+D'},
  {x: 676,	y: 360, action:''},
  {x: 720,	y: 440, action:'Volta 1'},
  {x: 682,	y: 539, action:''},
  {x: 680,	y: 650, action:'P&R+D'},
  {x: 805,	y: 687, action:''},
  {x: 924,	y: 633, action:''},
  {x: 969,	y: 511, action:'Volta 1'},
  {x: 887,	y: 454, action:''},
  {x: 821,	y: 389, action:'P&R+D'},
  {x: 871,	y: 306, action:''},
  {x: 956,	y: 257, action:''},
  {x: 954,	y: 151, action:'P&R+D'},
  {x: 840,	y: 126, action:''},
  {x: 721,	y: 172, action:'Volta 1'},
  {x: 565,  y: 178, action:'End'},
];

const offsetX = -80;
const offsetY = -124;

var rollingD6 = false;

var spoonsSelected = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
];

var hasIAPlayer = false;

var activePlayer = 0;
var playersSquarePositions = [
  0,
  0,
  0,
  0
];

var playersSpoons = [
  99,
  99,
  99,
  99
]


function resetGame() {
  activePlayer = 0;
  playersSquarePositions = [
    0,
    0,
    0,
    0
  ];

  for (let i=0; i<4; i++) {
    const playerElement = document.getElementById(`player-spoon-${i}`);

    playerElement.style.left = `${startPositions[i].x}px`;
    playerElement.style.top = `${startPositions[i].y}px`;

    playerElement.classList.remove('hidden');
    for(let j=0; j<8; j++) {
      playerElement.classList.remove(`spoon-skin-${j}`);
    }
  }

  for (let i=0; i<8; i++) {
    const selectElement = document.getElementById(`select-spoon-${i}`);
    selectElement.classList.remove('selected');
    spoonsSelected[i] = false;
  }

  document.getElementById('menu-button-jogo').disabled = true;
  hasIAPlayer = false;
}


document.getElementById('select-spoon-0').addEventListener("click", (event) => {
  toggleSelectSpoon(0);
});
document.getElementById('select-spoon-1').addEventListener("click", (event) => {
  toggleSelectSpoon(1);
});
document.getElementById('select-spoon-2').addEventListener("click", (event) => {
  toggleSelectSpoon(2);
});
document.getElementById('select-spoon-3').addEventListener("click", (event) => {
  toggleSelectSpoon(3);
});
document.getElementById('select-spoon-4').addEventListener("click", (event) => {
  toggleSelectSpoon(4);
});
document.getElementById('select-spoon-5').addEventListener("click", (event) => {
  toggleSelectSpoon(5);
});
document.getElementById('select-spoon-6').addEventListener("click", (event) => {
  toggleSelectSpoon(6);
});
document.getElementById('select-spoon-7').addEventListener("click", (event) => {
  toggleSelectSpoon(7);
});

function toggleSelectSpoon(number) {
  const numberOfPlayersBeforeSelection = getNumberOfPlayers();
  const spoonElement = document.getElementById(`select-spoon-${number}`)

  if(numberOfPlayersBeforeSelection < 4 || spoonElement.classList.contains('selected')) {
    if(spoonElement.classList.contains('selected')) {
      spoonElement.classList.remove('selected');
      spoonsSelected[number] = false;
    } else {
      spoonElement.classList.add('selected');
      spoonsSelected[number] = true;
    }
  
    const numberOfPlayersAfterSelection = getNumberOfPlayers();
  
    const buttonPlayGame = document.getElementById('menu-button-jogo');
  
    if(numberOfPlayersAfterSelection === 0) {
      buttonPlayGame.disabled = true;
    } else {
      buttonPlayGame.disabled = false;
    }
  }
}

function startGame() {
  setPlayerSpoonsSelected();
  setPlayerSpoonsClasses();
}

function setPlayerSpoonsSelected() {
  var j = 0;
  for (let i=0; i<8; i++) {
    if(spoonsSelected[i]) {
      playersSpoons[j] = i;
      j++;
    }
  }
}

function setPlayerSpoonsClasses() {
  const numberOfPlayers = getNumberOfPlayers;

  if(numberOfPlayers === 1) {
    setIAPlayer();
  }

  for (let i=0; i<4; i++) {
    const playerElement = document.getElementById(`player-spoon-${i}`);
    if(playersSpoons[i] != 99) {
      playerElement.classList.add(`spoon-skin-${playersSpoons[i]}`);
    } else {
      playerElement.classList.add('hidden')
    }
  }
}

function getNumberOfPlayers() {
  var j = 0;
  for (let i=0; i<8; i++) {
    if(spoonsSelected[i]) {
      j++;
    }
  }

  return j;
}

function setIAPlayer() {
  hasIAPlayer = true;

  const IASkin = getRandomNumber(0,8)

  if(spoonsSelected[0] === IASkin) {
    if(IASkin === 7) {
      spoonsSelected[1] = 0;
    } else {
      spoonsSelected[1] = IASkin + 1;
    }
  } else {
    spoonsSelected[1] = IASkin;
  }
}

function removeAllNumbersFromD6() {
  const d6Element = document.getElementById('d6');
  d6Element.classList.remove('d6-1');
  d6Element.classList.remove('d6-2');
  d6Element.classList.remove('d6-3');
  d6Element.classList.remove('d6-4');
  d6Element.classList.remove('d6-5');
  d6Element.classList.remove('d6-6');
}

function showANumberOnD6(numberToShow) {
  removeAllNumbersFromD6();
  const d6Element = document.getElementById('d6');
  d6Element.classList.add(`d6-${numberToShow}`);
}

document.getElementById('d6').addEventListener("click", (event) => {
  rollAD6(activePlayer);
});

async function rollAD6(playerRollingTheD6) {
  const changeNumberTime = 200;

  if(!rollingD6) {
    rollingD6 = true;
    const rolledNumber = getRandomNumber(1, 7);
    const firstNumberToShow = rolledNumber === 1 ? 6 : rolledNumber - 1;
    const secondNumberToShow = rolledNumber === 6 ? 1 : rolledNumber + 1;
  
    playSound('dado');
    showANumberOnD6(firstNumberToShow);
  
    await waitTime(changeNumberTime);
    showANumberOnD6(secondNumberToShow);
  
    await waitTime(changeNumberTime);
    showANumberOnD6(rolledNumber);

    moveNumberOfSquares(rolledNumber, playerRollingTheD6);
  }
}

async function moveNumberOfSquares(numberOfSquares, playerNumber) {
  const lastSquare = boardPositions.length;
  const squareToGo = playersSquarePositions[playerNumber] + numberOfSquares;

  if(lastSquare > squareToGo) {
    const playerElementId = `player-spoon-${playerNumber}`;
    
    for(let i = 0; i<numberOfSquares; i++) {
      resetAnimation(playerElementId, 'grow-and-shrink');
      
      const fromSquare = playersSquarePositions[playerNumber] + i;
      const toSquare = playersSquarePositions[playerNumber] + i + 1;

      const isInStartingPosition = fromSquare === 0;

      const from = isInStartingPosition ? startPositions[playerNumber] : boardPositions[fromSquare];
      const to = boardPositions[toSquare];
      
      await move(
        playerElementId,
        from,
        to,
        time = 1000,
        isInStartingPosition
      );

      playSound(`step${i+1}`);
    }
    playersSquarePositions[playerNumber] += numberOfSquares;
    checkSquareAction(playersSquarePositions[playerNumber]);
    
    nextPlayer();
  } else {
    //more move than possible logic
    nextPlayer();
  }
}

async function checkSquareAction(position) {
  switch (boardPositions[position].action){
    case 'P&R+D':
      console.log();
      console.log();
    break;
    case 'Volta 1':
      console.log();
    break;
    case 'End' :
      console.log();
    break;
  }
}

function nextPlayer() {
  const numberOfPlayers = getNumberOfPlayers();

  if(numberOfPlayers > activePlayer + 1){
    activePlayer ++
  } else {
    activePlayer = 0;
  }

  rollingD6 = false;
}

async function move(elementId, from, to, time, isInStartingPosition) {
  const movement = [
    { left: `${isInStartingPosition ? from.x : from.x + offsetX}px`, top: `${isInStartingPosition ? from.y : from.y + offsetY}px` },
    { left: `${to.x + offsetX}px`, top: `${to.y + offsetY}px` },
  ];
  
  const timing = {
    duration: time,
    iterations: 1,
  };
  
  const elementToMove = document.getElementById(elementId);
  elementToMove.animate(movement, timing);

  return Promise.all(
    elementToMove.getAnimations().map((animation) => animation.finished),
  ).then(() => {
    elementToMove.style.left = `${to.x + offsetX}px`;
    elementToMove.style.top = `${to.y + offsetY}px`;
  });
}


document.getElementById('splash-button-comecar').addEventListener("click", (event) => {
  document.getElementById('splash-screen').classList.add('hidden');

  document.getElementById('menu-button-sound').classList.remove('hidden');
  //document.getElementById('menu-button-link').classList.remove('hidden');
  document.getElementById('menu-button-comecar').classList.remove('hidden');

  playMusic('bgm');
});

document.getElementById('menu-button-comecar').addEventListener("click", (event) => {
  goToPage('container-select-char');
  resetGame();
});

document.getElementById('menu-button-jogo').addEventListener("click", (event) => {
  goToPage('container-jogo');
  startGame();
});


/******************************/
/**********FUNCTIONS***********/
/******************************/
function arrayRandomSort(a, b) {  
  return 0.5 - Math.random();
}

function hasTouch() {
  return 'ontouchstart' in document.documentElement;
}

//max excluded
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function resetAnimation(elementId, animationClass){
  document.getElementById(elementId).classList.remove(animationClass);
  document.getElementById(elementId).offsetHeight;
  document.getElementById(elementId).classList.add(animationClass);
}

function waitTime(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
