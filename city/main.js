//$(function() {
  
  /********VARIABLES*/
  var lastPlayedSound = '',
      audio = document.querySelector('audio'),
      endingGame = false,
      level = {
        igreja: 0,
        industria: 0,
        mercado: 0,
        moradia: 0,
        transporte: 0,
        base: 0
      },
      placeDisabled = {
        igreja: false,
        industria: false,
        mercado: false,
        moradia: false,
        transporte: false,
        base: false
      }
    ;

  /************* MENU **************/
  $('#menu-button-comecar').click(function(){
    $('.container-splash-screen').css('display', 'none');
    $('#container-tutorial').css('display', 'block');
    playSound('button2');
  });

  $('#button-avancar-tutorial').click(function() {
    playSound('button2');
    startStage();
    $('#container-tutorial').css('display', 'none');
    $('#container-jogo').css('display', 'block');
  });

  $('#button-voltar-end').click(function() {
    playSound('button2');
    $('#container-end').css('display', 'none');
    $('.container-splash-screen').css('display', 'block');
  });

  $('#button-game-igreja').click(function() {
    playSound('button2');
    clickedButton('igreja', level.igreja+1)
  });
  $('#button-game-mercado').click(function() {
    playSound('button2');
    clickedButton('mercado', level.mercado+1)
  });
  $('#button-game-transporte').click(function() {
    playSound('button2');
    clickedButton('transporte', level.transporte+1)
  });
  $('#button-game-industria').click(function() {
    playSound('button2');
    clickedButton('industria', level.industria+1)
  });
  $('#button-game-moradia').click(function() {
    playSound('button2');
    clickedButton('moradia', level.moradia+1)
  });

  /********GAME MECHANICS********/
  function startStage() {
    setLevel('igreja', 0);
    setLevel('industria', 0);
    setLevel('mercado', 0);
    setLevel('moradia', 0);
    setLevel('transporte', 0);
    setLevel('base', 0);

    $('.game-button').removeClass('place-needed');

    endingGame = false;
  }

  function setLevel(place = 'base', levelToGo = 0) {
    level[place] = levelToGo;

    $('#'+place+'-container')
    .removeClass('level-0')
    .removeClass('level-1')
    .removeClass('level-2')
    .removeClass('level-3')
    .addClass('level-'+levelToGo);

    $('#button-game-'+place)
    .removeClass('level-0')
    .removeClass('level-1')
    .removeClass('level-2')
    .removeClass('level-3')
    .addClass('level-'+levelToGo);

    $('#button-game-'+place).prop('disabled', false);
    placeDisabled[place] = false;

    if(levelToGo == 3){
      $('#button-game-'+place).prop('disabled', true);
      placeDisabled[place] = true;
    }

    if(level.igreja >= levelToGo &&
      level.industria >= levelToGo &&
      level.mercado >= levelToGo &&
      level.moradia >= levelToGo &&
      level.transporte >= levelToGo &&
      level.base < levelToGo ){
        setLevel('base', levelToGo);
    }
  }

  function clickedButton(place = 'mercado', levelToGo = 0){
    if(!endingGame){
      var canUpLevel = true;

      $('.game-button').removeClass('place-needed');
      
      if(requirements[place][levelToGo-1].igreja > level.igreja){
        canUpLevel = false;
        $('#button-game-igreja').addClass('place-needed');
      }
      if(requirements[place][levelToGo-1].mercado > level.mercado){
        canUpLevel = false;
        $('#button-game-mercado').addClass('place-needed');
      }
      if(requirements[place][levelToGo-1].transporte > level.transporte){
        canUpLevel = false;
        $('#button-game-transporte').addClass('place-needed');
      }
      if(requirements[place][levelToGo-1].industria > level.industria){
        canUpLevel = false;
        $('#button-game-industria').addClass('place-needed');
      }
      if(requirements[place][levelToGo-1].moradia > level.moradia){
        canUpLevel = false;
        $('#button-game-moradia').addClass('place-needed');
      }

      if(canUpLevel){
        //correct
        setLevel(place, levelToGo);
      }else{
        //wrong
        $('#button-game-'+place).prop('disabled', true);
        placeDisabled[place] = true;
      }

      if(placeDisabled.igreja &&
        placeDisabled.industria &&
        placeDisabled.mercado &&
        placeDisabled.moradia &&
        placeDisabled.transporte){
          endingGame = true;
          setTimeout(() => {
            stageEnd();
          }, 600);
        }
    }
  }

  function checkAllButtonsDisabled(){
    $('.game-button').prop('disabled')
  }

  function stageEnd() {
    $('#container-jogo').css('display', 'none');
    $('#container-end')
    .removeClass('base-0')
    .removeClass('base-1')
    .removeClass('base-2')
    .removeClass('base-3')
    .addClass('base-'+level.base)
    .css('display', 'block');
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