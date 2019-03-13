$(function() {
  /********VARIABLES*/
  var bodyList = ['CABEÇA', 'TRONCO', 'BRAÇOS', 'MÃOS', 'PERNAS', 'PÉS'];
  var headList = ['CABELO', 'OLHOS', 'ORELHAS', 'NARIZ', 'BOCA', 'PESCOÇO'];

  //the slice was made to create a copy of the arrays, so we still have the original arrays without randomly sorted
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

  var skin = '';
  var boca = 1,
      bocaMax = 5,
      cabelo = 1,
      cabeloMax = 12,
      nariz = 1,
      narizMax = 4,
      olhos = 1,
      olhosMax = 6,
      orelhas = 1,
      orelhasMax = 3;

  var acessorio = 1,
      acessorioMax = 6,
      tronco = 1,
      troncoMax = 8,
      pernas = 1,
      pernasMax = 8,
      pes = 1,
      pesMax = 4;

  var explainedBodyCustom = false;

  var clickCenterTimeOut;
  var clickScale = {
      x: 0,
      y: 0,
      centerX: 0,
      centerY: 0
  };
  watchDroppables();

  function restart() {
    bodyParts = [ 
      ...bodyList.slice().sort(arrayRandomSort),
      ...headList.slice().sort(arrayRandomSort)
    ];
    bodyPartIndex = 0;
    word = getActualBodyPart().split('');
    lastPlayedSound = '';
  
    boca = 1;
    bocaMax = 5;
    cabelo = 1;
    cabeloMax = 12;
    nariz = 1;
    narizMax = 4;
    olhos = 1;
    olhosMax = 6;
    orelhas = 1;
    orelhasMax = 3;

    acessorio = 1;
    acessorioMax = 6;
    tronco = 1;
    troncoMax = 8;
    pernas = 1;
    pernasMax = 8;
    pes = 1;
    pesMax = 4;

    explainedBodyCustom = false;

    acessorio = 1;
    tronco = 5;
    pernas = 1;
    pes = 4;
    changeBodyPart('acessorio', acessorio);
    changeBodyPart('tronco', tronco);
    changeBodyPart('pernas', pernas);
    changeBodyPart('pes', pes);

    $('#container-mecanica-custom-body').removeClass('printing');
    $('*').removeClass('all-correct');
    $('*').removeClass('next');
    $('.container-splash-screen').css('display', 'block');
    $('#container-mecanica-custom-body').css('display', 'none');

    $('#container-sticker-body').css('display', 'block');
    $('#container-sticker-head').css('display', 'none');

/*
    $( '.droppable-sticker' )
      .droppable( "option", "disabled", false )
      .addClass( "correct" );
    $('.part-name').css('opacity', 0);
    $('.droppable-sticker-cabelo-back').css('display', 'none').css('opacity', 0);
*/
    $('#container-parts-list').empty();
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

    $("#container-sticker-images").empty().append('<div id="sticker-helper"></div>');
    $("#container-sticker-body").empty();
    $("#container-sticker-head").empty().append("<div class='sticker-head-border'></div><div class='droppable-sticker-cabelo-back droppable-sticker droppable-sticker-head droppable-sticker-girl'></div>");
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
        distance: 0,
        start: function(event, ui) {
          scaleDragStart(event, ui, $(this));
        },
        drag: function(event, ui) {
          scaleDragDrag(event, ui)
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

    selectSkin('c');
    selectGender(gender, false);

    $('#container-letters')
    .removeClass('letters-total-2')
    .removeClass('letters-total-3')
    .removeClass('letters-total-4')
    .removeClass('letters-total-5')
    .removeClass('letters-total-6')
    .removeClass('letters-total-7');
  }


  /************* MENU **************/
  $('#menu-button-comecar').click(function(){
    $('.container-splash-screen').css('display', 'none');
    $('.container-menu').css('display', 'block');
    playSound('comecar');
  });
  $('#menu-button-girl').click(function(){
    selectGender('girl');
    selectSkin('c');
    boca=3;
    cabelo=6;
    nariz=1;
    olhos=1;
    orelhas=2;
    changeHeadPart('boca', boca);
    changeHeadPart('cabelo', cabelo);
    changeHeadPart('cabelo-front', cabelo);
    changeHeadPart('cabelo-back', cabelo);
    changeHeadPart('nariz', nariz);
    changeHeadPart('olhos', olhos);
    changeHeadPart('orelhas', orelhas);
  });
  $('#menu-button-boy').click(function(){
    selectGender('boy');
    selectSkin('c');
    boca=2;
    cabelo=3;
    nariz=1;
    olhos=1;
    orelhas=2;
    changeHeadPart('boca', boca);
    changeHeadPart('cabelo', cabelo);
    changeHeadPart('cabelo-front', cabelo);
    changeHeadPart('cabelo-back', cabelo);
    changeHeadPart('nariz', nariz);
    changeHeadPart('olhos', olhos);
    changeHeadPart('orelhas', orelhas);
  });
  $('#menu-button-facil').click(function(){
    selectDifficulty('facil');
  });
  $('#menu-button-normal').click(function(){
    selectDifficulty('normal');
  });

  $('#menu-button-avancar').click(function() {
    $('.container-menu').css('display', 'none');
    $('.container-mecanica-forca').css('display', 'block');
    playSound('avancar');
    setTimeout(function(){
      playSound('intro');
    }, 3000);

    //setBodyPart contains the difficulty == 'facil' code
    setBodyPart();
    if (difficulty == 'normal') {
      createLetters(alphabeth);
    }
  });

  function selectGender(genderSelected, playAudio = true) {
    gender = genderSelected;
    $('#menu-button-girl').removeClass('menu-button-pressed');
    $('#menu-button-boy').removeClass('menu-button-pressed');
    $('#menu-button-'+gender).addClass('menu-button-pressed');
    if (playAudio) {
      playSound(gender);
    }

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

    $('#body-display-container').removeClass('body-display-container-girl').removeClass('body-display-container-boy');
    $('#body-display-container').addClass('body-display-container-'+gender);

    checkAvancarButton();
  }
  function selectDifficulty(difficultySelected) {
    difficulty = difficultySelected;
    $('#menu-button-facil').removeClass('menu-button-pressed');
    $('#menu-button-normal').removeClass('menu-button-pressed');
    $('#menu-button-'+difficulty).addClass('menu-button-pressed');
    playSound(difficulty);

    $('.container-mecanica-forca').removeClass('container-mecanica-forca-facil').removeClass('container-mecanica-forca-normal');
    $('.container-mecanica-forca').addClass('container-mecanica-forca-'+difficulty);
    checkAvancarButton();
  }

  function checkAvancarButton() {
    if (difficulty != '' && gender != '') {
      
      $('#menu-button-avancar').attr('disabled', false);
    }
  }

  /********GAME MECHANICS********/
  function createLetters(alphabeth) {
    $("#container-letters").empty()
    if (difficulty == 'facil') {
      $("#container-letters")
      .removeClass('letters-total-2')
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
        if($(this).hasClass('') ||
          $(this).hasClass('half-correct') || 
          $(this).hasClass('wrong') ) {
            $(this).css('top', 0)
        }
      })
  
      $( "#draggable-" + i ).draggable({
        scroll: false,
        revert: "invalid",
        revertDuration: 500,
        distance: 0,
        start: function(event, ui) {
          scaleDragStart(event, ui, $(this));
        },
        drag: function(event, ui) {
          scaleDragDrag(event, ui)
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
      $("#sticker-helper").removeClass().addClass('sticker-helper-'+getActualBodyPartCode());
      $("#container-sticker-name").text(getActualBodyPart());
      playSound('all-correct');

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
      distance: 0,
      start: function(event, ui) {
        scaleDragStart(event, ui, $(this));
      },
      drag: function(event, ui) {
        scaleDragDrag(event, ui)
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
    playSound(getActualBodyPartCode());
    $('#part-name-'+getActualBodyPartCode()).css('opacity', 1);

    if (getActualBodyPartCode() == 'cabelo') {
      $('.droppable-sticker-cabelo-back').css('display', 'block').css('opacity', 1);
    }

    nextBodyPart();
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
      $("#container-drops").append('<div id="droppable-' + i + '" class="droppable-letter"><div class="letter-underline"></div></div>')
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
      /* END GAME CODE BEGIN */
      setTimeout(function(){
        $('.container-mecanica-sticker').addClass('all-correct');
        $('#container-mecanica-custom-head').css('display', 'flex').addClass('next');

        setTimeout(function(){
          playSound('custom-head');
        }, 1500);
      }, 3000);
      /* END GAME CODE END*/
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

  /************* HEAD CUSTOM **************/
  $('#skin-button-a').click(function(){
    selectSkin('a');
  });
  $('#skin-button-b').click(function(){
    selectSkin('b');
  });
  $('#skin-button-c').click(function(){
    selectSkin('c');
  });
  $('#skin-button-d').click(function(){
    selectSkin('d');
  });
  $('#skin-button-e').click(function(){
    selectSkin('e');
  });

  $('#select-cabelo-prev').click(function(){
    prevCabelo();
  });
  $('#select-cabelo-next').click(function(){
    nextCabelo();
  });
  $('#select-olhos-prev').click(function(){
    prevOlhos();
  });
  $('#select-olhos-next').click(function(){
    nextOlhos();
  });
  $('#select-orelhas-prev').click(function(){
    prevOrelhas();
  });
  $('#select-orelhas-next').click(function(){
    nextOrelhas();
  });
  $('#select-nariz-prev').click(function(){
    prevNariz();
  });
  $('#select-nariz-next').click(function(){
    nextNariz();
  });
  $('#select-boca-prev').click(function(){
    prevBoca();
  });
  $('#select-boca-next').click(function(){
    nextBoca();
  });

  $('#custom-head-button-avancar').click(function() {
    $('#container-mecanica-custom-head').css('display', 'none').css('opacity', 0);
    $('#container-mecanica-custom-body').css('display', 'flex');

    if(!explainedBodyCustom) {
      explainedBodyCustom = true;
      playSound('custom-body');
    }
  });

  $('.menu-button-android').click(function() {
    $('#print-select').css('display', 'none');
    $('#print-android').css('display', 'block');
  });
  $('.menu-button-windows').click(function() {
    $('#print-select').css('display', 'none');
    $('#print-windows').css('display', 'block');
  });
  $('.menu-button-ios').click(function() {
    $('#print-select').css('display', 'none');
    $('#print-ios').css('display', 'block');
  });

  $('.menu-button-close-select').click(function() {
    $('#print-android').css('display', 'none');
    $('#print-windows').css('display', 'none');
    $('#print-ios').css('display', 'none');
    $('#print-ui').css('display', 'block');
  });


  function selectSkin(skinSelected) {
    skin = skinSelected;
    $('.skin-button').removeClass('skin-button-pressed');
    $('#skin-button-'+skin).addClass('skin-button-pressed');
    
    $('#head-display-container')
    .removeClass('head-display-container-a')
    .removeClass('head-display-container-b')
    .removeClass('head-display-container-c')
    .removeClass('head-display-container-d')
    .removeClass('head-display-container-e');

    $('#body-display-container')
    .removeClass('body-display-container-a')
    .removeClass('body-display-container-b')
    .removeClass('body-display-container-c')
    .removeClass('body-display-container-d')
    .removeClass('body-display-container-e');

    $('#head-display-container').addClass('head-display-container-'+skin);
    $('#body-display-container').addClass('body-display-container-'+skin);
  }

  function changeHeadPart(partName, newIndex) {
    for(var i=1; i<=12; i++) {
      $('#head-display-'+partName)
      .removeClass('head-display-'+partName+'-'+i);

      $('#body-display-'+partName)
      .removeClass('body-display-'+partName+'-'+i);

      $('#print-'+partName)
      .removeClass('print-item-'+partName+'-'+i);
    }
    $('#head-display-'+partName).addClass('head-display-'+partName+'-'+newIndex);
    $('#body-display-'+partName).addClass('body-display-'+partName+'-'+newIndex);
    $('#print-'+partName).addClass('print-item-'+partName+'-'+newIndex);
    $('#select-index-'+partName).text(newIndex);
  }

  function nextBoca() {
    if (boca >= bocaMax) {
      boca = 1;
    } else {
      if (boca < bocaMax) {
        boca ++;
      }
    }
    changeHeadPart('boca', boca);
  }
  function prevBoca() {
    if (boca <= 1) {
      boca = bocaMax;
    } else {
      if (boca > 1) {
        boca --;
      }
    }
    changeHeadPart('boca', boca);
  }

  function nextCabelo() {
    if (cabelo >= cabeloMax) {
      cabelo = 1;
    } else {
      if (cabelo < cabeloMax) {
        cabelo ++;
      }
    }
    changeHeadPart('cabelo', cabelo);
    changeHeadPart('cabelo-front', cabelo);
    changeHeadPart('cabelo-back', cabelo);
  }
  function prevCabelo() {
    if (cabelo <= 1) {
      cabelo = cabeloMax;
    } else {
      if (cabelo > 1) {
        cabelo --;
      }
    }
    changeHeadPart('cabelo', cabelo);
    changeHeadPart('cabelo-front', cabelo);
    changeHeadPart('cabelo-back', cabelo);
  }

  function nextNariz() {
    if (nariz >= narizMax) {
      nariz = 1;
    } else {
      if (nariz < narizMax) {
        nariz ++;
      }
    }
    changeHeadPart('nariz', nariz);
  }
  function prevNariz() {
    if (nariz <= 1) {
      nariz = narizMax;
    } else {
      if (nariz > 1) {
        nariz --;
      }
    }
    changeHeadPart('nariz', nariz);
  }

  function nextOlhos() {
    if (olhos >= olhosMax) {
      olhos = 1;
    } else {
      if (olhos < olhosMax) {
        olhos ++;
      }
    }
    changeHeadPart('olhos', olhos);
  }
  function prevOlhos() {
    if (olhos <= 1) {
      olhos = olhosMax;
    } else {
      if (olhos > 1) {
        olhos --;
      }
    }
    changeHeadPart('olhos', olhos);
  }

  function nextOrelhas() {
    if (orelhas >= orelhasMax) {
      orelhas = 1;
    } else {
      if (orelhas < orelhasMax) {
        orelhas ++;
      }
    }
    changeHeadPart('orelhas', orelhas);
  }
  function prevOrelhas() {
    if (orelhas <= 1) {
      orelhas = orelhasMax;
    } else {
      if (orelhas > 1) {
        orelhas --;
      }
    }
    changeHeadPart('orelhas', orelhas);
  }


  /************* BODY CUSTOM **********/
  $('#select-acessorio-prev').click(function(){
    prevAcessorio();
  });
  $('#select-acessorio-next').click(function(){
    nextAcessorio();
  });
  $('#select-tronco-prev').click(function(){
    prevTronco();
  });
  $('#select-tronco-next').click(function(){
    nextTronco();
  });
  $('#select-pernas-prev').click(function(){
    prevPernas();
  });
  $('#select-pernas-next').click(function(){
    nextPernas();
  });
  $('#select-pes-prev').click(function(){
    prevPes();
  });
  $('#select-pes-next').click(function(){
    nextPes();
  });

  $('#custom-body-button-voltar').click(function() {
    $('#container-mecanica-custom-head').removeClass('next').css('display', 'flex').css('opacity', 1);
    $('#container-mecanica-custom-body').css('display', 'none');
  });

  $('#custom-body-button-imprimir').click(function() {
    $('#container-mecanica-custom-body').addClass('printing');
  });

  $('#print-button-inicio').click(function() {
    restart();
  });

  acessorio = 1;
  tronco = 5;
  pernas = 1;
  pes = 4;
  changeBodyPart('acessorio', acessorio);
  changeBodyPart('tronco', tronco);
  changeBodyPart('pernas', pernas);
  changeBodyPart('pes', pes);

  function changeBodyPart(partName, newIndex) {
    for(var i=1; i<=12; i++) {
      $('#body-display-'+partName)
      .removeClass('body-display-'+partName+'-'+i)

      $('#print-'+partName)
      .removeClass('print-item-'+partName+'-'+i);
    }
    $('#body-display-'+partName).addClass('body-display-'+partName+'-'+newIndex);
    $('#print-'+partName).addClass('print-item-'+partName+'-'+newIndex);
    $('#select-index-'+partName).text(newIndex);
  }

  function nextAcessorio() {
    if (acessorio >= acessorioMax) {
      acessorio = 1;
    } else {
      if (acessorio < acessorioMax) {
        acessorio ++;
      }
    }
    changeBodyPart('acessorio', acessorio);
    changeBodyPart('acessorio-back', acessorio);
  }
  function prevAcessorio() {
    if (acessorio <= 1) {
      acessorio = acessorioMax;
    } else {
      if (acessorio > 1) {
        acessorio --;
      }
    }
    changeBodyPart('acessorio', acessorio);
    changeBodyPart('acessorio-back', acessorio);
  }

  function nextTronco() {
    if (tronco >= troncoMax) {
      tronco = 1;
    } else {
      if (tronco < troncoMax) {
        tronco ++;
      }
    }
    changeBodyPart('tronco', tronco);
  }
  function prevTronco() {
    if (tronco <= 1) {
      tronco = troncoMax;
    } else {
      if (tronco > 1) {
        tronco --;
      }
    }
    changeBodyPart('tronco', tronco);
  }

  function nextPernas() {
    if (pernas >= pernasMax) {
      pernas = 1;
    } else {
      if (pernas < pernasMax) {
        pernas ++;
      }
    }
    changeBodyPart('pernas', pernas);
  }
  function prevPernas() {
    if (pernas <= 1) {
      pernas = pernasMax;
    } else {
      if (pernas > 1) {
        pernas --;
      }
    }
    changeBodyPart('pernas', pernas);
  }

  function nextPes() {
    if (pes >= pesMax) {
      pes = 1;
    } else {
      if (pes < pesMax) {
        pes ++;
      }
    }
    changeBodyPart('pes', pes);
  }
  function prevPes() {
    if (pes <= 1) {
      pes = pesMax;
    } else {
      if (pes > 1) {
        pes --;
      }
    }
    changeBodyPart('pes', pes);
  }

  /**********FUNCTIONS***********/
  function playSound(soundId) {
    if(lastPlayedSound != '') {
      $("#audio-" + lastPlayedSound)[0].pause();
      $("#audio-" + lastPlayedSound)[0].currentTime = 0;
    }

    $("#audio-" + soundId)[0].play();
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