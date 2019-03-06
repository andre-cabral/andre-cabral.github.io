$(function() {
  /********VARIABLES*/
  var bodyList = ['CABEÇA', 'TRONCO', 'BRAÇOS', 'MÃOS', 'PERNAS', 'PÉS'];
  var headList = ['CABELO', 'OLHOS', 'ORELHAS', 'NARIZ', 'BOCA', 'PESCOÇO'];

  //the slice was made to create a copy of the arrays, so the original arrays wasn't randomly sorted
  var bodyParts = [ 
    ...bodyList.slice().sort(arrayRandomSort),
    ...headList.slice().sort(arrayRandomSort)
  ];
  var bodyPartIndex = 0;
  var alphabeth = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var word = getActualBodyPart().split('');
  var lastPlayedSound = '';
  var audio = document.querySelector('audio');
  var gender = '';
  var difficulty = '';


  //var percentages = document.querySelectorAll('.loading-audio');

  /*
  function loop() {
    var buffered = audio.buffered;
    var loaded;
    //var played;

    if (buffered.length) {
      loaded = 100 * buffered.end(0) / audio.duration;
      //played = 100 * audio.currentTime / audio.duration;
      percentages[0].innerHTML = loaded.toFixed(2);
      //percentages[1].innerHTML = played.toFixed(2);
    }

    if( !buffered.length || loaded.toFixed(2) < 100) {
      setTimeout(loop, 50);
    }
  }

  loop();
*/

  /************* MENU **************/
  $('#menu-button-comecar').click(function(){
    $('.container-splash-screen').css('display', 'none');
  });
  $('#menu-button-girl').click(function(){
    selectGender('girl');
  });
  $('#menu-button-boy').click(function(){
    selectGender('boy');
  });
  $('#menu-button-facil').click(function(){
    selectDifficulty('facil');
  });
  $('#menu-button-normal').click(function(){
    selectDifficulty('normal');
  });

  function selectGender(genderSelected) {
    gender = genderSelected;
    $('#menu-button-girl').removeClass('menu-button-pressed');
    $('#menu-button-boy').removeClass('menu-button-pressed');
    $('#menu-button-'+gender).addClass('menu-button-pressed');

    $('.sticker-body').removeClass('sticker-body-girl').removeClass('sticker-body-boy');
    $('.sticker-head').removeClass('sticker-head-girl').removeClass('sticker-head-boy');
    $('.container-sticker-body').removeClass('container-sticker-body-girl').removeClass('container-sticker-body-boy');
    $('.container-sticker-head').removeClass('container-sticker-head-girl').removeClass('container-sticker-head-boy');
    $('.droppable-sticker').removeClass('droppable-sticker-girl').removeClass('droppable-sticker-boy');

    $('.sticker-body').addClass('sticker-body-'+gender);
    $('.sticker-head').addClass('sticker-head-'+gender);
    $('.container-sticker-body').addClass('container-sticker-body-'+gender);
    $('.container-sticker-head').addClass('container-sticker-head-'+gender);
    $('.droppable-sticker').addClass('droppable-sticker-'+gender);
    checkAvancarButton();
  }
  function selectDifficulty(difficultySelected) {
    difficulty = difficultySelected;
    $('#menu-button-facil').removeClass('menu-button-pressed');
    $('#menu-button-normal').removeClass('menu-button-pressed');
    $('#menu-button-'+difficulty).addClass('menu-button-pressed');

    $('.container-mecanica-forca').removeClass('container-mecanica-forca-facil').removeClass('container-mecanica-forca-normal');
    $('.container-mecanica-forca').addClass('container-mecanica-forca-'+difficulty);
    checkAvancarButton();
  }

  function checkAvancarButton() {
    if (difficulty != '' && gender != '') {
      $('#menu-button-avancar').attr('disabled', false);
      $('#menu-button-avancar').click(function() {
        $('.container-menu').css('display', 'none');
        $('.container-mecanica-forca').css('display', 'block');

        //setBodyPart contains the difficulty == 'facil' code
        setBodyPart();
        if (difficulty == 'normal') {
          createLetters(alphabeth);
        }
      });
    }
  }

  /********GAME MECHANICS********/
  function createLetters(alphabeth) {
    $("#container-letters").empty()
    if (difficulty == 'facil') {
      $("#container-letters").empty()
      .removeClass('letters-total-3')
      .removeClass('letters-total-4')
      .removeClass('letters-total-5')
      .removeClass('letters-total-6')
      .removeClass('letters-total-7')
      .addClass('letters-total-'+alphabeth.length);
    }

    for (var i=0; i<alphabeth.length; i++) {
      $("#container-letters")
        .append(
          '<div id="draggable-' + i + '" class="draggable-letter">'+
            '<div id="letter-bg-' + i + '" class="letter-bg">' + alphabeth[i] + '</div>'+
          '</div>');
      $( "#draggable-" + i ).attr('data-letter', alphabeth[i]);
      $( "#letter-bg-" + i ).attr('data-letter', alphabeth[i]);
      
      $( "#draggable-" + i ).mousedown(function(event) {
        playSound("bubble");
        $(this).addClass("dragging");
      });
  
      $( "#draggable-" + i ).mouseup(function() {
        $(this).removeClass("dragging");
      })
  
      $( "#draggable-" + i ).draggable({
        scroll: false,
        revert: "invalid",
        revertDuration: 500,
        start: function() {
          /**/
        },
        drag: function() {
          /**/
        },
        stop: function(event, ui) {
          $(this).removeClass("dragging");
        }
      });
    }
  }

  function isCorrect(event, ui) {
    var _droppable = $(event.target);
    var _draggable = $(ui.draggable[0]);

    if(removeAccents(_droppable.attr('data-letter')) == _draggable.attr('data-letter')) {
      $(_draggable).addClass('correct');
      $( _droppable )
      .droppable( "option", "disabled", true )
      .removeClass( "wrong" )
      .addClass( "correct" )
      .text( _droppable.attr('data-letter') );
      playSound("correct");

      fadeOutLetter(_draggable, true);

      checkAllCorrect();
    } else {
      if (word.indexOf(_draggable.attr('data-letter')) > -1) {
        $(_draggable).addClass('half-correct');
      } else {
        $(_draggable).addClass('wrong');
      }
      
      $( _droppable )
      .addClass( "wrong" )
      playSound("error");

      fadeOutLetter(_draggable, false);
    }
  }

  function checkAllCorrect() {
    if ($('.droppable-letter.correct').length >= getActualBodyPart().length) {
      $('.container-mecanica-forca').removeClass('next');
      $('.container-mecanica-forca').addClass('all-correct');
      $("#droppable-sticker-"+bodyPartIndex).css('display', 'block');
      $("#sticker-"+bodyPartIndex).css('display', 'block');
      $("#container-sticker-name").text(getActualBodyPart());

      setTimeout(function(){
        $('.container-mecanica-forca').css('display', 'none');
      }, 2000);
    }
  }

  function fadeOutLetter(letter, isCorrect) {
    $(letter).draggable( "option", "disabled", true );
    if(difficulty == 'facil' && isCorrect) {
      setTimeout(function(){
        $(letter).css('visibility', 'hidden');
      }, 2000);
    } else {
      setTimeout(function(){
        resetLetterPosition(letter);
      }, 2000);
    }
  }

  function resetLetterPosition(letter) {
    $(letter)
    .draggable( "option", "disabled", false )
    .removeClass( "dragging" )
    .removeClass( "wrong" )
    .removeClass( "half-correct" )
    .removeClass( "correct" )
    .css("top", 0)
    .css("left", 0);
  }
  

  /***********STICKERS***************/
  for ( var i=0; i<bodyList.length; i++) {
    $('#container-parts-list').append(
      '<div id="part-name-' + getBodyListCode(i) + '" class="part-name part-body part-name-'+ getBodyListCode(i) +'">'+bodyList[i]+'</div>'
    );
  }
  for ( var i=0; i<headList.length; i++) {
    $('#container-parts-list').append(
      '<div id="part-name-' + getHeadListCode(i) + '" class="part-name part-head part-name-'+ getHeadListCode(i) +'">'+headList[i]+'</div>'
    );
  }
  for (var i=0; i<bodyParts.length; i++) {
    if( i< bodyList.length ) {
      $("#container-sticker-images").append(
        '<div id="sticker-' + i + '" class="sticker sticker-body sticker-'+ getBodyPartCode(i) +'"></div>'
      );
    } else {
      $("#container-sticker-images").append(
        '<div id="sticker-' + i + '" class="sticker sticker-head sticker-'+ getBodyPartCode(i) +'"></div>'
      );
    }
    $( "#sticker-" + i ).attr('data-body-part', getBodyPartCode(i));
    $( "#sticker-" + i ).mousedown(function(event) {
      playSound("bubble");
      $(this).addClass("dragging");
    });
    $( "#sticker-" + i ).mouseup(function() {
      $(this).removeClass("dragging");
    })
    $( "#sticker-" + i ).draggable({
      scroll: false,
      revert: "invalid",
      revertDuration: 500,
      start: function() {
        /**/
      },
      drag: function() {
        /**/
      },
      stop: function(event, ui) {
        $(this).removeClass("dragging");
      }
    });

    if( i < bodyList.length ){
      $("#container-sticker-body").append(
        '<div id="droppable-sticker-' + i + '" class="droppable-sticker droppable-sticker-'+ getBodyPartCode(i) +'"></div>'
      );
    } else {
      $("#container-sticker-head").append(
        '<div id="droppable-sticker-' + i + '" class="droppable-sticker droppable-sticker-head droppable-sticker-'+ getBodyPartCode(i) +'"></div>'
      );
    }
    $( "#droppable-sticker-" + i ).attr('data-body-part', getBodyPartCode(i));
    $( "#droppable-sticker-" + i ).droppable({
      tolerance: "pointer",
      accept: ".sticker",
      drop: function( event, ui ) {
        isCorrectSticker(event, ui);
      }
    });
  }
  $('.sticker-cabelo').append('<div class="sticker-cabelo-front sticker sticker-head sticker-head-girl"></div>');
  $('.sticker-cabelo').append('<div class="sticker-cabelo-back sticker sticker-head sticker-head-girl"></div>');

  function isCorrectSticker(event, ui) {
    var _droppable = $(event.target);
    var _draggable = $(ui.draggable[0]);

    $(_draggable).css('display', 'none');
    $( _droppable )
    .droppable( "option", "disabled", true )
    .addClass( "correct" )
    //.text( _droppable.attr('data-letter') );
    playSound("correct");
    $('#part-name-'+getActualBodyPartCode()).css('opacity', 1);

    if (getActualBodyPartCode() == 'cabelo') {
      $('.droppable-sticker-cabelo-back').css('display', 'block').css('opacity', 1);
    }

    nextBodyPart();

    //fadeOutLetter(_draggable);
  }


  /**********GAME WORDS NAVIGATION**********/
  function getActualBodyPart() {
    return bodyParts[bodyPartIndex];
  }
  function getActualBodyPartCode() {
    return removeAccents(getActualBodyPart()).toLowerCase();
  }
  function getBodyPartCode(i) {
    return removeAccents(bodyParts[i]).toLowerCase();
  }
  function getBodyListCode(i) {
    return removeAccents(bodyList[i]).toLowerCase();
  }
  function getHeadListCode(i) {
    return removeAccents(headList[i]).toLowerCase();
  }
  function getBodyPartCode(i) {
    return removeAccents(bodyParts[i]).toLowerCase();
  }
  function setBodyPart() {
    if(bodyPartIndex == bodyList.length) {
      setTimeout(function(){
        $('.part-body').addClass('all-correct');
        setTimeout(function(){
          $('.part-body').css('display', 'none');
          $('.part-head').css('display', 'block');
        }, 3000);
      }, 2000);
    }

    $('.container-mecanica-forca').removeClass('all-correct');
    $('.container-mecanica-forca').css('display', 'block');
    word = bodyParts[bodyPartIndex].split('');

    //checkAvancarButton contains the difficulty == 'normal' code
    if (difficulty == 'facil') {
      createLetters(
        word.filter(function(letter) {
          return !isAccentedCharacter(letter) & !isHintCharacter(letter);
        }).sort(arrayRandomSort)
      );
    }

    $("#container-drops").empty();
    for (var i=0; i<word.length; i++) {
      $("#container-drops").append('<div id="droppable-' + i + '" class="droppable-letter"> </div>')
      $( "#droppable-" + i ).attr('data-letter', word[i]);
  
      if(( !isAccentedCharacter(word[i]) && !isHintCharacter(word[i]) ) || difficulty == 'normal') {
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
        .text( word[i] );
      }
    }
  }
  function nextBodyPart() {
    bodyPartIndex ++;
    if (bodyPartIndex < bodyParts.length) {
      $('.container-mecanica-forca').addClass('next');
      setBodyPart();
    } else {
      /* END GAME HERE */
    }
  }


  /**********FUNCTIONS***********/
  function playSound(soundId) {
    if(lastPlayedSound != '') {
      $("#" + lastPlayedSound)[0].pause();
      $("#" + lastPlayedSound)[0].currentTime = 0;
    }

    $("#" + soundId)[0].play();
    lastPlayedSound = soundId;
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
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
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
});