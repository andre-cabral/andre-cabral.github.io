//$(function() {
  
  /********VARIABLES*/
  var boardX = pathfindMap[0],
      boardY = pathfindMap,
      astarGraph = new Graph(pathfindMap);
      startedGuide = false,
      squareHovered = '',
      squaresHoveredList = new Array(),
      lastSquareHoveredClickFix = '',
      mouseDown = false,
      mouseOnBoard = false,
      lastPlayedSound = '',
      hasNewMessage = false,
      lives = 5,
      startingLives = 5,
      stagePointIndex = 0,
      stagePointsToDeliver = [],
      startingSquare = '3-9',
      actualSquare = '3-9',
      squareWidth = 50,
      squareHeight = 50,
      paddingTopGrid = 10,
      paddingLeftGrid = 10,
      carteiraHeight = 100,
      carteiraMoveTime = 480,
      carteiraIsMoving = false,
      targetWidth = 40,
      //the target is smaller, but this number will put it in the right y
      targetHeight = 100,
      endGame = false,
      movedTotal = 0,
      minimumMovedTotal = 0;

  /************* MENU **************/
  $('#menu-button-comecar').click(function(){
    $('.container-splash-screen').css('display', 'none');
    $('#container-tutorial-encomendas').css('display', 'block');
    playSound('button');
  });
  
  $('#button-avancar-tutorial-encomendas').click(function() {
    playSound('button-acute');
    $('#container-tutorial-encomendas').css('display', 'none');
    $('#container-encomendas').css('display', 'block');
  });

  /*********/
  //button-avancar-encomendas is on bag.js
  /*********/
  

  $('#button-avancar-tutorial-caminhos').click(function() {
    playSound('button-acute');
    startStage();
  });

  createBoard();

  $('#button-avancar-jogo').click(function() {
    $('#container-jogo').css('display', 'none');
    $('#container-encomendas').css('display', 'block');
  });

  $('#button-voltar-end').click(function() {
    stagePointIndex = 0;
    $('#container-end').css('display', 'none');
    $('.container-splash-screen').css('display', 'block');
    resetBag();
  });


  /********GAME MECHANICS********/
  function createBoard() {
    $('#game-grid')
    .append('<div id="target-deliver" class="target-deliver"></div>')
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
    .append('<div id="map-line-12" class="map-line"></div>')
    .append('<div id="map-line-13" class="map-line"></div>')
    .append('<div id="map-line-14" class="map-line"></div>')
    .append('<div id="map-line-15" class="map-line"></div>')
    .append('<div id="carteira" class="carteira down left"></div>');

    for(var j=0; j < boardY.length; j++) {
      for(var i=0; i < boardX.length; i++) {
        var id = j+'-'+i;
        var walkable = pathfindMap[j][i] == 1;

        if(walkable){
          $('#game-board').append('<div id="' + id + '" class="game-square game-square-walkable"></div>');
          $('#game-grid').append('<div id="guide-' + id + '" class="game-guide game-guide-walkable"></div>');
        } else {
          $('#game-board').append('<div id="' + id + '" class="game-square not-walkable"></div>');
          $('#game-grid').append('<div id="guide-' + id + '" class="game-guide game-guide-not-walkable"></div>');
        }

        if(!hasTouch() && walkable) {
          $('#'+id).hover(
            function(){
              if(mouseDown){
                squareCreateGuide($(this));
              }else {
                squareHovered = $(this).attr('id');
              }
            },
            function(){
              //nextSquareGuide($(this).attr('id'));
              //squareHovered = '';
            }
          );
        }
      }
    }

    if(!hasTouch()) {

      $('#game-board').mousedown(function(event) {
        if (squareHovered == '') {
          squareHovered = lastSquareHoveredClickFix;
        }

        firstSquare($('#'+squareHovered), true);
        mouseDown = true;
      });
      $('#game-board').mouseup(function(event) {
        if (mouseOnBoard && mouseDown){
          lastSquare(squareHovered);
        }
        lastSquareHoveredClickFix = squareHovered;
        squareHovered = '';
        mouseDown = false;
      });
      $('#game-board').hover(
        function(){
          if (mouseDown) {
            //$('#container-jogo-bg').addClass('show-guide');
          }
          mouseOnBoard = true;
        },
        function(){
          nonWalkableSquare('outsidemap');
          mouseOnBoard = false;
        }
      );
      $(document).mousedown(function(){
        mouseDown = true;
      });
      $(document).mouseup(function(){
        //$('.game-square').removeClass('square-guide');
        mouseDown = false;
      });

    } else {

      $('#game-board').on('touchstart', function(event) {
        var target = document.elementFromPoint(
          event.originalEvent.touches[0].pageX,
          event.originalEvent.touches[0].pageY
        );
        firstSquare($(target), true);
      });
      $('#game-board').on('touchmove',function(event){
        var target = document.elementFromPoint(
            event.originalEvent.touches[0].pageX,
            event.originalEvent.touches[0].pageY
        );
        squareCreateGuide($(target));
      });
      $('#game-board').on('touchend', function(event) {
        //if(squareHovered != ''){
          lastSquare(squareHovered);
        //}
        squareHovered = '';
      });
    }
  }
  function firstSquare(target, guideOnHovered=false) {
    if($(target).attr('id') == actualSquare && !carteiraIsMoving && !endGame){
      $('.game-guide').empty().removeClass('square-guide').removeClass('smaller-path').removeClass('bigger-path');
      squaresHoveredList = [];
      startedGuide = true;
      if(hasTouch){
        squareHovered = $(target).attr('id');
      }
      squareCreateGuide(target, guideOnHovered);
    }
  }
  function squareCreateGuide(target, guideOnHovered=false) {
    if(startedGuide){

      if($(target).hasClass('game-square-walkable')) {
        var targetId = $(target).attr('id');
        if(targetId != squareHovered || guideOnHovered) {
          if( isAdjacentSquare(squaresHoveredList[squaresHoveredList.length-1], targetId) || guideOnHovered ){
            
            if(squaresHoveredList.length >= 2 && targetId == squaresHoveredList[squaresHoveredList.length-2]){
              $('#guide-'+squaresHoveredList[squaresHoveredList.length-1]).empty().removeClass('square-guide').removeClass('smaller-path').removeClass('bigger-path');
              squareHovered = targetId;
              squaresHoveredList.pop();
            } else {
              $('#guide-'+targetId).addClass('square-guide');
              squareHovered = targetId;
              squaresHoveredList.push(squareHovered);
            }

            for (var i=0; i<squaresHoveredList.length; i++){
              if(i>0){
                $('#guide-'+squaresHoveredList[i]).html(i);
              }
            }
          }
        }
      } else {
        nonWalkableSquare($(target).attr('id'));
      }

    }
  }

  function lastSquare(id) {
    if(startedGuide && getTargetPoints(stagePointsToDeliver[stagePointIndex]).indexOf(id) > -1){
      /*
      console.log('coordenadas: '+squaresHoveredList+'\n'+
      'quantidade de passos: '+squaresHoveredList.length+'\n\n'+
      'coordenadas do menor caminho: ' +closerPointPath(squaresHoveredList[0], stagePointsToDeliver[stagePointIndex])+'\n'+
      'quantidade de passos do menor caminho:' + closerPointPathSize(squaresHoveredList[0], stagePointsToDeliver[stagePointIndex])
      );
      */

      moveCarteira();
      startedGuide = false;
    }
  }
  
  function nonWalkableSquare (id){
    squareHovered = '';
  }

  function showSmallerPath(){
    movedTotal += squaresHoveredList.length;
    minimumMovedTotal += smallerPathSize(squaresHoveredList[0], squaresHoveredList[squaresHoveredList.length-1]);

    if(smallerPathSize(squaresHoveredList[0], squaresHoveredList[squaresHoveredList.length-1]) < squaresHoveredList.length){
      //did a bigger path
      var smallerPathList = smallerPath(squaresHoveredList[0], squaresHoveredList[squaresHoveredList.length-1]);
      for (var i=0; i<squaresHoveredList.length;i++){
        $('#guide-'+squaresHoveredList[i]).addClass('bigger-path');
      }

      for (var i=0; i<smallerPathList.length;i++){
        $('#guide-'+smallerPathList[i]).addClass('smaller-path');
          $('#guide-'+smallerPathList[i]).html(i);
      }
    } else {
      //did the smaller path
      for (var i=0; i<squaresHoveredList.length;i++){
        $('#guide-'+squaresHoveredList[i]).addClass('smaller-path');
      }
    }
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

  /*
  function closerPointPathSize(startId, endId){
    return closerPointPath(startId, endId).length;
  }

  function closerPointPath(startId, pointId) {
    var pointsArray = getTargetPoints(pointId);
    var closerPoint = '';
    var closerPointDistance = 9999;

    for (var i=0; i<pointsArray.length; i++){
      if(smallerPathSize(startId, pointsArray[i]) < closerPointDistance){
        closerPoint = pointsArray[i];
        closerPointDistance = smallerPathSize(startId, pointsArray[i]);
      }
    }

    return smallerPath(startId, closerPoint);
  }
*/
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

  function showTarget () {
    if(stagePointsToDeliver.length > stagePointIndex){
      targetToPosition(stagePointsToDeliver[stagePointIndex]);
    } else {
      //end game
      endGame = true;
      $('#end-stars')
        .removeClass('stars-1')
        .removeClass('stars-2')
        .removeClass('stars-3')
        .addClass(showResultStars());

      setTimeout( function() {
        $('#container-jogo').css('display', 'none');
        $('#container-end').css('display', 'block');
      }, 3000);
    }
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

  function targetToPosition(point = '3-9'){
    var y = parseInt(point.split('-')[0]);
    var x = parseInt(point.split('-')[1]);

    $('#target-deliver')
      .css('left', (squareWidth*x) + paddingLeftGrid + ((squareWidth - targetWidth)/2) )
      .css('top', (squareWidth*y) - (targetHeight-squareHeight) + paddingTopGrid);
  }

  function carteiraToStartPosition(){
    $('#carteira').css('z-index', 204);
    carteiraToPosition(startingSquare);
  }

  function carteiraToPosition(point = '3-9'){
    var y = parseInt(point.split('-')[0]);
    var x = parseInt(point.split('-')[1]);

    $('#carteira')
      .css('left', (squareWidth*x) + paddingLeftGrid)
      .css('top', (squareWidth*y) - (carteiraHeight-squareHeight) + paddingTopGrid);

    actualSquare = y+'-'+x;
  }

  function moveCarteira(){
    var directionsList = new Array();
    for(var i=1; i<squaresHoveredList.length; i++){
      directionsList.push(directionToMove(squaresHoveredList[i-1], squaresHoveredList[i]));
    }

    if(directionsList.length > 0) {
      carteiraIsMoving = true;

      for(var i=0; i<directionsList.length; i++){
        switch(directionsList[i]){
          case 'up':
            setTimeout(function(){
              moveUp(carteiraMoveTime);
            }, carteiraMoveTime * i);
          break;
          case 'right':
          setTimeout(function(){
              moveRight(carteiraMoveTime);
            }, carteiraMoveTime * i);
          break;
          case 'down':
            setTimeout(function(){
              moveDown(carteiraMoveTime);
            }, carteiraMoveTime * i);
          break;
          case 'left':
            setTimeout(function(){
              moveLeft(carteiraMoveTime);
            }, carteiraMoveTime * i);
          break;
        }
      }

      setTimeout(function(){
        showSmallerPath();

        stagePointIndex++;
        carteiraIsMoving = false;
        $('#carteira').removeClass('walking');
        actualSquare = squaresHoveredList[squaresHoveredList.length-1];
        
        showTarget();
      }, carteiraMoveTime * directionsList.length);
    }
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
  
  function moveLeft(time=600){
    $( "#carteira" )
      .removeClass('right')
      .addClass('left')
      .addClass('walking')
      .animate({
        left: "-=50px"
      }, time, 'linear');
  }

  function moveRight(time=600){
    $( "#carteira" )
      .removeClass('left')
      .addClass('right')
      .addClass('walking')
      .animate({
        left: "+=50px"
      }, time, 'linear');
  }

  function moveUp(time=600){
    $( "#carteira" )
      .removeClass('down')
      .addClass('up')
      .addClass('walking')
      .animate({
        top: "-=50px"
      }, time, 'linear', function() {
        $('#carteira')
          .css(
            'z-index',
            parseInt($('#carteira').css('z-index')) - 1
          );
      });
  }

  function moveDown(time=600){
    $( "#carteira" )
      .removeClass('up')
      .addClass('down')
      .addClass('walking')
      .animate({
        top: "+=50px"
      }, time, 'linear', function() {
        $('#carteira')
        .css(
          'z-index',
          parseInt($('#carteira').css('z-index')) + 1
        );
      });
  }
  
  function stageComplete() {
    
  }
  function stageFailed() {
    
  }
  function startStage() {
    endGame = false;
    stagePointIndex = 0;
    minimumMovedTotal = 0;
    movedTotal = 0;
    stagePointsToDeliver = getRandomPoints(numberOfObjects).sort(sortPointsByClosest);
    $('.game-guide').empty().removeClass('square-guide').removeClass('smaller-path').removeClass('bigger-path');
    
    lives = startingLives;
    $('#lives').text(lives);

    $('#container-encomendas').css('display', 'none');
    $('#container-tutorial-encomendas').css('display', 'none');
    $('#container-tutorial-caminhos').css('display', 'none');
    $('#button-avancar-jogo').css('display', 'none');

    $('#container-jogo').css('display', 'block');

    carteiraToStartPosition();
    showTarget();
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
  function playSound(soundId) {
    /*
    if(lastPlayedSound != '') {
      $('#audio-' + lastPlayedSound)[0].currentTime = 0;
      $('#audio-' + lastPlayedSound)[0].pause();
      $('#audio-' + lastPlayedSound)[0].src = $('#audio-' + lastPlayedSound)[0].src;
    }

    if( $('#audio-' + soundId).length > 0 ) {
      $('#audio-' + soundId)[0].play();
      lastPlayedSound = soundId;
    }
    */
  }

  function arrayRandomSort(a, b) {  
    return 0.5 - Math.random();
  }

  function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min
  }

  function hasTouch() {
    return 'ontouchstart' in document.documentElement;
  }

//});