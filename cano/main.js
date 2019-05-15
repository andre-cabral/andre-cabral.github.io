//$(function() {
  /********VARIABLES*/
  var stage = 1;
  var phraseIndex = 0;

  var answers = [];
  var lastPlayedSound = '';
  var audio = document.querySelector('audio');

  var menuStageClass = 'menu-button-fase-';
  var unlockedStages = ['1-0'];

  var showTutorial = true;

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
    $('.container-menu').css('display', 'block');
    //playSound('comecar');
  });

  $('.menu-button-fase').text($(this).attr('id'));
  $('.menu-button-fase').each(function(index, value){
    var stageArray = $(value).attr('id').split('-');

    if(stageArray[3] == '1') {
      $(value).text((parseInt(stageArray[4])+1) + ' . ' + phrasesFirstStage[stageArray[4]][0].theme);
    }
    if(stageArray[3] == '2') {
      $(value).text((parseInt(stageArray[4])+1+phrasesFirstStage.length) + ' . ' + phrasesSecondStage[stageArray[4]][0].theme);
    }
  });

  $('.menu-button-fase').click(function() {
    $('.container-menu').css('display', 'none');
    $('.container-mecanica-dragdrop').css('display', 'block');
    playSound('avancar');
    setTimeout(function(){
      playSound('intro');
    }, 3000);

    var stageArray = $(this).attr('id').split('-');
    setStage(stageArray[3], stageArray[4]);
  });

  $('#menu-button-tutorial-close').click(function(){
    $('.tutorial').addClass('closing');

    setTimeout(function(){
      $('.tutorial').css('display', 'none');
    }, 2000);
  });

  $('#menu-button-check-answers').click(function(){
    checkAllCorrect();
  });

  $('#menu-button-voltar-end').click(function(){
    $('.container-end').css('display', 'none');
    $('.container-splash-screen').css('display', 'block');
    $('.menu-button-fase').attr('disabled', true);
    $('#menu-button-fase-1-0').attr('disabled', false);
    unlockedStages = ['1-0'];
  });

  /********GAME MECHANICS********/
  function createAnswers(answers) {
    $('#container-letters').empty();

    $('#container-letters')
      .removeClass('letters-total-2')
      .removeClass('letters-total-3')
      .removeClass('letters-total-4')
      .removeClass('letters-total-5')
      .removeClass('letters-total-6')
      .removeClass('letters-total-7')
      .addClass('letters-total-'+answers.length);


    for (var i=0; i<answers.length; i++) {
      $('#container-letters')
        .append(
          '<div id="draggable-' + i + '" class="draggable-letter">'+
            '<div id="letter-bg-' + i + '" class="letter-bg">' + answers[i] + '</div>'+
          '</div>'
        );
      $( '#draggable-' + i ).attr('data-letter', answers[i]);
      $( '#letter-bg-' + i ).attr('data-letter', answers[i]);
      
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
        $('.droppable-letter')
          .removeClass('wrong')
          .removeClass('correct')
          .text('');
  
        if(getNextStage() != 'end'){
          if(unlockedStages.indexOf(getNextStage()) == -1) {
            unlockedStages.push(getNextStage());
          }
    
          for(var i=0; i<unlockedStages.length; i++) {
            $('#' + menuStageClass + unlockedStages[i]).attr('disabled', false)
          }
    
          $('.container-mecanica-dragdrop').css('display', 'none');
          $('.container-menu').css('display', 'block');
        } else {
          $('.container-mecanica-dragdrop').css('display', 'none');
          $('.container-end').css('display', 'block');
        }
  
      } else {
        //wrong
        for(var i=0; i<wrongAnswers.length; i++){
          //do something on wrong element
        }
        $('.droppable-letter')
          .removeClass('wrong')
          .removeClass('correct')
          .text('');
      }
    } else {
      //has empty answer
    }
  }

  function changeCorrectClasses(_draggable, _droppable, classToAdd) {
    $(_draggable).addClass(classToAdd);
      
    $( _droppable )
    //.droppable( 'option', 'disabled', true )
    .removeClass('wrong')
    .removeClass( 'correct' )
    .addClass(classToAdd)
    .text( _draggable.attr('data-letter') );
    //playSound(classToAdd);
    
    $(_draggable).draggable( 'option', 'disabled', true );
    resetLetterPosition(_draggable);
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
      if(stageObject[phraseIndex].length > 0) {
        return stageObject[phraseIndex][0].answers;
      }
    }
    
    return [];
  }

  function getNextStage() {
    var stageObject = getActualStageObject();
    if (stageObject.length > parseInt(phraseIndex)+1) {
      if(stageObject[parseInt(phraseIndex)+1].length > 0) {
        return stage + '-' + (parseInt(phraseIndex)+1);
      }
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

    $('.container-mecanica-dragdrop').removeClass('all-correct');
    $('.container-mecanica-dragdrop').css('display', 'block');
    answers = getActualStageAnswers();

    createAnswers(
      answers.sort(arrayRandomSort)
    );
    
    var stageObject = getActualStageObject();
    $('#container-drops').empty();
    for (var i=0; i<stageObject[phraseIndex].length; i++) {
      $('#container-drops').append('<div id="drops-line-' + i + '" class="drops-line"></div>');
      $('#drops-line-' + i).append('<div id="phrase-before-' + i + '" class="phrase-before">' + stageObject[phraseIndex][i].phraseBefore + '</div>');

      if(typeof(stageObject[phraseIndex][i].phraseMiddle) != 'undefined') {
        $('#drops-line-' + i).append('<div id="phrase-middle-' + i + '" class="phrase-middle">' + stageObject[phraseIndex][i].phraseMiddle + '</div>');
        $('#phrase-middle-' + i).append('<div id="droppable-' + i + '" class="droppable-letter"></div>');
      } else {
        $('#drops-line-' + i).append('<div id="droppable-' + i + '" class="droppable-letter"></div>');
      }

      $( '#droppable-' + i ).attr('data-letter', stageObject[phraseIndex][i].phraseAnswer);

      $( '#droppable-' + i ).droppable({
        tolerance: 'pointer',
        accept: '.draggable-letter',
        drop: function( event, ui ) {
          isCorrect(event, ui);
        }
      });

      

      $('#drops-line-' + i).append('<div id="phrase-after-' + i + '" class="phrase-after">' + stageObject[phraseIndex][i].phraseAfter + '</div>');
      /*
      if(( !isAccentedCharacter(answers[i]) && !isHintCharacter(answers[i]) ) || difficulty == 'normal') {
        $( "#droppable-" + i ).droppable({
          tolerance: "pointer",
          accept: ".draggable-letter",
          drop: function( event, ui ) {
            isCorrect(event, ui);
          }
        });
      } else {
        $( "#droppable-" + i )
        .addClass( "correct" )
        .text( answers[i] );
      }
      */
    }
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
//});