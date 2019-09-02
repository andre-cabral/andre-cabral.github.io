//$(function() {
  
  /********VARIABLES*/
  var boardX = pathfindMap[0],
      boardY = pathfindMap,
      astarGraph = new Graph(pathfindMap);
      lastPlayedSound = '',
      lives = 5,
      startingLives = 5,
      stagePointIndex = 0,
      //stagePointsToDeliver = [],
      startingSquare = '1-1',
      actualSquare = '1-1',
      canWalk = true,
      catStartingSquare = '8-12',
      catActualSquare = '8-12',
      catTarget = '',
      catHeight = 146,
      catMoveTime = 360,
      catPoints = 0,
      hideCat = false,
      minigameIconWidth = 128,
      //the icon is smaller in height, but this number will put it in the right y
      minigameIconHeight = 164,
      showingLastIcon = false,
      lastIconPosition = '4-7',
      squareWidth = 64,
      squareHeight = 64,
      paddingTopGrid = 44,
      paddingLeftGrid = 73,
      ratoHeight = 146,
      ratoMoveTime = 360,
      ratoIsMoving = false,
      ratoPoints = 0,
      targetWidth = 40,
      //the target is smaller, but this number will put it in the right y
      targetHeight = 100,
      endGame = false,
      movedTotal = 0,
      minimumMovedTotal = 0,
      numberOfObjects = 3,
      minigamesToPlay = new Array();

  /************* MENU **************/
  $('#menu-button-comecar').click(function(){
    $('.container-splash-screen').css('display', 'none');
    $('#container-tutorial').css('display', 'block');
    playSound('button2');
  });

  /*********/
  //button-avancar-encomendas is on bag.js
  /*********/
  

  $('#button-avancar-tutorial').click(function() {
    playSound('button2');
    startStage();
  });

  createBoard();

  $('#button-avancar-jogo').click(function() {
    playSound('button2');
    $('#container-jogo').css('display', 'none');
    $('#container-tutorial').css('display', 'block');
  });

  $('#button-voltar-end').click(function() {
    playSound('button2');
    $('#container-end').css('display', 'none');
    $('.container-splash-screen').css('display', 'block');
  });

  $('#button-voltar-gameover').click(function() {
    playSound('button2');
    $('#container-gameover').css('display', 'none');
    $('.container-splash-screen').css('display', 'block');
  });


  $('#button-game-left').click(function() {
    moveLeft(ratoMoveTime);
  });

  $('#button-game-up').click(function() {
    moveUp(ratoMoveTime);
  });

  $('#button-game-down').click(function() {
    moveDown(ratoMoveTime);
  });

  $('#button-game-right').click(function() {
    moveRight(ratoMoveTime);
  });


  /********GAME MECHANICS********/
  function createBoard() {
    $('#game-grid')
    //.append('<div id="target-deliver" class="target-deliver"></div>')
    .append('<div id="minigame-0" class="minigame-icon"></div>')
    .append('<div id="minigame-1" class="minigame-icon"></div>')
    .append('<div id="minigame-2" class="minigame-icon"></div>')
    .append('<div id="minigame-3" class="minigame-icon"></div>')
    .append('<div id="minigame-4" class="minigame-icon"></div>')
    .append('<div id="minigame-5" class="minigame-icon"></div>')
    .append('<div id="minigame-6" class="minigame-icon"></div>')
    .append('<div id="minigame-7" class="minigame-icon"></div>')
    .append('<div id="minigame-8" class="minigame-icon"></div>')
    .append('<div id="minigame-9" class="minigame-icon"></div>')
    .append('<div id="minigame-10" class="minigame-icon"></div>')
    .append('<div id="minigame-11" class="minigame-icon"></div>')
    .append('<div id="minigame-random" class="minigame-icon minigame-random"></div>')
    .append('<div id="rato" class="rato down right"></div>')
    .append('<div id="cat" class="cat down left"></div>');

    $('#rato').append('<div id="score-rato" class="score-number score-rato"></div>');
    $('#cat').append('<div id="score-cat" class="score-number score-cat"></div>');

    /*
    for(var j=0; j < boardY.length; j++) {
      for(var i=0; i < boardX.length; i++) {
        var id = j+'-'+i;
        var walkable = pathfindMap[j][i] == 1;
        if(walkable){
          $('#game-board').append('<div id="' + id + '" class="game-square game-square-walkable"></div>');
          //$('#game-grid').append('<div id="guide-' + id + '" class="game-guide game-guide-walkable"></div>');
        } else {
          $('#game-board').append('<div id="' + id + '" class="game-square not-walkable"></div>');
          //$('#game-grid').append('<div id="guide-' + id + '" class="game-guide game-guide-not-walkable"></div>');
        }
      }
    }
    */

  }

  function isAdjacentSquare(square1, square2) {
    if(typeof square1 == 'undefined' || typeof square2 == 'undefined'){
      return false;
    }
    var square1Array = square1.split('-');
    var square2Array = square2.split('-');

    if(!square1Array.length > 1 || !square2Array.length > 1){
      return false;
    }

    return  (
      (
        //same y, x adjacent
        (
          parseInt(square1Array[0])+1 == parseInt(square2Array[0]) ||
          parseInt(square1Array[0])-1 == parseInt(square2Array[0])
        ) && parseInt(square1Array[1]) == parseInt(square2Array[1])
      )
      ||
      (
        //same x, y adjacent
        (
          parseInt(square1Array[1])+1 == parseInt(square2Array[1]) ||
          parseInt(square1Array[1])-1 == parseInt(square2Array[1])
        ) && parseInt(square1Array[0]) == parseInt(square2Array[0])
      )
    );
  }

  
  function closerPointPathSize(startId, endId){
    return closerPointPath(startId, endId).length;
  }

  function closerPointPath(startId) {
    var closerPoint = actualSquare;
    var closerPointDistance = 9999;

    for (var i=0; i<minigamesToPlay.length; i++){
      if(smallerPathSize(startId, minigamesToPlay[i].point) < closerPointDistance
      && !minigamesToPlay[i].played){
        closerPoint = minigamesToPlay[i].point;
        closerPointDistance = smallerPathSize(startId, minigamesToPlay[i].point);
      }
    }

    if(showingLastIcon){
      closerPoint = lastIconPosition;
    }

    return smallerPath(startId, closerPoint);
  }

  function smallerPathSize(startId, endId){
    return smallerPath(startId, endId).length;
  }

  function smallerPath(startId, endId){
    var startArray = startId.split('-');
    var endArray = endId.split('-');

    var start = astarGraph.grid[startArray[0]][startArray[1]];
    var end = astarGraph.grid[endArray[0]][endArray[1]];
    var result = astar.search(astarGraph, start, end);
    result.unshift({x: startArray[0], y: startArray[1], weight: 1, toString: function(){return '[' + this.x + ' ' + this.y + ']'}});

    return result.toString().replace(/ /g, '-').replace(/\[/g, '').replace(/\]/g, '').split(',');
  }
  
  
  /*
  function getRandomPoints(max=5){
    var randomSectors = getRandomSectors();
    var randomPoints = new Array();

    for(var i=0; i<randomSectors.length; i++){
      var allSectorPoints = getPointsBySector(randomSectors[i]);
      var randomizedPoint = allSectorPoints[getRandomNumber(0, allSectorPoints.length)];

      //prevents the random point from being a point already used
      while(randomPoints.indexOf(randomizedPoint) > -1){
        randomizedPoint = allSectorPoints[getRandomNumber(0, allSectorPoints.length)];
      }

      randomPoints.push(randomizedPoint);
    }

    return randomPoints.slice(0, max);
  }
  function getRandomSectors(){
    var randomSectors = new Array();
    var firstSectors = [0,1,2,3].sort(arrayRandomSort);
    for (var i=0; i<firstSectors.length; i++){
      randomSectors.push(firstSectors[i]);
    }
    randomSectors.push(getRandomNumber(0, 4));

    return randomSectors;
  }


  function getPointsBySector(sector = 0){
    var pointsOnSector = new Array();
    switch(sector){
      case 0:
      for(var i=10; i<20; i++) {
        for(var j=0; j<6; j++) {
          if( deliverPoints.indexOf(j+'-'+i) > -1 ){
            pointsOnSector.push(j+'-'+i);
          }
        }
      }
      break;
      case 1:
        for(var i=10; i<20; i++) {
          for(var j=6; j<15; j++) {
            if( deliverPoints.indexOf(j+'-'+i) > -1 ){
              pointsOnSector.push(j+'-'+i);
            }
          }
        }
      break;
      case 2:
        for(var i=0; i<10; i++) {
          for(var j=6; j<15; j++) {
            if( deliverPoints.indexOf(j+'-'+i) > -1 ){
              pointsOnSector.push(j+'-'+i);
            }
          }
        }
      break;
      case 3:
      for(var i=0; i<10; i++) {
        for(var j=0; j<6; j++) {
          if( deliverPoints.indexOf(j+'-'+i) > -1 ){
            pointsOnSector.push(j+'-'+i);
          }
        }
      }
      break;
    }
    
    return pointsOnSector;
  }
  function getTargetPoints(point = '0-0'){
    var y = parseInt(point.split('-')[0]);
    var x = parseInt(point.split('-')[1]);
    
    var up = (y-1) + '-' + x;
    var right = y + '-' + (x+1);
    var down = (y+1) + '-' + x;
    var left = y + '-' + (x-1);
    var targets = new Array();
    
    if($('#'+up).hasClass('game-square-walkable')){
      targets.push(up);
    }
    if($('#'+right).hasClass('game-square-walkable')){
      targets.push(right);
    }
    if($('#'+down).hasClass('game-square-walkable')){
      targets.push(down);
    }
    if($('#'+left).hasClass('game-square-walkable')){
      targets.push(left);
    }
    
    return targets;
  }
  
  function sortPointsByClosest(a, b) {
    if (smallerPathSize(actualSquare, a) < smallerPathSize(actualSquare, b)) {
      return -1;
    }
    if (smallerPathSize(actualSquare, a) > smallerPathSize(actualSquare, b)) {
      return 1;
    }
    
    return 0;
  }
  */
  
  function showResultStars() {
    if(movedTotal <= 0){
      movedTotal = 1;
    }
    var percentage = (minimumMovedTotal / movedTotal) * 100

    if(percentage <= 65){
      return 'stars-1';
    }

    if(percentage > 65 && percentage <= 90){
      return 'stars-2';
    }

    if(percentage > 90){
      return 'stars-3';
    }
  }

  function minigameRandomIconToPosition(position = '0-0', type = 'name'){
    $('#minigame-random')
    .removeClass('name')
    .removeClass('number')
    .removeClass('analog')
    .removeClass('digital')
    .addClass(type);

    var y = parseInt(position.split('-')[0]);
    var x = parseInt(position.split('-')[1]);

    $('#minigame-random')
      .css('z-index', 200+y)
      .css('left', (squareWidth*x) - (minigameIconWidth-squareWidth)/2 + paddingLeftGrid)
      .css('top', (squareWidth*y) - (minigameIconHeight-squareHeight)/2 + paddingTopGrid);
  }

  function minigameIconToPosition(index = 0, position = '0-0', type = 'name'){
    $('#minigame-'+index)
    .removeClass('name')
    .removeClass('number')
    .removeClass('analog')
    .removeClass('digital')
    .addClass(type);

    var y = parseInt(position.split('-')[0]);
    var x = parseInt(position.split('-')[1]);

    $('#minigame-'+index)
      .css('z-index', 200+y)
      .css('left', (squareWidth*x) - (minigameIconWidth-squareWidth)/2 + paddingLeftGrid)
      .css('top', (squareWidth*y) - (minigameIconHeight-squareHeight)/2 + paddingTopGrid);
  }

  function catToStartPosition(){
    catToPosition(catStartingSquare);
  }

  function catToPosition(point = '3-9'){
    var y = parseInt(point.split('-')[0]);
    var x = parseInt(point.split('-')[1]);

    $('#cat')
      .css('z-index', 200+y)
      .css('left', (squareWidth*x) + paddingLeftGrid)
      .css('top', (squareWidth*y) - (catHeight-squareHeight) + paddingTopGrid);

    catActualSquare = y+'-'+x;
  }

  function setCatScore(score = 0){
    catPoints = score;
    $('#score-cat').text(catPoints);
  }

  function ratoToStartPosition(){
    ratoToPosition(startingSquare);
  }

  function ratoToPosition(point = '3-9'){
    var y = parseInt(point.split('-')[0]);
    var x = parseInt(point.split('-')[1]);

    $('#rato')
      .css('z-index', 200+y)
      .css('left', (squareWidth*x) + paddingLeftGrid)
      .css('top', (squareWidth*y) - (ratoHeight-squareHeight) + paddingTopGrid);

    actualSquare = y+'-'+x;
  }

  function directionToMove(idStart, idEnd){
    var xStart = parseInt(idStart.split('-')[1]);
    var yStart = parseInt(idStart.split('-')[0]);
    var xEnd = parseInt(idEnd.split('-')[1]);
    var yEnd = parseInt(idEnd.split('-')[0]);

    if(yEnd == yStart-1){
      return 'up';
    }
    if(xEnd == xStart+1){
      return 'right';
    }
    if(yEnd == yStart+1){
      return 'down';
    }
    if(xEnd == xStart-1){
      return 'left';
    }

    return 'none';
  }

  function executeSquareFunctions(){
    var hasMinigame = false;
    
    for (var i=0; i<minigamesToPlay.length; i++){
      if(minigamesToPlay[i].point == actualSquare
        && !minigamesToPlay[i].played){
          hasMinigame = true;
          minigamesToPlay[i].played = true;

          $('#minigame-'+i).css('display', 'none');

          playSound('minigametouch');

          startMinigame(minigamesToPlay[i].type);
      }
    }

    if(showingLastIcon && actualSquare == lastIconPosition){
      hasMinigame = true;

      $('#minigame-random').css('display', 'none');

      playSound('minigametouch');

      startMinigame(minigamesToPlay[0].type);
    }

    if(!hasMinigame){
      ratoAndCatCollision();
      catMoves();
    }
  }

  function setRatoScore(score = 0){
    ratoPoints = score;
    $('#score-rato').text(ratoPoints);
  }

  function setMinigames(){
    minigamesToPlay = new Array();

    var minigamesRandomized = minigameTypes.slice().sort(arrayRandomSort);
    for (var i=0; i<minigamePoints.length; i++){
      minigamesToPlay.push({
        point: minigamePoints[i],
        type: minigamesRandomized[i],
        played: false
      });

      minigameIconToPosition(i, minigamePoints[i], minigamesRandomized[i]);
    }
  }

  function startMinigame(type = 'analog'){
    switch(type){
      case 'analog':
        startAnalogMinigame();
      break;
      case 'digital':
        startDigitalMinigame();
      break;
      case 'name':
        startNameMinigame();
      break;
      case 'number':
        startNumberMinigame();
      break;
    }
  }

  function endMinigame(won = true){
    if(showingLastIcon){
      if(won){
        stageWin();
      }else{
        stageFailed();
      }
    }
    if(won){
      playSound('minigamesuccess');
      setRatoScore(ratoPoints + 1);
    }else{
      playSound('minigamefailure');
    }

    if(!hasIconOnBoard() && !showingLastIcon){
      lastIconCollected();
    }
    
    catMoves();
  }

  function catMoves(){
    if(hideCat){
      canWalk = true;
    }else{
      switch(
        directionToMove(catActualSquare, closerPointPath(catActualSquare)[1])
      ){
        case 'up':
          catMoveUp(catMoveTime);
        break;
        case 'down':
          catMoveDown(catMoveTime);
        break;
        case 'left':
          catMoveLeft(catMoveTime);
        break;
        case 'right':
          catMoveRight(catMoveTime);
        break;
      }
    }
  }

  function catMoveEnd(){
    canWalk = true;

    if(!hasIconOnBoard() && !showingLastIcon){
      lastIconCollected();
    }
  }

  function catMoveLeft(time=600){
    $( "#cat" )
      .removeClass('right')
      .addClass('left')
      .addClass('walking')
      .animate({
        left: '-='+squareWidth+'px'
      }, time, 'linear', function() {
        $('#cat').removeClass('walking');

        var y = parseInt(catActualSquare.split('-')[0]);
        var x = parseInt(catActualSquare.split('-')[1]);
        x--;
        catActualSquare = y+'-'+x;

        catExecuteSquareFunctions();
      });
  }

  function catMoveRight(time=600){
    $( "#cat" )
      .removeClass('left')
      .addClass('right')
      .addClass('walking')
      .animate({
        left: '+='+squareWidth+'px'
      }, time, 'linear', function() {
        $('#cat').removeClass('walking');

        var y = parseInt(catActualSquare.split('-')[0]);
        var x = parseInt(catActualSquare.split('-')[1]);
        x++;
        catActualSquare = y+'-'+x;

        catExecuteSquareFunctions();
      });
  }

  function catMoveUp(time=600){
    $( "#cat" )
      .removeClass('down')
      .addClass('up')
      .addClass('walking')
      .animate({
        top: '-='+squareHeight+'px'
      }, time, 'linear', function() {
        $('#cat')
          .removeClass('walking')
          .css(
            'z-index',
            parseInt($('#cat').css('z-index')) - 1
          );

        var y = parseInt(catActualSquare.split('-')[0]);
        var x = parseInt(catActualSquare.split('-')[1]);
        y--;
        catActualSquare = y+'-'+x;

        catExecuteSquareFunctions();
      });
  }

  function catMoveDown(time=600){
    $( "#cat" )
      .removeClass('up')
      .addClass('down')
      .addClass('walking')
      .animate({
        top: '+='+squareHeight+'px'
      }, time, 'linear', function() {
        $('#cat')
          .removeClass('walking')
          .css(
            'z-index',
            parseInt($('#cat').css('z-index')) + 1
          );

        var y = parseInt(catActualSquare.split('-')[0]);
        var x = parseInt(catActualSquare.split('-')[1]);
        y++;
        catActualSquare = y+'-'+x;

        catExecuteSquareFunctions();
      });
  }

  function catExecuteSquareFunctions(){    
    for (var i=0; i<minigamesToPlay.length; i++){
      if(minigamesToPlay[i].point == catActualSquare
        && !minigamesToPlay[i].played){
          minigamesToPlay[i].played = true;

          $('#minigame-'+i).css('display', 'none');

          setCatScore(catPoints + 1);

          playSound('minigametouch');
      }
    }

    if(showingLastIcon && catActualSquare == lastIconPosition){
      $('#cat').css('display', 'none');
      hideCat = true;

      playSound('minigametouch');
    }
  
    ratoAndCatCollision();
    catMoveEnd();
  }

  function hasIconOnBoard(){
    var hasIcon = false;
    for (var i=0; i<minigamesToPlay.length; i++){
      if(!minigamesToPlay[i].played){
        hasIcon = true;
      }
    }
    return hasIcon;
  }

  function canMoveTo(direction='left'){
    var y = parseInt(actualSquare.split('-')[0]);
    var x = parseInt(actualSquare.split('-')[1]);

    if($('#rato').hasClass('walking') || !canWalk){
      return false;
    }

    switch(direction){
      case 'left':
        if(x > 0 && y<7){
          return true;
        }
        if(x>5 && y>=7){
          return true;
        }
        return false;
      break;
      case 'up':
        if(y>0){
          return true;
        }
        return false;
      break;
      case 'down':
        if(x < 5 && y<6){
          return true;
        }
        if(x>=5 && y<9){
          return true;
        }
        return false;
      break;
      case 'right':
        if(x<13){
          return true;
        }
        return false;
      break;
      default:
        return false;
      break;
    }
  }
  
  function moveLeft(time=600){
    if(canMoveTo('left')){
      canWalk = false;
      $( "#rato" )
        .removeClass('right')
        .addClass('left')
        .addClass('walking')
        .animate({
          left: '-='+squareWidth+'px'
        }, time, 'linear', function() {
          $('#rato').removeClass('walking');

          var y = parseInt(actualSquare.split('-')[0]);
          var x = parseInt(actualSquare.split('-')[1]);
          x--;
          actualSquare = y+'-'+x;

          executeSquareFunctions();
        });
    }
  }

  function moveRight(time=600){
    if(canMoveTo('right')){
      canWalk = false;
      $( "#rato" )
        .removeClass('left')
        .addClass('right')
        .addClass('walking')
        .animate({
          left: '+='+squareWidth+'px'
        }, time, 'linear', function() {
          $('#rato').removeClass('walking');

          var y = parseInt(actualSquare.split('-')[0]);
          var x = parseInt(actualSquare.split('-')[1]);
          x++;
          actualSquare = y+'-'+x;

          executeSquareFunctions();
        });
    }
  }

  function moveUp(time=600){
    if(canMoveTo('up')){
      canWalk = false;
      $( "#rato" )
        .removeClass('down')
        .addClass('up')
        .addClass('walking')
        .animate({
          top: '-='+squareHeight+'px'
        }, time, 'linear', function() {
          $('#rato')
            .removeClass('walking')
            .css(
              'z-index',
              parseInt($('#rato').css('z-index')) - 1
            );

          var y = parseInt(actualSquare.split('-')[0]);
          var x = parseInt(actualSquare.split('-')[1]);
          y--;
          actualSquare = y+'-'+x;

          executeSquareFunctions();
        });
    }
  }

  function moveDown(time=600){
    if(canMoveTo('down')){
      canWalk = false;
      $( "#rato" )
        .removeClass('up')
        .addClass('down')
        .addClass('walking')
        .animate({
          top: '+='+squareHeight+'px'
        }, time, 'linear', function() {
          $('#rato')
            .removeClass('walking')
            .css(
              'z-index',
              parseInt($('#rato').css('z-index')) + 1
            );

          var y = parseInt(actualSquare.split('-')[0]);
          var x = parseInt(actualSquare.split('-')[1]);
          y++;
          actualSquare = y+'-'+x;

          executeSquareFunctions();
        });
    }
  }

  function lastIconCollected(){
    if(catPoints > ratoPoints){
      stageFailed();
    }

    if(catPoints == ratoPoints){
      showLastIcon();
    }
  }

  function ratoAndCatCollision(){
    if(actualSquare == catActualSquare && !hideCat){
      if(catPoints > ratoPoints){
        stageFailed();
      }
      if(catPoints < ratoPoints){
        stageWin();
      }
    }
  }

  function showLastIcon(){
    showingLastIcon = true;
    $('#minigame-random').css('display', 'block');

    minigameRandomIconToPosition(lastIconPosition, minigamesToPlay[0].type);

    if(actualSquare == lastIconPosition){
      $('#minigame-random').css('display', 'none');
      startMinigame(minigamesToPlay[0].type);
    }
    if(catActualSquare == lastIconPosition){
      $('#minigame-random').css('display', 'none');
      $('#cat').css('display', 'none');
      hideCat = true;
    }
  }
  
  function stageWin() {
    playSound('finalsuccess');
    $('#container-jogo').css('display', 'none');
    $('#container-end').css('display', 'block');
  }
  function stageFailed() {
    playSound('finalfailure');
    $('#container-jogo').css('display', 'none');
    $('#container-gameover').css('display', 'block');
  }
  function startStage() {
    endGame = false;
    showingLastIcon = false;
    hideCat = false;
    stagePointIndex = 0;
    minimumMovedTotal = 0;
    movedTotal = 0;

    $('#cat').removeClass('left').addClass('right').css('display', 'block');
    $('#cat').removeClass('right').addClass('left').css('display', 'block');

    setRatoScore(0);
    setCatScore(0);
    //stagePointsToDeliver = getRandomPoints(numberOfObjects).sort(sortPointsByClosest);
    //$('.game-guide').empty().removeClass('square-guide').removeClass('smaller-path').removeClass('bigger-path');
    
    lives = startingLives;
    $('#lives').text(lives);

    $('#container-tutorial').css('display', 'none');
    $('#button-avancar-jogo').css('display', 'none');

    $('#container-jogo').css('display', 'block');
    $('.minigame-icon').css('display', 'block');
    $('#minigame-random').css('display', 'none');
    canWalk = true;
    ratoToStartPosition();
    catToStartPosition();

    setMinigames();
  }
  

  /******* SCALE *********/
  function getScale() {
    var scaleCss = $('html').css('transform');
    var webkitCss = $('html').css('-webkit-transform');
    var fxScaleCss = $('html').css('-fx-transform');

    if (scaleCss != undefined) {
      var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/;
      var matches = scaleCss.match(matrixRegex);

      if(matches != undefined && matches.length > 1) {
        return matches[1];
      }
    }

    if (webkitCss != undefined) {
      var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/;
      var matches = webkitCss.match(matrixRegex);

      if(matches != undefined && matches.length > 1) {
        return matches[1];
      }
    }

    if (fxScaleCss != undefined) {
      var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/;
      var matches = fxScaleCss.match(matrixRegex);

      if(matches != undefined && matches.length > 1) {
        return matches[1];
      }
    }

    return 1;
  }


  /**********FUNCTIONS***********/
  function arrayRandomSort(a, b) {  
    return 0.5 - Math.random();
  }

  function hasTouch() {
    return 'ontouchstart' in document.documentElement;
  }

  function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min
  }

  function playSound(soundId) {
    if(lastPlayedSound != '') {
      $('#audio-' + lastPlayedSound)[0].currentTime = 0;
      $('#audio-' + lastPlayedSound)[0].pause();
      $('#audio-' + lastPlayedSound)[0].src = $('#audio-' + lastPlayedSound)[0].src;
    }

    if( $('#audio-' + soundId).length > 0 ) {
      $('#audio-' + soundId)[0].play();
      lastPlayedSound = soundId;
    }
    
  }

  function stopSound(){
    $("#audio-" + lastPlayedSound)[0].currentTime = 0;
    $("#audio-" + lastPlayedSound)[0].pause();
    $("#audio-" + lastPlayedSound)[0].src = $("#audio-" + lastPlayedSound)[0].src;
  }
//});