//$(function() {
  /********VARIABLES*/
  var stage = 1;
  var phraseIndex = 0;

  var answers = [];
  var lastPlayedSound = '';
  var audio = document.querySelector('audio');

  var menuStageClass = 'menu-button-fase-';
  var unlockedStages = ['1-0'];

  var showIntro1 = true;
  var showIntro2 = true;

  var showTutorial = true;

  var lives = 3;
  var startingLives = 3;

  var clickCenterTimeOut;
  var clickScale = {
      x: 0,
      y: 0,
      centerX: 0,
      centerY: 0
  };
  watchDroppables();


  /************* MENU **************/
  $('#menu-button-comecar').click(function(){

    $('.container-splash-screen').css('display', 'none');

    if(showIntro1){
      showIntro1 = false;
      $('#container-intro-1').css('display', 'block');
    } else {
      $('.container-menu').css('display', 'block');
    }
    //playSound('comecar');
  });

  $('#menu-button-avancar-intro-1').click(function(){
    $('#container-intro-1').css('display', 'none');
    $('.container-menu').css('display', 'block');
    //playSound('avancar');
  });

  $('#menu-button-avancar-intro-2').click(function(){
    $('#container-intro-2').css('display', 'none');
    $('.container-menu').css('display', 'block');
    //playSound('avancar');
  });

  $('.menu-button-fase').click(function() {
    $('.container-menu').css('display', 'none');
    $('.container-mecanica-dragdrop').css('display', 'block');
    playSound('avancar');

    var stageArray = $(this).attr('id').split('-');
    setStage(stageArray[3], stageArray[4]);
  });

  $('#menu-button-avancar-tutorial').click(function(){
    $('.tutorial').css('display', 'none');
  });

  $('#menu-button-voltar-end').click(function(){
    $('.container-end').css('display', 'none');
    $('.container-splash-screen').css('display', 'block');
    $('.menu-button-fase').attr('disabled', true);
    $('#menu-button-fase-1-0').attr('disabled', false);
    unlockedStages = ['1-0'];
  });

  var mousedownDropsWrapper = false;
  var mouseoverDropsWrapper = false;
  var mousedownDropsWrapperStartY = 0;
  if(!hasTouch()) {
    $('.drops-wrapper').addClass('no-touch');
    $('#drops-wrapper-internal').mousedown(function(event) {
      mousedownDropsWrapperStartY = event.clientY/getScale() - parseInt($('#drops-bg').css('top'));
      mousedownDropsWrapper = true;
    });

    $('#drops-wrapper-internal').mousemove(function(event) {
      if(mousedownDropsWrapper && mouseoverDropsWrapper){
        var traveledDistance = (event.clientY/getScale() - mousedownDropsWrapperStartY);

        if( traveledDistance < 0 ){
          var maxTop = parseInt($('#drops-wrapper-internal').css('height')) - parseInt($('#drops-wrapper').css('height'));

          var parallaxValue = parseInt($('#container-drops').css('height')) / parseInt($('#drops-bg').css('height'));
          if( traveledDistance > -maxTop) {
            
            $('#drops-bg').css('top', traveledDistance);
            $('#container-drops').css('top', traveledDistance * parallaxValue);
          } else{
            $('#drops-bg').css('top', -maxTop);
            $('#container-drops').css('top', -maxTop * parallaxValue);
          }
        } else {
          $('#drops-bg').css('top', 0);
          $('#container-drops').css('top', 0);
        }
      }
    });

    $('#drops-wrapper-internal').mouseenter(function(event) {
      mouseoverDropsWrapper = true;
    });
    $('#drops-wrapper-internal').mouseleave(function(event) {
      mouseoverDropsWrapper = false;
    });

    $(document).mouseup(function(){
      mousedownDropsWrapper = false;
    });
  } else {
    /*Has touch*/
    $('.drops-wrapper').addClass('has-touch');
    $('#drops-wrapper-internal').on('touchstart', (function(event) {
      mousedownDropsWrapperStartY = event.originalEvent.touches[0].pageY/getScale() - parseInt($('#drops-bg').css('top'));
      mousedownDropsWrapper = true;
    }));

    $('#drops-wrapper-internal').on('touchmove',(function(event) {
      var target = document.elementFromPoint(
        event.originalEvent.touches[0].pageX,
        event.originalEvent.touches[0].pageY
      );
      if($(target).hasClass('drops-wrapper-internal') || $(target).parents().hasClass('drops-wrapper-internal')) {
        mouseoverDropsWrapper = true;
      } else {
        mouseoverDropsWrapper = false;
      }

      if(mousedownDropsWrapper && mouseoverDropsWrapper){
        var traveledDistance = (event.originalEvent.touches[0].pageY/getScale() - mousedownDropsWrapperStartY);

        if( traveledDistance < 0 ){
          var maxTop = parseInt($('#drops-wrapper-internal').css('height')) - parseInt($('#drops-wrapper').css('height'));
          if( traveledDistance > -maxTop) {
            
            $('#drops-bg').css('top', traveledDistance);
            $('#container-drops').css('top', traveledDistance * getActualStageObject()[phraseIndex].parallaxValue);
          } else{
            $('#drops-bg').css('top', -maxTop);
            $('#container-drops').css('top', -maxTop * getActualStageObject()[phraseIndex].parallaxValue);
          }
        } else {
          $('#drops-bg').css('top', 0);
          $('#container-drops').css('top', 0);
        }
      }
    }));

    

    $('#drops-wrapper-internal').on('touchend', (function(){
      mousedownDropsWrapper = false;
    }));
  }

  /********GAME MECHANICS********/
  function createAnswers(answers) {
    $('#container-letters').empty();

    $('#container-letters')
      .removeClass('letters-total-4')
      .removeClass('letters-total-5')
      .removeClass('letters-total-6')
      .addClass('letters-total-'+answers.length);

    $('#container-letters').append(
      '<div id="lives-counter" class="lives-'+lives+'">'+
        '<div id="lives-heart-1" class="lives-heart"></div>'+
        '<div id="lives-heart-2" class="lives-heart"></div>'+
        '<div id="lives-heart-3" class="lives-heart"></div>'+
      '</div>'
    ).append(
      '<div id="answers-container" class="answers-container"></div>'
    );


    for (var i=0; i<answers.length; i++) {
      $('#container-letters #answers-container')
        .append(
          '<div id="draggable-' + i + '" class="draggable-letter">'+
            '<div id="letter-bg-' + i + '" class="letter-bg"></div>'+
          '</div>'
        );
      $( '#draggable-' + i ).attr('data-letter', answers[i]);
      $( '#letter-bg-' + i ).attr('data-letter', answers[i]);
      $( '#letter-bg-' + i ).addClass('letter-bg-'+getActualStageAnswers().indexOf(answers[i]));
      
      $( '#draggable-' + i ).mousedown(function(event) {
        playSound("bubble");
        $(this).addClass("dragging");
      });
  
      $( '#draggable-' + i ).mouseup(function() {
        $(this).removeClass("dragging");
        //if($(this).hasClass('') ||
          //$(this).hasClass('half-correct') || 
          //$(this).hasClass('wrong') ) {
            //$(this).css('top', 0);
        //}
      });
  
      $( '#draggable-' + i ).draggable({
        scroll: false,
        revert: 'invalid',
        //revert: true,
        //revert: 'valid',
        //revert: "invalid",
        revertDuration: 500,
        distance: 0,
        start: function(event, ui) {
          scaleDragStart(event, ui, $(this));
        },
        drag: function(event, ui) {
          scaleDragDrag(event, ui);
        },
        stop: function(event, ui) {
          $(this).removeClass('dragging');
        }
      });
    }
  }

  function isCorrect(event, ui) {
    var _droppable = $(event.target);
    var _draggable = $(ui.draggable[0]);

    if(_droppable.attr('data-letter') == _draggable.attr('data-letter')) {
      changeCorrectClasses(_draggable, _droppable, 'correct');
    } else {
      changeCorrectClasses(_draggable, _droppable, 'wrong');
    }
  }

  function checkAllCorrect() {
    var wrongAnswers = new Array();
    var correctAnswers = new Array();
    var totalDroppables = 0;
    $('.droppable-letter').each(function(index, value){
      if($(value).hasClass('wrong')){
        wrongAnswers.push(value);
      }
      if($(value).hasClass('correct')){
        correctAnswers.push(value);
      }
      totalDroppables++;
    });

    if(wrongAnswers.length + correctAnswers.length == totalDroppables){
      if(wrongAnswers.length == 0){
        //correct
        //correct timeout
        setTimeout(function(){
          $('.droppable-letter')
            .removeClass('wrong')
            .removeClass('correct');
    
          if(getNextStage() != 'end'){
            if(unlockedStages.indexOf(getNextStage()) == -1) {
              unlockedStages.push(getNextStage());
            }
      
            for(var i=0; i<unlockedStages.length; i++) {
              $('#' + menuStageClass + unlockedStages[i]).attr('disabled', false)
            }
      
            $('.container-mecanica-dragdrop').css('display', 'none');

            if(getNextStage() == '2-0' && showIntro2){
              showIntro2 = false;
              $('#container-intro-2').css('display', 'block');
            } else {
              $('.container-menu').css('display', 'block');
            }
          } else {
            $('.container-mecanica-dragdrop').css('display', 'none');
            $('.container-end').css('display', 'block');
          }
        }, 500);
        //correct timeout end
      } else {
        //wrong
        setTimeout(function(){
          $('#button-check-answers').removeClass('button-pressed');
        }, 500);

        for(var i=0; i<wrongAnswers.length; i++){
          //do something on wrong element
          $(wrongAnswers[i])
            .draggable( 'option', 'disabled', true )
            .removeClass('droppable-letter-0')
            .removeClass('droppable-letter-1')
            .removeClass('droppable-letter-2')
            .removeClass('droppable-letter-3')
            .removeClass('droppable-letter-4')
            .removeClass('droppable-letter-5')
            .removeClass('wrong')
            .addClass('wrong-animation');

            setTimeout(function(){
              $(wrongAnswers[i])
                .draggable( 'option', 'disabled', false )
                .removeClass( 'wrong-animation' )
            }, 2000);
        }
        loseLife();
      }
    } else {
      //has empty answer
      setTimeout(function(){
        $('#button-check-answers').removeClass('button-pressed');
      }, 500);
    }
  }

  function changeCorrectClasses(_draggable, _droppable, classToAdd) {
    $(_draggable).addClass(classToAdd);
      
    $( _droppable )
    //.droppable( 'option', 'disabled', true )
    .removeClass('wrong')
    .removeClass( 'correct' )
    .removeClass('droppable-letter-0')
    .removeClass('droppable-letter-1')
    .removeClass('droppable-letter-2')
    .removeClass('droppable-letter-3')
    .removeClass('droppable-letter-4')
    .removeClass('droppable-letter-5')
    .addClass(classToAdd)
    .addClass('droppable-letter-'+getActualStageAnswers().indexOf(_draggable.attr('data-letter')));
    //playSound(classToAdd);
    
    $(_draggable).draggable( 'option', 'disabled', true );
    resetLetterPosition(_draggable);
  }

  function loseLife() {

    lives--;

    if(lives <= 0){
      lives = 0;
    }

    $('#lives-counter')
      .removeClass('lives-3')
      .removeClass('lives-2')
      .removeClass('lives-1')
      .removeClass('lives-0')
      .addClass('lives-'+lives);

    if(lives == 0){      
      gameOver();
    }
  }

  function gameOver() {
    $('.container-mecanica-dragdrop').css('display', 'none');
    $('.container-menu').css('display', 'block');
  }

  function resetLetterPosition(letter) {
    $(letter)
    .removeClass( 'dragging' )
    .css('top', 0)
    .css('left', 0);

    setTimeout(function(){
      $(letter)
        .draggable( 'option', 'disabled', false )
        .removeClass( 'wrong' )
        .removeClass( 'correct' )
    }, 2000);
  }
  

  /**********GAME WORDS NAVIGATION**********/
  function getActualStageObject() {
    if (stage == 1) {
      return phrasesFirstStage;
    }
    if (stage == 2) {
      return phrasesSecondStage;
    }
    return [];
  }

  function getActualStageAnswers() {
    var stageObject = getActualStageObject();
    if (stageObject.length > phraseIndex) {
      if(stageObject[phraseIndex].answers.length > 0) {
        return stageObject[phraseIndex].answers;
      }
    }
    
    return [];
  }

  function getNextStage() {
    var stageObject = getActualStageObject();
    if (stageObject.length > parseInt(phraseIndex)+1) {
        return stage + '-' + (parseInt(phraseIndex)+1);
    } else {
      if (stage == '1') {
        return '2-0';
      } else {
        return 'end';
      }
    }

    return '';
  }

  function setStageAndPhraseIndex(newStage, newPhraseIndex) {
    stage = newStage;
    phraseIndex = newPhraseIndex;
  }

  function setStage(newStage, newPhraseIndex) {
    setStageAndPhraseIndex(newStage, newPhraseIndex);

    lives = startingLives;
    /*
    if(bodyPartIndex == bodyList.length) {
      setTimeout(function(){
        $('.part-body').addClass('all-correct');
        setTimeout(function(){
          $('.part-body').css('display', 'none');
          $('.part-head').css('display', 'block');
        }, 3000);
      }, 2000);
    }
    */

    if(showTutorial){
      $('.tutorial').css('display', 'block');
      showTutorial = false;
    }

    $('.container-mecanica-dragdrop')
      .removeClass('all-correct')
      .removeClass('container-mecanica-dragdrop-1-0')
      .removeClass('container-mecanica-dragdrop-1-1')
      .removeClass('container-mecanica-dragdrop-1-2')
      .removeClass('container-mecanica-dragdrop-1-3')
      .removeClass('container-mecanica-dragdrop-1-4')
      .removeClass('container-mecanica-dragdrop-2-0')
      .removeClass('container-mecanica-dragdrop-2-1')
      .removeClass('container-mecanica-dragdrop-2-2')
      .removeClass('container-mecanica-dragdrop-2-3')
      .removeClass('container-mecanica-dragdrop-2-4')
      .addClass('container-mecanica-dragdrop-'+stage+'-'+phraseIndex);
    
    $('.container-mecanica-dragdrop').css('display', 'block');
    answers = Array.from(getActualStageAnswers());



    createAnswers(
      answers.sort(arrayRandomSort)
    );
    
    var stageObject = getActualStageObject();
    $('#container-drops').empty();
    for (var i=0; i<stageObject[phraseIndex].correctAnswers.length; i++) {      
/*      
      $('#container-drops').append('<div id="drops-line-' + i + '" class="drops-line"></div>');
      $('#drops-line-' + i).append('<div id="phrase-before-' + i + '" class="phrase-before">' + stageObject[phraseIndex][i].phraseBefore + '</div>');

      if(typeof(stageObject[phraseIndex][i].phraseMiddle) != 'undefined') {
        $('#drops-line-' + i).append('<div id="phrase-middle-' + i + '" class="phrase-middle">' + stageObject[phraseIndex][i].phraseMiddle + '</div>');
        $('#phrase-middle-' + i).append('<div id="droppable-' + i + '" class="droppable-letter"></div>');
      } else {
      
        $('#drops-line-' + i).append('<div id="droppable-' + i + '" class="droppable-letter"></div>');
      }
*/
      $('#container-drops').append('<div id="droppable-' + i + '" class="droppable-letter"></div>');

      $( '#droppable-' + i ).attr('data-letter', stageObject[phraseIndex].correctAnswers[i]);

      $( '#droppable-' + i ).droppable({
        tolerance: 'pointer',
        accept: '.draggable-letter',
        drop: function( event, ui ) {
          isCorrect(event, ui);
        }
      });
    }
    $('#container-drops').append('<button type="button" id="button-check-answers" class="button-check-answers"></button>');
    $('#button-check-answers').click(function(){
      $('#button-check-answers').addClass('button-pressed');
      checkAllCorrect();
    });

    $('#drops-bg').css('top', 0);
    $('#container-drops').css('top', 0);
  }


  /******* SCALE FIX *********/
  function scaleDragStart(event, ui, element) {
    var zoom = getScale();
    var original = ui.originalPosition;
    
    clickScale.x = event.clientX;
    clickScale.y = event.clientY;
    clickScale.centerX = event.clientX - ui.offset.left - ui.helper.width()*zoom/2;
    clickScale.centerY = event.clientY - ui.offset.top - ui.helper.height()*zoom/2;

    /*
    if($(element).hasClass('sticker-cabelo')){
      clickScale.centerY += 40;
    }
    if($(element).hasClass('sticker-pescoco')){
      clickScale.centerY -= 64;
    }
    if($(element).hasClass('sticker-boca')){
      clickScale.centerY -= 50;
    }
    if($(element).hasClass('sticker-nariz')){
      clickScale.centerY -= 30;
    }
    */

    ui.position = {
      left: (event.clientX - clickScale.x + clickScale.centerX + original.left ) / zoom,
      top:  (event.clientY - clickScale.y + clickScale.centerY + original.top ) / zoom
    };

    clickCenterTimeOut = setTimeout(function(){
      $(element).css('left', ui.position.left).css('top', ui.position.top);
    }, 5);
  }
  function scaleDragDrag(event, ui) {
    clearTimeout(clickCenterTimeOut);
    // This is the parameter for scale()
    var zoom = getScale();
    var original = ui.originalPosition;

    // jQuery will simply use the same object we alter here
    ui.position = {
      left: (event.clientX - clickScale.x + clickScale.centerX + original.left ) / zoom,
      top:  (event.clientY - clickScale.y + clickScale.centerY + original.top ) / zoom
    };
  }
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
  function watchDroppables() {
    $.ui.ddmanager.prepareOffsets = function(t, event) {

      var m = $.ui.ddmanager.droppables[t.options.scope] || [];
      var type = event ? event.type : null; // workaround for #2317
      var list = (t.currentItem || t.element).find(":data(droppable)").andSelf();
  
      droppablesLoop: for (var i = 0; i < m.length; i++) {
  
        if(m[i].options.disabled || (t && !m[i].accept.call(m[i].element[0],(t.currentItem || t.element)))) continue;	//No disabled and non-accepted
        for (var j=0; j < list.length; j++) { if(list[j] == m[i].element[0]) { m[i].proportions.height = 0; continue droppablesLoop; } }; //Filter out elements in the current dragged item
        m[i].visible = m[i].element.css("display") != "none"; if(!m[i].visible) continue; 									//If the element is not visible, continue
  
        if(type == "mousedown") m[i]._activate.call(m[i], event); //Activate the droppable if used directly from draggables
  
        m[i].offset = m[i].element.offset();
        m[i].proportions = { width: m[i].element[0].offsetWidth * getScale(), height: m[i].element[0].offsetHeight * getScale() };
  
      }
  
    }
  }


  /**********FUNCTIONS***********/
  function playSound(soundId) {
    /*
    if(lastPlayedSound != '') {
      $("#audio-" + lastPlayedSound)[0].currentTime = 0;
      $("#audio-" + lastPlayedSound)[0].pause();
      $("#audio-" + lastPlayedSound)[0].src = $("#audio-" + lastPlayedSound)[0].src;
    }

    $("#audio-" + soundId)[0].play();
    lastPlayedSound = soundId;
    */
  }

  function isAccentedCharacter (letter) {
    return letter.match(/[áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/);
  }
  function isHintCharacter (letter) {
    return letter.match(/[zZ]/);
  } 
  function removeAccents(strAccents) {
    var strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
    for (var y = 0; y < strAccentsLen; y++) {
      if (accents.indexOf(strAccents[y]) != -1) {
        strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
      } else
        strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
  }

  function arrayRandomSort(a, b) {  
    return 0.5 - Math.random();
  }

  function hasTouch() {
    return 'ontouchstart' in document.documentElement;
  }
//});