//$(function() {
  
  /********VARIABLES*/
  var boardX = ['O7', 'O6', 'O5', 'O4', 'O3', 'O2', 'O1', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'],
      boardY = ['N5', 'N4', 'N3', 'N2', 'N1', 'S1', 'S2', 'S3', 'S4', 'S5'],
      squareHovered = '',
      stage = 1,
      stagePart = 1,
      mouseDown = false,
      mouseOnBoard = false,
      lastPlayedSound = '',
      hasNewMessage = false,
      lastCorrectSquare = '',
      lastCorrectIconElement = '',
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
        var id = boardY[j]+boardX[i];
        /*
        var classToUseGrid = 'game-grid-part';
        if (i == boardX.length-1) {
          classToUseGrid += ' game-grid-part-border-right';
        }
        if (j == boardY.length-1) {
          classToUseGrid += ' game-grid-part-border-bottom';
        }
        */
        $('#game-board').append('<div id="' + id + '" class="game-square ' + boardY[j] + ' ' + boardX[i] + '"></div>');
        //$('#game-grid').append('<td id="grid-' + id + '" class="' + classToUseGrid + '"></td>');

        if(!hasTouch()) {
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
        }
      }
    }

    if(!hasTouch()) {

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
        //mouseDown = true;
        //****/
        //touch hover enter
        $('#container-jogo-bg').addClass('show-guide');

        //mouseOnBoard = true;
        var target = document.elementFromPoint(
          event.touches[0].pageX,
          event.touches[0].pageY
        );
        if($(target).hasClass('game-square')) {
          if($(target).attr('id') != squareHovered) {
            if(squareHovered != '') {
              squareRemoveGuide($(squareHovered).attr('id'));
            }
            squareCreateGuide($(target).attr('id'));
            squareHovered = $(target).attr('id');
          }
        }
      });
      $('#game-board').on('touchmove',function(event){
        var target = document.elementFromPoint(
            event.originalEvent.touches[0].pageX,
            event.originalEvent.touches[0].pageY
        );
        if($(target).hasClass('game-square')) {
          if($(target).attr('id') != squareHovered){
            if(squareHovered != '') {
              squareRemoveGuide($(squareHovered).attr('id'));
            }
            squareCreateGuide($(target).attr('id'));
            squareHovered = $(target).attr('id');
          }
        } else {
          squareRemoveGuide($(target).attr('id'));
          squareHovered = '';
          //mouseOnBoard = false;
        }
      });
      $('#game-board').on('touchend', function(e) {
        if(squareHovered != ''){
          checkSquare(squareHovered);
        }
        squareHovered = '';
        //mouseDown = false;
        /****/
        //touch hover exit
        $('#container-jogo-bg').removeClass('show-guide');
        squareRemoveGuide($(this).attr('id'));
        squareHovered = '';
        //mouseOnBoard = false;
      });
      /*
      $(document).on('touchstart', function(e) {
        mouseDown = true;
      });
      $(document).on('touchend', function(e) {
        mouseDown = false;
      });
      */
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

    $('.'+y).addClass('square-guide');
    $('.'+x).addClass('square-guide');

    $('#'+y+x).removeClass('square-guide');

    /*
    for(var j=0; j < boardY.length; j++) {
      for(var i=0; i < boardX.length; i++) {
        var id = boardY[j]+boardX[i];
        if( id != y+x && (id.indexOf(x) > -1 || id.indexOf(y) > -1) ) {
          $('#'+id).addClass('square-guide');
        }
      }
    }
    */
  }
  function squareRemoveGuide(id) {
    $('.coordinate-text').removeClass('coordinate-used');
    $('.game-square').removeClass('square-guide');
/*
    for(var j=0; j < boardY.length; j++) {
      for(var i=0; i < boardX.length; i++) {
        var id = boardY[j]+boardX[i];
        $('#'+id).removeClass('square-guide');
      }
    }
*/
  }

  function checkSquare(id) {
    if(stagePart != 999 && !hasNewMessage) {
      if (stage-1 < stagesTesouro.length) {
        if (id == stagesTesouro[stage-1][stagePart-1].squareCorrect) {
          correctSquare(stagesTesouro[stage-1][stagePart-1]);
        } else {
          wrongSquare(id);
        }
      } else {
        if(stage - 1 - stagesTesouro.length < stagesResgate.length) {
          if (id == stagesResgate[stage - 1 - stagesTesouro.length][stagePart-1].squareCorrect) {
            correctSquare(stagesResgate[stage - 1 - stagesTesouro.length][stagePart-1]);
          } else {
            wrongSquare(id);
          }
        }
      }
    }
  }
  function correctSquare(obj) {
    playSound(obj.soundCorrect);
    if (obj.iconCorrect != '{{icon_chest}}'){
      $('#'+obj.squareCorrect).append(
        '<img class="icon-correct" src="' + obj.iconCorrect + '" />'
      );
    } else {
      $('#'+obj.squareCorrect).append(
        '<div id="chest-icon" class="icon-correct chest-icon-closed"></div>'
      );
      setTimeout(function(){
        $('#chest-icon').removeClass('chest-icon-closed');
        $('#chest-icon').addClass('chest-icon-opened');
      }, 500);
    }
    stagePart ++;
    if (stage-1 < stagesTesouro.length) {
      if (stagePart-1 < stagesTesouro[stage-1].length) {
        setStagePart(stagesTesouro[stage-1][stagePart-1]);
      } else {
        stageComplete();
      }
    } else {
      if(stage - 1 - stagesTesouro.length < stagesResgate.length) {
        if (lastCorrectSquare != '') {
          $('#'+lastCorrectSquare).empty();
        }
        if (lastCorrectIconElement != '') {
          addCharToShip(lastCorrectIconElement);
        }

        if (stagePart-1 < stagesResgate[stage - 1 - stagesTesouro.length].length) {
          setStagePart(stagesResgate[stage - 1 - stagesTesouro.length][stagePart-1]);
        } else {
          stageComplete();
        }

        lastCorrectSquare = obj.squareCorrect;
        if (obj.iconCorrect == 'img/icon_garrafa.gif') {
          lastCorrectIconElement = '';
        } else{
          lastCorrectIconElement = '<img class="char-ship char-ship-'+ stagePart +'" src="' + obj.iconCorrect + '" />'
        }
      }
    }
  }
  function addCharToShip() {
    $('#ship').append(lastCorrectIconElement);
  }
  function setStagePart(obj) {
    $('#jogo-carta-text').empty();
    $('#jogo-carta-text').append(obj.text);
    //$('#menu-button-carta').addClass('menu-button-carta-new-message');
    hasNewMessage = true;
    setTimeout(function(){
      openCarta();
    }, 500);
  }
  function stageComplete() {
    stagePart = 999;
    stage ++;

    for (var i=0; i < stage; +i++) {
      $('#stage-point-'+i).removeClass('stage-point-actual');
      $('#stage-point-'+i).addClass('stage-point-passed');
    }
    $('#stage-point-'+stage).addClass('stage-point-actual');
    $('#menu-button-carta').css('display', 'none');
    $('#jogo-carta').css('display', 'none');
    $('#button-avancar-jogo').css('display', 'block');
  }
  function stageFailed() {
    stagePart = 999;
    if (stage-1 < stagesTesouro.length) {
      setTimeout(function(){
        $('#container-jogo').css('display', 'none');
        $('#container-mapa-tesouro').css('display', 'block');
      }, 1000);
    } else {
      setTimeout(function(){
        $('#container-jogo').css('display', 'none');
        $('#container-mapa-resgate').css('display', 'block');
      }, 1000);
    }
  }
  function startStage() {
    stagePart = 1;
    lastCorrectSquare = '';
    lastCorrectIconElement = '';
    
    lives = startingLives;
    $('#lives').text(lives);

    $('.game-square').empty();

    //$('#container-jogo')
    $('#game-grid')
      .removeClass('map1')
      .removeClass('map2')
      .removeClass('map3')
      .removeClass('map4')
      .removeClass('map5');
    
    $('#ship').remove();

    if (stage-1 < stagesTesouro.length) {
      $('#game-grid').addClass(stagesTesouro[stage-1][0].mapImageClass);
      $('#'+stagesTesouro[stage-1][0].propPosition).append('<div class="stage-prop stage-prop-'+stagesTesouro[stage-1][0].mapImageClass+'"></div>');
      setStagePart(stagesTesouro[stage-1][0]);
    } else {
      if(stage - 1 - stagesTesouro.length < stagesResgate.length) {
        $('#game-grid').addClass(stagesResgate[stage - 1 - stagesTesouro.length][0].mapImageClass);
        $('#'+stagesResgate[stage - 1 - stagesTesouro.length][0].propPosition).append('<div class="stage-prop stage-prop-'+stagesResgate[stage - 1 - stagesTesouro.length][0].mapImageClass+'"></div>');
        $('#game-grid').append('<div id="ship" class="ship-icon-back"><div class="ship-icon-front"></div></div>');
        $('#ship .char-ship').remove();
        setStagePart(stagesResgate[stage - 1 - stagesTesouro.length][0]);
      }
    }

    $('#container-mapa-tesouro').css('display', 'none');
    $('#container-carta-tesouro').css('display', 'none');
    
    $('#container-mapa-resgate').css('display', 'none');
    $('#container-carta-resgate').css('display', 'none');

    $('#button-avancar-jogo').css('display', 'none');
    $('#container-jogo').css('display', 'block');
    $('#menu-button-carta').css('display', 'block');

    openCarta();
  }
  function wrongSquare(id) {
    if(!$('#'+id).hasClass('square-wrong')){
      playSound('error');
      $('#'+id).addClass('square-wrong');
      lives--;
      $('#lives').text(lives);
      setTimeout(function(){
        $('#'+id).removeClass('square-wrong');
      }, 2500);

      if(lives <= 0) {
        stageFailed();
      }
    }
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
      $('#audio-' + lastPlayedSound)[0].currentTime = 0;
      $('#audio-' + lastPlayedSound)[0].pause();
      $('#audio-' + lastPlayedSound)[0].src = $('#audio-' + lastPlayedSound)[0].src;
    }

    if( $('#audio-' + soundId).length > 0 ) {
      $('#audio-' + soundId)[0].play();
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