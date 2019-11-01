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
      showTutorial = true,
      startingSquare = '1-2',
      actualSquare = '1-2',
      lastPosition = '1-2',
      canWalk = true,
      catStartingSquare = '1-0',
      catActualSquare = '1-0',
      catTarget = '',
      catWidth = 88,
      //catHeight = 146,
      catHeight = 157,
      catMoveTime = 360,
      sleepingCat = 0,
      //catPoints = 0,
      //hideCat = false,
      minigameIconWidth = 80,
      //minigameIconWidth = 128,
      //the icon is smaller in height, but this number will put it in the right y
      minigameIconHeight = 80,
      //minigameIconHeight = 164,
      //showingLastIcon = false,
      //lastIconPosition = '4-7',
      squareWidth = 64,
      squareHeight = 64,
      paddingTopGrid = 32,
      paddingLeftGrid = 32,
      playerWidth = 80,
      //playerHeight = 146,
      playerHeight = 121,
      playerMoveTime = 360,
      playerIsMoving = false,
      //playerPoints = 0,
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
    $('#container-menu').css('display', 'block');
    playSound('button2');
  });

  /*********/
  //button-avancar-encomendas is on bag.js
  /*********/

  $('#button-jogar-menu').click(function() {
    $('#container-menu').css('display', 'none');
    $('#container-tutorial').css('display', 'block');
    playSound('button2');
  });

  $('#button-ler-menu').click(function() {
    $('#container-menu').css('display', 'none');
    $('#container-historia-1').css('display', 'block');
    playSound('button2');
  });

  $('#button-next-historia-1').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-2').css('display', 'block');
    playSound('button2');
  });
  $('#button-next-historia-2').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-3').css('display', 'block');
    playSound('button2');
  });
  $('#button-back-historia-2').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-1').css('display', 'block');
    playSound('button2');
  });
  $('#button-next-historia-3').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-4').css('display', 'block');
    playSound('button2');
  });
  $('#button-back-historia-3').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-2').css('display', 'block');
    playSound('button2');
  });
  $('#button-next-historia-4').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-5').css('display', 'block');
    playSound('button2');
  });
  $('#button-back-historia-4').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-3').css('display', 'block');
    playSound('button2');
  });
  $('#button-next-historia-5').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-6').css('display', 'block');
    playSound('button2');
  });
  $('#button-back-historia-5').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-4').css('display', 'block');
    playSound('button2');
  });
  $('#button-next-historia-6').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-7').css('display', 'block');
    playSound('button2');
  });
  $('#button-back-historia-6').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-5').css('display', 'block');
    playSound('button2');
  });
  $('#button-next-historia-7').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-8').css('display', 'block');
    playSound('button2');
  });
  $('#button-back-historia-7').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-6').css('display', 'block');
    playSound('button2');
  });
  $('#button-next-historia-8').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-9').css('display', 'block');
    playSound('button2');
  });
  $('#button-back-historia-8').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-7').css('display', 'block');
    playSound('button2');
  });
  $('#button-back-historia-9').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-historia-8').css('display', 'block');
    playSound('button2');
  });

  $('.minigame-text').click(function() {
    $(this).toggleClass('text-selected');
  });

  $('#button-confirmar-minigame-0').click(function() {
    checkMinigameAnswers(0);
  });
  $('#button-confirmar-minigame-1').click(function() {
    checkMinigameAnswers(1);
  });
  $('#button-confirmar-minigame-2').click(function() {
    checkMinigameAnswers(2);
  });
  $('#button-confirmar-minigame-3').click(function() {
    checkMinigameAnswers(3);
  });
  $('#button-confirmar-minigame-4').click(function() {
    checkMinigameAnswers(4);
  });
  $('#button-confirmar-minigame-5').click(function() {
    checkMinigameAnswers(5);
  });
  $('#button-confirmar-minigame-6').click(function() {
    checkMinigameAnswers(6);
  });
  $('#button-confirmar-minigame-7').click(function() {
    checkMinigameAnswers(7);
  });
  $('#button-confirmar-minigame-8').click(function() {
    checkMinigameAnswers(8);
  });
  

  $('#button-avancar-tutorial').click(function() {
    playSound('button2');
    startStage();
  });

  $('#button-avancar-tutorial-minigame').click(function() {
    playSound('button2');
    showTutorial = false;
    $('#container-tutorial-minigame').css('display', 'none');
    startMinigameByNumber(0);
  });

  createBoard();

  $('#button-avancar-jogo').click(function() {
    playSound('button2');
    $('#container-jogo').css('display', 'none');
    $('#container-tutorial').css('display', 'block');
  });

  $('#button-voltar-historia').click(function() {
    $('.historia-container').css('display', 'none');
    $('#container-menu').css('display', 'block');
    playSound('button2');
  });

  $('#button-voltar-end').click(function() {
    playSound('button2');
    $('#container-end').css('display', 'none');
    $('.container-splash-screen').css('display', 'block');
  });

  $('#button-ler-end').click(function() {
    $('#container-end').css('display', 'none');
    $('#container-historia-1').css('display', 'block');
    playSound('button2');
  });

  $('#button-voltar-gameover').click(function() {
    playSound('button2');
    $('#container-gameover').css('display', 'none');
    $('.container-splash-screen').css('display', 'block');
  });


  $('#button-game-left').click(function() {
    moveLeft(playerMoveTime);
  });

  $('#button-game-up').click(function() {
    moveUp(playerMoveTime);
  });

  $('#button-game-down').click(function() {
    moveDown(playerMoveTime);
  });

  $('#button-game-right').click(function() {
    moveRight(playerMoveTime);
  });


  /********GAME MECHANICS********/
  function createBoard() {
    $('#game-grid')
    //.append('<div id="target-deliver" class="target-deliver"></div>')
    .append('<div id="map-line-1" class="map-line"></div>')
    .append('<div id="map-line-2" class="map-line"></div>')
    .append('<div id="map-line-3" class="map-line"></div>')
    .append('<div id="map-line-4" class="map-line"></div>')
    .append('<div id="map-line-5" class="map-line"></div>')
    .append('<div id="map-line-6" class="map-line"></div>')
    .append('<div id="map-line-7" class="map-line"></div>')
    .append('<div id="map-line-8" class="map-line"></div>')
    .append('<div id="map-line-9" class="map-line"></div>')
    .append('<div id="map-line-10" class="map-line"></div>')
    .append('<div id="map-line-11" class="map-line"></div>')
    .append('<div id="minigame-0" class="minigame-icon">1</div>')
    .append('<div id="minigame-1" class="minigame-icon">2</div>')
    .append('<div id="minigame-2" class="minigame-icon">3</div>')
    .append('<div id="minigame-3" class="minigame-icon"></div>')
    .append('<div id="minigame-4" class="minigame-icon">4</div>')
    .append('<div id="minigame-5" class="minigame-icon">5</div>')
    .append('<div id="minigame-6" class="minigame-icon">6</div>')
    .append('<div id="minigame-7" class="minigame-icon"></div>')
    .append('<div id="minigame-8" class="minigame-icon">7</div>')
    .append('<div id="minigame-9" class="minigame-icon">8</div>')
    .append('<div id="minigame-10" class="minigame-icon">9</div>')
    .append('<div id="minigame-11" class="minigame-icon"></div>')
    .append('<div id="minigame-random" class="minigame-icon minigame-random"></div>')
    .append('<div id="boy" class="boy"></div>')
    .append('<div id="player" class="player down right"></div>')
    .append('<div id="cat" class="cat down right"></div>');

    //$('#player').append('<div id="score-player" class="score-number score-player"></div>');
    //$('#cat').append('<div id="score-cat" class="score-number score-cat"></div>');

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
    
    /*
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
    */
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

  /*
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
*/
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
      //.css('z-index', 200+y)
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
      .css('left', (squareWidth*x) - ((catWidth-squareWidth)/2) + paddingLeftGrid)
      .css('top', (squareWidth*y) - (catHeight-squareHeight) + paddingTopGrid);

    catActualSquare = y+'-'+x;
  }
/*
  function setCatScore(score = 0){
    catPoints = score;
    $('#score-cat').text(catPoints);
  }
*/
  function playerToStartPosition(){
    playerToPosition(startingSquare);
  }

  function playerToPosition(point = '3-9'){
    var y = parseInt(point.split('-')[0]);
    var x = parseInt(point.split('-')[1]);

    $('#player')
      .css('z-index', 200+y)
      .css('left', (squareWidth*x) - ((playerWidth-squareWidth)/2) + paddingLeftGrid)
      .css('top', (squareWidth*y) - (playerHeight-squareHeight) + paddingTopGrid);

    lastPosition = actualSquare;
    actualSquare = y+'-'+x;

    playerAndCatCollision();
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
    /*
    var hasMinigame = false;
    
    for (var i=0; i<minigamesToPlay.length; i++){
      if(minigamesToPlay[i].point == actualSquare
        && !minigamesToPlay[i].played 
        && minigamesToPlay[i].showing){
          
          hasMinigame = true;
          
          //minigamesToPlay[i].played = true;

          //$('#minigame-'+i).css('display', 'none');

          playSound('minigametouch');

          startMinigame(minigamesToPlay[i].type);
      }
    }
    */
/*
    if(showingLastIcon && actualSquare == lastIconPosition){
      hasMinigame = true;

      $('#minigame-random').css('display', 'none');

      playSound('minigametouch');

      startMinigame(minigamesToPlay[0].type);
    }
*/
    //if(!hasMinigame){
      playerAndCatCollision();
      catMoves();
    //}
  }

  /*
  function setPlayerScore(score = 0){
    playerPoints = score;
    $('#score-player').text(playerPoints);
  }
*/
  function setMinigames(){
    minigamesToPlay = new Array();

    for (var i=0; i<minigamePoints.length; i++){
      var randomPoint = getRandomNumber(0, minigamePoints[i].length);
        minigamesToPlay.push({
            point: minigamePoints[i][randomPoint],
            type: minigameTypes[i],
            played: false,
            showing: false
        });
    }

    showMiniGame(0);
  }

  function showMiniGame(miniGameNumber = 0){
    if(miniGameNumber < minigamesToPlay.length){
      minigameIconToPosition(miniGameNumber, minigamesToPlay[miniGameNumber].point, minigamesToPlay[miniGameNumber].type);

      minigamesToPlay[miniGameNumber].showing = true;
      $('#minigame-'+miniGameNumber).css('display', 'block');
    }

    if(miniGameNumber == minigamesToPlay.length){
      stageWin();
    }
  }

  function showNextMinigame(){
    var miniGameNumber = 999;

    for (var i=0; i<minigamesToPlay.length; i++){
      if(!minigamesToPlay[i].played 
        && minigamesToPlay[i].showing){
          miniGameNumber = i;
      }
    }

    if(miniGameNumber < minigamesToPlay.length){
      minigamesToPlay[miniGameNumber].played = true;
      minigamesToPlay[miniGameNumber].showing = false;
      $('#minigame-'+miniGameNumber).css('display', 'none');
  
      showMiniGame(miniGameNumber+1);
    }
  }

  function startMinigame(type = 'moon'){
    switch(type){
      case '0':
        startMinigameByNumber(type);
      break;
      case '1':
        startMinigameByNumber(type);
      break;
      case '2':
        startMinigameByNumber(type);
      break;
      case '3':
        startMinigameByNumber(type);
      break;
      case '4':
        startMinigameByNumber(type);
      break;
      case '5':
        startMinigameByNumber(type);
      break;
      case '6':
        startMinigameByNumber(type);
      break;
      case '7':
        startMinigameByNumber(type);
      break;
      case '8':
        startMinigameByNumber(type);
      break;
      case 'moon':
        gotMoon();
      break;
    }
  }

  function startMinigameByNumber(minigameNumber = 0){
    if(showTutorial){
      $('.minigame-text').removeClass('text-selected');
      $('#container-tutorial-minigame').css('display', 'block');
    }else{
      $('.minigame-text').removeClass('text-selected');
      $('#minigame-container-'+minigameNumber).css('display', 'block');
    }
  }

  function checkMinigameAnswers(minigameNumber = 0){
    var hasErrors = false;
    $('#minigame-container-'+minigameNumber+' .minigame-text').each(function(){
      if($(this).hasClass('text-adjective')){
        if(!$(this).hasClass('text-selected')){
          hasErrors = true;
        }
      }
      if(!$(this).hasClass('text-adjective')){
        if($(this).hasClass('text-selected')){
          hasErrors = true;
        }
      }
    });

    endMinigame(!hasErrors);
  }

  function gotMoon(){
    sleepingCat = 2;
    $( "#cat" ).addClass('sleeping');

    catMoves();

    showNextMinigame();
  }

  function endMinigame(won = true){
    /*
    if(showingLastIcon){
      if(won){
        stageWin();
      }else{
        stageFailed();
      }
    }
    */
    $('.minigame-container').css('display', 'none');
    if(won){
      playSound('minigamesuccess');
      showNextMinigame();
      //setPlayerScore(playerPoints + 1);
    }else{
      playSound('minigamefailure');
      playerToPosition(lastPosition);
    }

    if(!hasIconOnBoard() /*&& !showingLastIcon*/){
      lastIconCollected();
    }
    
    canWalk = true;
    //catMoves();
  }

  function catMoves(){
    
    if(sleepingCat > 0){
      canWalk = true;
      sleepingCat --;
    }else{
      $( "#cat" ).removeClass('sleeping');
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
    if(!hasIconOnBoard() /*&& !showingLastIcon*/){
      lastIconCollected();
    }
    
    var hasMinigame = false;
    for (var i=0; i<minigamesToPlay.length; i++){
      if(minigamesToPlay[i].point == actualSquare
        && !minigamesToPlay[i].played 
        && minigamesToPlay[i].showing){
          
          hasMinigame = true;
          
          //minigamesToPlay[i].played = true;

          //$('#minigame-'+i).css('display', 'none');

          playSound('minigametouch');

          startMinigame(minigamesToPlay[i].type);
      }
    }

    if(!hasMinigame){
      canWalk = true;
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
    /*
    for (var i=0; i<minigamesToPlay.length; i++){
      if(minigamesToPlay[i].point == catActualSquare
        && !minigamesToPlay[i].played){
          minigamesToPlay[i].played = true;

          $('#minigame-'+i).css('display', 'none');

          setCatScore(catPoints + 1);

          playSound('minigametouch');
      }
    }
    */
    /*
    if(showingLastIcon && catActualSquare == lastIconPosition){
      $('#cat').css('display', 'none');
      hideCat = true;

      playSound('minigametouch');
    }
    */
  
    playerAndCatCollision();
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

    if($('#player').hasClass('walking') || !canWalk){
      return false;
    }

    switch(direction){
      case 'left':
        var yToGo = parseInt(actualSquare.split('-')[0]);
        var xToGo = parseInt(actualSquare.split('-')[1]);
        xToGo--;

        if(
          yToGo >= 0 && 
          yToGo < pathfindMap.length &&
          xToGo >= 0 && 
          xToGo < pathfindMap[0].length &&
          pathfindMap[yToGo][xToGo] == 1
        ) {
            return true;
        }
        
        return false;
      break;
      case 'up':
          var yToGo = parseInt(actualSquare.split('-')[0]);
          var xToGo = parseInt(actualSquare.split('-')[1]);
          yToGo--;
  
          if(
            yToGo >= 0 && 
            yToGo < pathfindMap.length &&
            xToGo >= 0 && 
            xToGo < pathfindMap[0].length &&
            pathfindMap[yToGo][xToGo] == 1
          ) {
              return true;
          }

          return false;
      break;
      case 'down':
        var yToGo = parseInt(actualSquare.split('-')[0]);
        var xToGo = parseInt(actualSquare.split('-')[1]);
        yToGo++;

        if(
          yToGo >= 0 && 
          yToGo < pathfindMap.length &&
          xToGo >= 0 && 
          xToGo < pathfindMap[0].length &&
          pathfindMap[yToGo][xToGo] == 1
        ) {
            return true;
        }

        return false;
      break;
      case 'right':
        var yToGo = parseInt(actualSquare.split('-')[0]);
        var xToGo = parseInt(actualSquare.split('-')[1]);
        xToGo++;

        if(
          yToGo >= 0 && 
          yToGo < pathfindMap.length &&
          xToGo >= 0 && 
          xToGo < pathfindMap[0].length &&
          pathfindMap[yToGo][xToGo] == 1
        ) {
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
      $( "#player" )
        .removeClass('right')
        .addClass('left')
        .addClass('walking')
        .animate({
          left: '-='+squareWidth+'px'
        }, time, 'linear', function() {
          $('#player').removeClass('walking');

          var y = parseInt(actualSquare.split('-')[0]);
          var x = parseInt(actualSquare.split('-')[1]);
          x--;
          lastPosition = actualSquare;
          actualSquare = y+'-'+x;

          executeSquareFunctions();
        });
    }
  }

  function moveRight(time=600){
    if(canMoveTo('right')){
      canWalk = false;
      $( "#player" )
        .removeClass('left')
        .addClass('right')
        .addClass('walking')
        .animate({
          left: '+='+squareWidth+'px'
        }, time, 'linear', function() {
          $('#player').removeClass('walking');

          var y = parseInt(actualSquare.split('-')[0]);
          var x = parseInt(actualSquare.split('-')[1]);
          x++;
          lastPosition = actualSquare;
          actualSquare = y+'-'+x;

          executeSquareFunctions();
        });
    }
  }

  function moveUp(time=600){
    if(canMoveTo('up')){
      canWalk = false;
      $( "#player" )
        .removeClass('down')
        .addClass('up')
        .addClass('walking')
        .animate({
          top: '-='+squareHeight+'px'
        }, time, 'linear', function() {
          $('#player')
            .removeClass('walking')
            .css(
              'z-index',
              parseInt($('#player').css('z-index')) - 1
            );

          var y = parseInt(actualSquare.split('-')[0]);
          var x = parseInt(actualSquare.split('-')[1]);
          y--;
          lastPosition = actualSquare;
          actualSquare = y+'-'+x;

          executeSquareFunctions();
        });
    }
  }

  function moveDown(time=600){
    if(canMoveTo('down')){
      canWalk = false;
      $( "#player" )
        .removeClass('up')
        .addClass('down')
        .addClass('walking')
        .animate({
          top: '+='+squareHeight+'px'
        }, time, 'linear', function() {
          $('#player')
            .removeClass('walking')
            .css(
              'z-index',
              parseInt($('#player').css('z-index')) + 1
            );

          var y = parseInt(actualSquare.split('-')[0]);
          var x = parseInt(actualSquare.split('-')[1]);
          y++;
          lastPosition = actualSquare;
          actualSquare = y+'-'+x;

          executeSquareFunctions();
        });
    }
  }

  function lastIconCollected(){
    /*
    if(catPoints > playerPoints){
      stageFailed();
    }

    if(catPoints == playerPoints){
      showLastIcon();
    }
    */
  }

  function playerAndCatCollision(){
    
    if(actualSquare == catActualSquare /*&& !hideCat*/){
      /*
      if(catPoints > playerPoints){
      */
        stageFailed();
      /*
      }
      if(catPoints < playerPoints){
        stageWin();
      }
      */
    }
    
  }

  /*
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
   */
  
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
    showTutorial = true;
    //showingLastIcon = false;
    //hideCat = false;
    stagePointIndex = 0;
    minimumMovedTotal = 0;
    movedTotal = 0;

    //$('#cat').removeClass('left').addClass('right').css('display', 'block');
    //$('#cat').removeClass('left').addClass('right').css('display', 'block');

    //setPlayerScore(0);
    //setCatScore(0);
    //stagePointsToDeliver = getRandomPoints(numberOfObjects).sort(sortPointsByClosest);
    //$('.game-guide').empty().removeClass('square-guide').removeClass('smaller-path').removeClass('bigger-path');
    
    lives = startingLives;
    $('#lives').text(lives);

    $('#container-tutorial').css('display', 'none');
    $('#button-avancar-jogo').css('display', 'none');

    $('#container-jogo').css('display', 'block');
    $('.minigame-icon').css('display', 'none');
    $('#minigame-random').css('display', 'none');

    $('.minigame-text').removeClass('text-selected');

    canWalk = true;
    playerToStartPosition();
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

  //min is inclusive, max is exclusive
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