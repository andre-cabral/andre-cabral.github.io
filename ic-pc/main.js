/******************************/
/**********Positions***********/
/******************************/
const startPositions = [
  {	x: 210, y: 139	},
  {	x: 273, y: 68	},
  {	x: 330, y: 138	},
  {	x: 393, y: 68	},
];

const boardpositions = [
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
  {x: 565,  y: 178, action:'Vitória'},
];

var activePlayer = 0;
var playersSquarePositions = [
  0,
  0,
  0,
  0
];

document.getElementById('splash-button-comecar').addEventListener("click", (event) => {
  document.getElementById('splash-screen').classList.add('hidden');

  document.getElementById('menu-button-sound').classList.remove('hidden');
  document.getElementById('menu-button-link').classList.remove('hidden');
  document.getElementById('menu-button-comecar').classList.remove('hidden');

  playMusic('bgm');
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

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function moveNumberOfSquare(numberOfSquares) {

}

function resetAnimation(elementId, animationClass){
  document.getElementById(elementId).classList.remove(animationClass);
  document.getElementById(elementId).offsetHeight;
  document.getElementById(elementId).classList.add(animationClass);
}

function move(elementId, from, to, time = 1000, functionAfterMove = () => {}) {
  const movement = [
    { left: `${from.x}px`, top: `${from.y}px` },
    { left: `${to.x}px`, top: `${to.y}px` },
  ];
  
  const timing = {
    duration: time,
    iterations: 1,
  };
  
  const elementToMove = document.getElementById(elementId);
  elementToMove.animate(movement, timing);

  Promise.all(
    elementToMove.getAnimations().map((animation) => animation.finished),
  ).then(() => {
    functionAfterMove();
  });
}
