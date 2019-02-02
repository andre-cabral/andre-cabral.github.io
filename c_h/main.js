$(function() {
  var alphabeth = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var word = ['C', 'A', 'B', 'E', 'Ç', 'A'];
  var lastPlayedSound = '';

  var audio = document.querySelector('audio');
  var percentages = document.querySelectorAll('.loading-audio');

  function loop() {
    var buffered = audio.buffered;
    var loaded;
/*    var played;*/

    if (buffered.length) {
      loaded = 100 * buffered.end(0) / audio.duration;
      /*played = 100 * audio.currentTime / audio.duration;*/
      percentages[0].innerHTML = loaded.toFixed(2);
/*      percentages[1].innerHTML = played.toFixed(2);*/
    }

    if( !buffered.length || loaded.toFixed(2) < 100) {
      setTimeout(loop, 50);
    }
  }

  loop();

  for (var i=0; i<alphabeth.length; i++) {
    $("#container-letters")
      .append(
        '<div id="draggable-' + i + '" class="draggable-letter">'+
          '<div class="letter-bg">' + alphabeth[i] + '</div>'+
        '</div>');
    $( "#draggable-" + i ).attr('data-letter', alphabeth[i]);
    
    $( "#draggable-" + i ).mousedown(function() {
      playSound("audio-"+alphabeth[i]);
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
  for (var i=0; i<word.length; i++) {
    $("#container-drops").append('<div id="droppable-' + i + '" class="droppable-letter"> </div>')
    $( "#droppable-" + i ).attr('data-letter', word[i]);

    if(!isAccentedCharacter(word[i])) {
      $( "#droppable-" + i ).droppable({
        tolerance: "pointer",
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

  function isAccentedCharacter (letter) {
    return letter.match(/[áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/);
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
});