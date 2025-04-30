/******************************/
/**********Positions***********/
/******************************/
const startPositions = [
  {	x: 109, y: 108 },
  {	x: 181, y: 22  },
  {	x: 252, y: 88 },
  {	x: 322, y: 12  },
];

const boardPositions = [
  {x: 0,	  y: 0,   action:'Start'},
  {x: 89,	  y: 261, action:''},
  {x: 75,	  y: 370, action:'P&R+D'},
  {x: 172,	y: 414, action:''},
  {x: 236,	y: 338, action:'P&R+D'},
  {x: 315,	y: 281, action:''},
  {x: 382,	y: 331, action:''},
  {x: 389,	y: 424, action:'P&R+D'},
  {x: 350,	y: 509, action:''},
  {x: 273,	y: 538, action:'Volta 1'},
  {x: 193,	y: 529, action:''},
  {x: 106,	y: 541, action:''},
  {x: 99,	  y: 634, action:'P&R+D'},
  {x: 185,	y: 682, action:''},
  {x: 292,	y: 682, action:'P&R+D'},
  {x: 389,	y: 663, action:''},
  {x: 464,	y: 626, action:'Volta 1'},
  {x: 515,	y: 556, action:''},
  {x: 520,	y: 445, action:'P&R+D'},
  {x: 559,	y: 336, action:''},
  {x: 677,	y: 341, action:'P&R+D'},
  {x: 701,	y: 445, action:''},
  {x: 667,	y: 531, action:'Volta 1'},
  {x: 657,	y: 621, action:''},
  {x: 769,	y: 685, action:'P&R+D'},
  {x: 907,	y: 644, action:''},
  {x: 965,	y: 554, action:''},
  {x: 945,	y: 471, action:'Volta 1'},
  {x: 859,	y: 425, action:''},
  {x: 837,	y: 310, action:'P&R+D'},
  {x: 930,	y: 257, action:''},
  {x: 960,	y: 154, action:''},
  {x: 875,	y: 100, action:'P&R+D'},
  {x: 769,	y: 143, action:''},
  {x: 669,	y: 159, action:'Volta 1'},
  {x: 539,  y: 163, action:'End'},
];

const offsetX = -60;
const offsetY = -94;

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
];

var showingCorrectAnswer = false;

var questionsNumbersToRandomize = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
];
questionsNumbersToRandomize.sort(arrayRandomSort);
var questionCurrentPosition = 0;

function getQuestionNumber() {
  const questionNumberToReturn = questionsNumbersToRandomize[questionCurrentPosition];
  
  if(questionCurrentPosition === 29) {
    questionCurrentPosition = 0;
    questionsNumbersToRandomize.sort(arrayRandomSort);
  } else {
    questionCurrentPosition++;
  }

  return questionNumberToReturn;
}


function resetGame() {
  rollingD6 = false;
  activePlayer = 0;
  playersSquarePositions = [
    0,
    0,
    0,
    0
  ];
  playersSpoons = [
    99,
    99,
    99,
    99
  ];
  showingCorrectAnswer = false;
  hasIAPlayer = false;

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
      playSound('colher');
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
      playerElement.classList.add('hidden');
    }
  }
  
  addBlackWhite();
}

function addBlackWhite() {
  document.getElementById('board').classList.add('black-white');
  for (let i=0; i<4; i++) {
    const playerElement = document.getElementById(`player-spoon-${i}`);
    if(playersSpoons[i] != 99) {
      playerElement.classList.add('black-white');
    }
  }

  document.getElementById(`player-spoon-${activePlayer}`).classList.remove('black-white');
}

function removeBlackWhite() {
  document.getElementById('board').classList.remove('black-white');
  for (let i=0; i<4; i++) {
    const playerElement = document.getElementById(`player-spoon-${i}`);
    if(playersSpoons[i] != 99) {
      playerElement.classList.remove('black-white');
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

document.getElementById('d6-area').addEventListener("click", (event) => {
  const top = clamp(0, event.offsetY - 64, 630);
  const left = clamp(0, event.offsetX - 64, 890);
  rollAD6(activePlayer, top, left);
});

async function rollAD6(playerRollingTheD6, top, left) {
  const changeNumberTime = 200;

  if(!rollingD6) {
    rollingD6 = true;
    const rolledNumber = getRandomNumber(1, 7);
    const firstNumberToShow = rolledNumber === 1 ? 6 : rolledNumber - 1;
    const secondNumberToShow = rolledNumber === 6 ? 1 : rolledNumber + 1;
  
    const d6Element = document.getElementById('d6');
    d6Element.style.top = `${top}px`;
    d6Element.style.left = `${left}px`;

    playSound('dado');
    showANumberOnD6(firstNumberToShow);
  
    await waitTime(changeNumberTime);
    showANumberOnD6(secondNumberToShow);
  
    await waitTime(changeNumberTime);
    showANumberOnD6(rolledNumber);

    removeBlackWhite();
    moveNumberOfSquares(rolledNumber, playerRollingTheD6);
  }
}

async function moveNumberOfSquares(numberOfSquares, playerNumber, specialSound = false) {
  const lastSquare = boardPositions.length;
  const squareToGo = playersSquarePositions[playerNumber] + numberOfSquares;

  if(lastSquare > squareToGo) {
    const playerElementId = `player-spoon-${playerNumber}`;
    document.getElementById(playerElementId).classList.remove('same-square');
    
    for(let i = 0; i<numberOfSquares; i++) {
      resetAnimation(playerElementId, 'grow-and-shrink');
      
      const fromSquare = playersSquarePositions[playerNumber] + i;
      const toSquare = playersSquarePositions[playerNumber] + i + 1;

      const isInStartingPosition = fromSquare === 0;

      const from = isInStartingPosition ? startPositions[playerNumber] : boardPositions[fromSquare];
      const to = boardPositions[toSquare];

      if(!specialSound){
        playSound(`step${i+1}`);
      } else {
        playSound('progredir');
      }
      
      await move(
        playerElementId,
        from,
        to,
        time = 1000,
        isInStartingPosition
      );

      
    }
    playersSquarePositions[playerNumber] += numberOfSquares;
    checkSquareAction(playersSquarePositions[playerNumber]);
  } else {
    //more move than possible logic
    nextPlayer();
  }
}

async function moveMinusOneSquare(playerNumber) {
  const playerElementId = `player-spoon-${playerNumber}`;
  
  resetAnimation(playerElementId, 'grow-and-shrink');
  
  const fromSquare = playersSquarePositions[playerNumber];
  const toSquare = playersSquarePositions[playerNumber] -1;

  const from = boardPositions[fromSquare];
  const to = boardPositions[toSquare];
  
  playSound('retroceder');

  await move(
    playerElementId,
    from,
    to,
    time = 1000,
    false
  );

  
  
  playersSquarePositions[playerNumber] -= 1;
  checkSquareAction(playersSquarePositions[playerNumber]);
  
  //nextPlayer();
}

async function checkSquareAction(position) {
  switch (boardPositions[position].action){
    case 'P&R+D':
      const questionSelected = getQuestionNumber();
      document.getElementById(`question-${questionSelected}`).style.display = 'block';
    break;
    case 'Volta 1':
      moveMinusOneSquare(activePlayer);
    break;
    case 'End' :
      endGame();
    break;
    case '':
      nextPlayer();
    break;
  }
}

function endGame() {
  const victorySpoonSkin = playersSpoons[activePlayer];
  const bigSpoon = document.getElementById('big-spoon');

  for(let i=0; i<8; i++) {
    bigSpoon.classList.remove(`big-spoon-${i}`);
  }

  bigSpoon.classList.add(`big-spoon-${victorySpoonSkin}`);

  goToPage('container-end');
}

function nextPlayer() {
  const numberOfPlayers = getNumberOfPlayers();

  
  let samePosition = false;
  for(let i=0; i<4; i++) {
    if(activePlayer !== i) {
      if(playersSquarePositions[activePlayer] === playersSquarePositions[i]) {
        samePosition = true;
        document.getElementById(`player-spoon-${i}`).classList.add('same-square');
        document.getElementById(`player-spoon-${activePlayer}`).classList.add('same-square');
      }
    }
  }

  if(numberOfPlayers > activePlayer + 1){
    activePlayer ++
  } else {
    activePlayer = 0;
  }

  rollingD6 = false;
  addBlackWhite();
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

  playMusic('vinheta');
});

document.getElementById('menu-button-comecar').addEventListener("click", (event) => {
  goToPage('container-select-char');
  resetGame();
});

document.getElementById('menu-button-jogo').addEventListener("click", (event) => {
  goToPage('container-jogo');
  playMusic('bgm');
  startGame();
});

document.getElementById('button-voltar-end').addEventListener("click", (event) => {
  goToPage('container-menu');
});

document.querySelectorAll('.dica-btn').forEach((item, index) => {
  item.addEventListener("click", (event) => {
    if(!showingCorrectAnswer) {
      const btnId = event.target.id;
      const hintNumber = btnId.replace('dica-btn-','');
  
      document.getElementById(`question-${hintNumber}`).style.display = 'none';
      document.getElementById(`dica-${hintNumber}`).style.display = 'flex';
    }
  });
});

document.querySelectorAll('.dica-btn-voltar').forEach((item, index) => {
  item.addEventListener("click", (event) => {
    const btnId = event.target.id;
    const hintNumber = btnId.replace('dica-btn-voltar-','');

    document.getElementById(`question-${hintNumber}`).style.display = 'block';
    document.getElementById(`dica-${hintNumber}`).style.display = 'none';
  });
});

document.querySelectorAll('.answer').forEach((item, index) => {
  item.addEventListener("click", async (event) => {
      if(!showingCorrectAnswer) {
        showingCorrectAnswer = true;

        const correct = event.currentTarget.classList.contains('q-c');

        const btnId = event.currentTarget.id;
        let questionNumber = '';
        
        if(btnId.indexOf('answer-a-') > -1) {
          questionNumber = btnId.replace('answer-a-question-','');
        }
        if(btnId.indexOf('answer-b-') > -1) {
          questionNumber = btnId.replace('answer-b-question-','');
        }
        if(btnId.indexOf('answer-c-') > -1) {
          questionNumber = btnId.replace('answer-c-question-','');
        }

        showAnswer(`answer-a-question-${questionNumber}`);
        showAnswer(`answer-b-question-${questionNumber}`);
        showAnswer(`answer-c-question-${questionNumber}`);

        await waitTime(3000);
    
        hideAnswer(`answer-a-question-${questionNumber}`);
        hideAnswer(`answer-b-question-${questionNumber}`);
        hideAnswer(`answer-c-question-${questionNumber}`);
        document.getElementById(`question-${questionNumber}`).style.display = 'none';
        showingCorrectAnswer = false;

        if(correct){
          correctAnswerSelected();
        } else {
          wrongAnswerSelected();
        }
      }
    });
});

async function correctAnswerSelected() {
  await moveNumberOfSquares(1, activePlayer, true);

  //nextPlayer();
}

function wrongAnswerSelected() {
  nextPlayer();
}

function showAnswer(answerId) {
  const answerElement = document.getElementById(answerId);
  const correct = answerElement.classList.contains('q-c');

  if(correct){
    answerElement.classList.add('correct');
  } else {
    answerElement.classList.add('wrong');
  }
}

function hideAnswer(answerId) {
  const answerElement = document.getElementById(answerId);

  answerElement.classList.remove('correct');
  answerElement.classList.remove('wrong');
}


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

function clamp(num, min, max){
  return Math.min(Math.max(num, min), max)
}
