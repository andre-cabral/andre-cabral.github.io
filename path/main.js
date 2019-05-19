//$(function() {
  
  /********VARIABLES*/
  var boardX = pathfindMap[0],
      boardY = pathfindMap,
      astarGraph = new Graph(pathfindMap);
      squareHovered = '',
      squaresHoveredList = new Array(),
      lastSquareHoveredClickFix = '',
      stage = 1,
      stagePart = 1,
      mouseDown = false,
      mouseOnBoard = false,
      lastPlayedSound = '',
      hasNewMessage = false,
      correctSquares = [],
      correctIconElements = [],
      lives = 5,
      startingLives = 5
      ;

  /************* MENU **************/
  $('#menu-button-comecar').click(function(){
    $('.container-splash-screen').css('display', 'none');
    $('#container-carta-tesouro').css('display', 'block');
    playSound('button');
  });

  $('#button-avancar-mapa-tesouro').click(function() {
    /*if (stage == 1){
      $('#container-mapa-tesouro').css('display', 'none');
      $('#container-carta-tesouro').css('display', 'block');
      playSound('button');
    } else {*/
      playSound('button-acute');
      startStage();
    //}
  });
  $('#button-avancar-carta-tesouro').click(function() {
    playSound('button-acute');
    $('#container-carta-tesouro').css('display', 'none');
    $('#container-mapa-tesouro').css('display', 'block');
    //startStage();
  });

  $('#button-avancar-mapa-resgate').click(function() {
    /*if (stage - 1 == stagesTesouro.length){
      $('#container-mapa-resgate').css('display', 'none');
      $('#container-carta-resgate').css('display', 'block');
      playSound('button');
    } else {*/
      playSound('button-acute');
      startStage();
    //}
  });
  $('#button-avancar-carta-resgate').click(function() {
    playSound('button-acute');
    $('#container-carta-resgate').css('display', 'none');
    $('#container-mapa-resgate').css('display', 'block');
    //startStage();
  });

  createBoard();
  $('#menu-button-carta').click(function(){
    openCarta();
  })
  $('#menu-button-carta-opened').click(function(){
    $('#jogo-carta').css('display', 'none');
  })
  $('#button-avancar-jogo').click(function() {
    $('#container-jogo').css('display', 'none');
    if (stage-1 < stagesTesouro.length) {
      $('#container-mapa-tesouro').css('display', 'block');
    } else {
      if(stage - 1 - stagesTesouro.length < stagesResgate.length) {
        if (stage == 6) {
          $('#container-carta-resgate').css('display', 'block');
        } else {
          $('#container-mapa-resgate').css('display', 'block');
        }
      } else {
        //end game
        $('#container-end').css('display', 'block');
      }
    }
  });

  $('#button-voltar-end').click(function() {
    stage = 1;
    stagePart = 1;
    $('#container-end').css('display', 'none');
    $('.container-splash-screen').css('display', 'block');
    $('.stage-point')
          .removeClass('stage-point-actual')
          .removeClass('stage-point-passed');
    $('#stage-point-1').addClass('stage-point-actual');
  });

  function openCarta() {
    //$('#menu-button-carta').removeClass('menu-button-carta-new-message');
    hasNewMessage = false;
    $('#jogo-carta').css('display', 'block');
  }

  /********GAME MECHANICS********/
  function createBoard() {
    for(var j=0; j < boardY.length; j++) {
      for(var i=0; i < boardX.length; i++) {
        var id = j+'-'+i;
        var walkable = pathfindMap[j][i] == 1;

        if(walkable){
          $('#game-board').append('<div id="' + id + '" class="game-square game-square-walkable">'+id+'</div>');
        } else {
          $('#game-board').append('<div id="' + id + '" class="game-square not-walkable"></div>');
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
        $('.game-square').removeClass('square-guide');
        squaresHoveredList = [];
        $('#container-jogo-bg').addClass('show-guide');

        if (squareHovered == '') {
          squareHovered = lastSquareHoveredClickFix;
        }

        squareCreateGuide($('#'+squareHovered), true);
        mouseDown = true;
      });
      $('#game-board').mouseup(function(event) {
        if (mouseOnBoard && mouseDown){
          lastSquare(squareHovered);
        }
        $('#container-jogo-bg').removeClass('show-guide');
        lastSquareHoveredClickFix = squareHovered;
        squareHovered = '';
        mouseDown = false;
      });
      $('#game-board').hover(
        function(){
          if (mouseDown) {
            $('#container-jogo-bg').addClass('show-guide');
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
        $('#container-jogo-bg').removeClass('show-guide');
        $('.game-square').removeClass('square-guide');
        mouseDown = false;
      });

    } else {

      $('#game-board').on('touchstart', function(e) {
        $('.game-square').removeClass('square-guide');
        squaresHoveredList = [];
        $('#container-jogo-bg').addClass('show-guide');
        
        var target = document.elementFromPoint(
          event.touches[0].pageX,
          event.touches[0].pageY
        );
        squareCreateGuide($(target));
      });
      $('#game-board').on('touchmove',function(event){
        var target = document.elementFromPoint(
            event.originalEvent.touches[0].pageX,
            event.originalEvent.touches[0].pageY
        );
        squareCreateGuide($(target));
      });
      $('#game-board').on('touchend', function(e) {
        $('#container-jogo-bg').removeClass('show-guide');
        if(squareHovered != ''){
          lastSquare(squareHovered);
        }
        squareHovered = '';
      });
    }
  }
  function squareCreateGuide(target, guideOnHovered=false) {
    if($(target).hasClass('game-square-walkable')) {
      var targetId = $(target).attr('id');

      if(targetId != squareHovered || guideOnHovered) {
        if( squareHovered == '' || isAdjacentSquare(squareHovered, targetId) || guideOnHovered ){
          $('#'+targetId).addClass('square-guide');
          squareHovered = targetId;
          squaresHoveredList.push(squareHovered);
        }
      }
    } else {
      nonWalkableSquare($(target).attr('id'));
    }
  }

  function isAdjacentSquare(square1, square2) {
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

    return result;
  }

  function nonWalkableSquare (id){
    squareHovered = '';
  }

  function lastSquare(id) {
    alert('coordenadas: '+squaresHoveredList+'\n'+
    'quantidade de passos: '+squaresHoveredList.length+'\n\n'+
    'coordenadas do menor caminho: ' +smallerPath(squaresHoveredList[0], squaresHoveredList[squaresHoveredList.length-1])+'\n'+
    'quantidade de passos do menor caminho:' + smallerPathSize(squaresHoveredList[0], squaresHoveredList[squaresHoveredList.length-1])
    );
  }
  
  
  function stageComplete() {
    
  }
  function stageFailed() {
    
  }
  function startStage() {
    stagePart = 1;
    correctSquares = [];
    correctIconElements = [];
    
    lives = startingLives;
    $('#lives').text(lives);

    //$('.game-square').empty();

    //$('#container-jogo')
    $('#game-grid')
      .removeClass('map1')
      .removeClass('map2')
      .removeClass('map3')
      .removeClass('map4')
      .removeClass('map5');
    
    $('#ship').remove();

    $('#container-mapa-tesouro').css('display', 'none');
    $('#container-carta-tesouro').css('display', 'none');
    
    $('#container-mapa-resgate').css('display', 'none');
    $('#container-carta-resgate').css('display', 'none');

    $('#button-avancar-jogo').css('display', 'none');
    $('#container-jogo').css('display', 'block');
    $('#menu-button-carta').css('display', 'block');

    openCarta();
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

  function hasTouch() {
    return 'ontouchstart' in document.documentElement;
  }

//});