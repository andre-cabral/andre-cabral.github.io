//$(function() {
  
  /********VARIABLES*/
  var boardX = ['O7', 'O6', 'O5', 'O4', 'O3', 'O2', 'O1', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'],
      boardY = ['N5', 'N4', 'N3', 'N2', 'N1', 'S1', 'S2', 'S3', 'S4', 'S5'],
      squareHovered = '',
      stage = 1,
      stagePart = 1,
      mouseDown = false,
      mouseOnBoard = false,
      lastPlayedSound = ''
      ;
  

  /************* MENU **************/
  $('#menu-button-comecar').click(function(){
    $('.container-splash-screen').css('display', 'none');
    $('#container-mapa-tesouro').css('display', 'block');
    playSound('comecar');
  });

  $('#button-avancar-mapa-tesouro').click(function() {
    if (stage == 1){
      $('#container-mapa-tesouro').css('display', 'none');
      $('#container-carta-tesouro').css('display', 'block');
      playSound('avancar');
    } else {
      startStage();
    }
  });
  $('#button-avancar-carta-tesouro').click(function() {
    startStage();
  });

  $('#button-avancar-mapa-resgate').click(function() {
    if (stage == stagesTesouro.length){
      $('#container-mapa-resgate').css('display', 'none');
      $('#container-carta-resgate').css('display', 'block');
      playSound('avancar');
    } else {
      startStage();
    }
  });
  $('#button-avancar-carta-resgate').click(function() {
    startStage();
  });

  createBoard();

  /********GAME MECHANICS********/
  function createBoard() {
    for(var j=0; j < boardY.length; j++){
      for(var i=0; i < boardX.length; i++){
        var id = boardY[j]+boardX[i];
        var classToUse = 'game-square';
        if (i == boardX.length-1) {
          classToUse += ' game-square-border-right';
        }
        if (j == boardY.length-1) {
          classToUse += ' game-square-border-bottom';
        }
        $('#game-board').append('<div id="' + id + '" class="' + classToUse + '"></div>');

        if(!hasTouch()){
          $('#'+id).hover(
            function(){
              squareCreateGuide($(this).attr('id'));
              squareHovered = $(this).attr('id');
            },
            function(){
              squareRemoveGuide($(this).attr('id'));
              squareHovered = '';
            }
          );
        } else {
          /*
          $('#'+id).on('touchstart', function(e) {
            //e.preventDefault();
            //alert($(this).attr('id'))
            squareCreateGuide($(this).attr('id'));
            squareHovered = $(this).attr('id');
          });
          $('#'+id).on('touchend', function(e) {
            //e.preventDefault();
            //alert('touch end!')
            squareRemoveGuide($(this).attr('id'));
            squareHovered = '';
          });*/
        }
      }
    }

    if(!hasTouch()){

      $('#game-board').mousedown(function(event) {
        $('#container-jogo-bg').addClass('show-guide');
        mouseDown = true;
      });
      $('#game-board').mouseup(function(event) {
        if (mouseOnBoard && mouseDown){
          $('#container-jogo-bg').removeClass('show-guide');
          checkSquare(squareHovered);
        }
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
          $('#container-jogo-bg').removeClass('show-guide');
          squareRemoveGuide($(this).attr('id'));
          squareHovered = '';
          mouseOnBoard = false;
        }
      );
      $(document).mousedown(function(){
        mouseDown = true;
      });
      $(document).mouseup(function(){
        mouseDown = false;
      });

    } else {

      $('#game-board').on('touchstart', function(e) {
        $('#container-jogo-bg').addClass('show-guide');
        mouseDown = true;
        //****/
        //touch hover enter
        if (mouseDown) {
          $('#container-jogo-bg').addClass('show-guide');
        }
        mouseOnBoard = true;
        var target = document.elementFromPoint(
          event.touches[0].pageX,
          event.touches[0].pageY
        );
        if($(target).hasClass('game-square')) {
          if($(target).attr('id') != squareHovered){
            if(squareHovered != ''){
              squareRemoveGuide($(squareHovered).attr('id'));
            }
            squareCreateGuide($(target).attr('id'));
            squareHovered = $(target).attr('id');
          }
        }
      });
      $('#game-board').on("touchmove",function(event){
        var target = document.elementFromPoint(
            event.originalEvent.touches[0].pageX,
            event.originalEvent.touches[0].pageY
        );
        if($(target).hasClass('game-square')) {
          if($(target).attr('id') != squareHovered){
            if(squareHovered != ''){
              squareRemoveGuide($(squareHovered).attr('id'));
            }
            squareCreateGuide($(target).attr('id'));
            squareHovered = $(target).attr('id');
          }
        } else {
          squareRemoveGuide($(target).attr('id'));
          squareHovered = '';
          mouseOnBoard = false;
        }
      });
      $('#game-board').on('touchend', function(e) {
        if (mouseOnBoard && mouseDown){
          $('#container-jogo-bg').removeClass('show-guide');
          checkSquare(squareHovered);
        }
        squareHovered = '';
        mouseDown = false;
        /****/
        //touch hover exit
        $('#container-jogo-bg').removeClass('show-guide');
        squareRemoveGuide($(this).attr('id'));
        squareHovered = '';
        mouseOnBoard = false;
      });
      $(document).on('touchstart', function(e) {
        mouseDown = true;
      });
      $(document).on('touchend', function(e) {
        mouseDown = false;
      });
    }

    for (var i=0; i < boardX.length; i++){
      $('#board-top').append('<div class="coordinate-text" id="' + boardX[i] + '"></div>');
    }

    for (var i=0; i < boardY.length; i++){
      $('#board-left').append('<div class="coordinate-text" id="' + boardY[i] + '"></div>');
    }
  }
  function squareCreateGuide(id) {
    var y = id.substring(0, 2);
    var x = id.substring(2, 4);

    $('#'+y).addClass('coordinate-used');
    $('#'+x).addClass('coordinate-used');

    for(var j=0; j < boardY.length; j++){
      for(var i=0; i < boardX.length; i++){
        var id = boardY[j]+boardX[i];
        if( id != y+x && (id.indexOf(x) > -1 || id.indexOf(y) > -1) ) {
          $('#'+id).addClass('square-guide');
        }
      }
    }
  }
  function squareRemoveGuide(id) {
    $('.coordinate-text').removeClass('coordinate-used');

    for(var j=0; j < boardY.length; j++){
      for(var i=0; i < boardX.length; i++){
        var id = boardY[j]+boardX[i];
        $('#'+id).removeClass('square-guide');
      }
    }
  }

  function checkSquare(id) {
    if(stagePart != 999) {
      if (stage-1 < stagesTesouro.length) {
        if (id == stagesTesouro[stage-1][stagePart-1].squareCorrect) {
          correctSquare(stagesTesouro[stage-1][stagePart-1]);
        } else {
          wrongSquare(id);
        }
      } else {
        if(stage - stagesTesouro.length < stagesResgate.length) {
          if (id == stagesResgate[stage - stagesTesouro.length][stagePart-1].squareCorrect) {
            correctSquare(stagesResgate[stage - stagesTesouro.length][stagePart-1]);
          } else {
            wrongSquare(id);
          }
        }
      }
    }
  }
  function correctSquare(obj) {
    $('#'+obj.squareCorrect).append(
      '<img class="icon-correct" src="' + obj.iconCorrect + '" />'
    );
    stagePart ++;
    if (stage-1 < stagesTesouro.length) {
      if (stagePart-1 < stagesTesouro[stage-1].length) {
        stagesTesouro[stage-1][stagePart-1];
      } else {
        stageComplete();
      }
    } else {
      if(stage - stagesTesouro.length < stagesResgate.length) {
        if (stagePart-1 < stagesResgate[stage-1].length) {
          stagesResgate[stage - stagesTesouro.length][stagePart-1];
        } else {
          stageComplete();
        }
      }
    }
  }
  function stageComplete() {
    stagePart = 999;
    stage ++;
  }
  function startStage() {
    stagePart = 1;

    $('#container-jogo')
      .removeClass('map1')
      .removeClass('map2')
      .removeClass('map3')
      .removeClass('map4')
      .removeClass('map5');
    if (stage-1 < stagesTesouro.length) {
      $('#container-jogo').addClass(stagesTesouro[stage-1][0].mapImageClass);
    } else {
      if(stage - stagesTesouro.length < stagesResgate.length) {
        $('#container-jogo').addClass(stagesResgate[stage - stagesTesouro.length][0].mapImageClass);
      }
    }

    playSound('avancar');

    $('#container-mapa-tesouro').css('display', 'none');
    $('#container-carta-tesouro').css('display', 'none');
    
    $('#container-mapa-resgate').css('display', 'none');
    $('#container-carta-resgate').css('display', 'none');

    $('#container-jogo').css('display', 'block');
  }
  function wrongSquare(id) {
    
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
    if(lastPlayedSound != '') {
      $("#audio-" + lastPlayedSound)[0].currentTime = 0;
      $("#audio-" + lastPlayedSound)[0].pause();
      $("#audio-" + lastPlayedSound)[0].src = $("#audio-" + lastPlayedSound)[0].src;
    }

    if( $("#audio-" + soundId).length > 0 ) {
      $("#audio-" + soundId)[0].play();
      lastPlayedSound = soundId;
    }
  }

  function arrayRandomSort(a, b) {  
    return 0.5 - Math.random();
  }

  function hasTouch() {
    return 'ontouchstart' in document.documentElement;
  }

//});