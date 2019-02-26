$(function() {
  /********VARIABLES*/
  var bodyParts = ['CABEÇA', 'TRONCO', 'BRAÇOS', 'MÃOS', 'PERNAS', 'PÉS'];
  var bodyPartIndex = 0;
  var alphabeth = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var word = getActualBodyPart().split('');
  var lastPlayedSound = '';
  var audio = document.querySelector('audio');


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



  /********GAME MECHANICS********/
  for (var i=0; i<alphabeth.length; i++) {
    $("#container-letters")
      .append(
        '<div id="draggable-' + i + '" class="draggable-letter">'+
          '<div id="letter-bg-' + i + '" class="letter-bg">' + alphabeth[i] + '</div>'+
        '</div>');
    $( "#draggable-" + i ).attr('data-letter', alphabeth[i]);
    $( "#letter-bg-" + i ).attr('data-letter', alphabeth[i]);
    
    $( "#draggable-" + i ).mousedown(function(event) {
      playSound("audio-"+$(event.target).attr('data-letter'));
      $(this).addClass("dragging");
    });

    $( "#draggable-" + i ).mouseup(function() {
      $(this).removeClass("dragging");
    })

    $( "#draggable-" + i ).draggable({
      scroll: false,
      revert: "invalid",
      revertDuration: 0,
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

  /***********STICKERS***************/
  var audio = document.querySelector('audio');
  for (var i=0; i<bodyParts.length; i++) {
    $("#container-sticker-images")
      .append(
        '<div id="sticker-' + i + '" class="sticker sticker-'+ getBodyPartCode(i) +'"></div>'
      );
    $( "#sticker-" + i ).attr('data-body-part', getBodyPartCode(i));
    $( "#sticker-" + i ).mousedown(function(event) {
      playSound("audio-"+$(event.target).attr('data-body-part'));
      $(this).addClass("dragging");
    });
    $( "#sticker-" + i ).mouseup(function() {
      $(this).removeClass("dragging");
    })
    $( "#sticker-" + i ).draggable({
      scroll: false,
      revert: "invalid",
      revertDuration: 0,
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


    $("#container-sticker-body").append(
      '<div id="droppable-sticker-' + i + '" class="droppable-sticker droppable-sticker-'+ getBodyPartCode(i) +'"></div>'
    );
    $( "#droppable-sticker-" + i ).attr('data-body-part', getBodyPartCode(i));
    $( "#droppable-sticker-" + i ).droppable({
      tolerance: "pointer",
      accept: ".sticker",
      drop: function( event, ui ) {
        isCorrectSticker(event, ui);
      }
    });

    $('#container-parts-list').append(
      '<div id="part-name-' + i + '" class="part-name part-name-'+ getBodyPartCode(i) +'">'+ bodyParts[i] +'</div>'
    );
  }

  /**********INIT****************/
  setBodyPart();

  /**********FUNCTIONS***********/
  function isCorrect(event, ui) {
    var _droppable = $(event.target);
    var _draggable = $(ui.draggable[0]);

    if(_droppable.attr('data-letter') == _draggable.attr('data-letter')){
      $(_draggable).addClass('correct');
      $( _droppable )
      .droppable( "option", "disabled", true )
      .removeClass( "wrong" )
      .addClass( "correct" )
      .text( _droppable.attr('data-letter') );
      playSound("correct");

      fadeOutLetter(_draggable);

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

      fadeOutLetter(_draggable);
    }
  }

  function checkAllCorrect() {
    if ($('.droppable-letter.correct').length >= getActualBodyPart().length) {
      $('.container-mecanica-forca').removeClass('next');
      $('.container-mecanica-forca').addClass('all-correct');
      $("#droppable-sticker-"+bodyPartIndex).css('display', 'block');
      $("#sticker-"+bodyPartIndex).css('display', 'block');
      $("#container-sticker-name").text(getActualBodyPart());
      $("#part-name-"+bodyPartIndex).css('display', 'block');

      setTimeout(function(){
        $('.container-mecanica-forca').css('display', 'none');
      }, 2000);
    }
  }

  function isCorrectSticker(event, ui) {
    var _droppable = $(event.target);
    var _draggable = $(ui.draggable[0]);

    $(_draggable).css('display', 'none');
    $( _droppable )
    .droppable( "option", "disabled", true )
    .addClass( "correct" )
    //.text( _droppable.attr('data-letter') );
    playSound("correct");
    $('.part-name-'+getActualBodyPartCode()).css('opacity', 1);

    nextBodyPart();

    //fadeOutLetter(_draggable);
  }

  function fadeOutLetter(letter) {
    $(letter)
    .draggable( "option", "disabled", true )
    setTimeout(function(){
      resetLetterPosition(letter);
    }, 2000);
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

  function playSound(soundId) {
    if(lastPlayedSound != '') {
      $("#" + lastPlayedSound)[0].pause();
      $("#" + lastPlayedSound)[0].currentTime = 0;
    }

    $("#" + soundId)[0].play();
    lastPlayedSound = soundId;
  }

  function getActualBodyPart() {
    return bodyParts[bodyPartIndex];
  }
  
  function getActualBodyPartCode() {
    return removeAccents(getActualBodyPart()).toLowerCase();
  }

  function getBodyPartCode(i) {
    return removeAccents(bodyParts[i]).toLowerCase();
  }

  function setBodyPart() {
    $('.container-mecanica-forca').removeClass('all-correct');
    $('.container-mecanica-forca').css('display', 'block');
    word = bodyParts[bodyPartIndex].split('');

    $("#container-drops").empty();
    for (var i=0; i<word.length; i++) {
      $("#container-drops").append('<div id="droppable-' + i + '" class="droppable-letter"> </div>')
      $( "#droppable-" + i ).attr('data-letter', word[i]);
  
      if(!isAccentedCharacter(word[i])) {
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

  function isAccentedCharacter (letter) {
    return letter.match(/[áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/);
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
});