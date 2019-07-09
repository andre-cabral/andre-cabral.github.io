//$(function() {
  /********VARIABLES*/
  var draggablesList = [
      {width: 1, height: 1, image: 'mail'},
      {width: 3, height: 1, image: 'box'},
      {width: 1, height: 3, image: 'long'},
      {width: 2, height: 2, image: 'gift'},
      {width: 1, height: 2, image: 'lotmail'},
      {width: 2, height: 1, image: 'pack'},
      {width: 1, height: 1, image: 'postcard'}
  ];
  var droppablesList = ['1x1','2x1','3x1','1x2','2x2','3x2','1x3','2x3','3x3'];
  var freePositions = [
      ['free', 'free', 'free'],
      ['free', 'free', 'free'],
      ['free', 'free', 'free']
  ];

  var clickCenterTimeOut;
  var clickScale = {x: 0, y: 0, centerX: 0, centerY: 0};

  var overValidSpace = false;
  var overGrid = false;

  var draggableSquareWidth = 118;
  var draggableSquareHeight = 118;

  var draggableOnGridTop = -14;
  var draggableOnGridLeft = -11;

  var numberOfObjects = 0;

  watchDroppables();
  initDragDrop();
  
  $('#button-avancar-encomendas').click(function() {
      playSound('button');

      var arrayFreePositions = new Array();
      for(var y=0; y<freePositions.length; y++){
        for(var x=0; x<freePositions[y].length; x++){
          if(freePositions[y][x] != 'free'){
            arrayFreePositions.push(freePositions[y][x]);
          }
        }
      }

      numberOfObjects = arrayFreePositions.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      }).length;

      $('#container-encomendas').css('display', 'none');
      $('#container-tutorial-caminhos').css('display', 'block');
  });

  /********GAME MECHANICS********/
  function initDragDrop() {
    //$('.container-mecanica-dragdrop').css('display', 'block');

    createDraggables(draggablesList);    
    createDroppables(droppablesList);
  }

  function createDraggables(draggables) {
    $('#container-draggables').empty();

    $('#container-draggables')
    .append(
      '<div id="draggable-first" class="draggable-col draggable-col-first">'+
      '</div>'+
      '<div id="draggable-second" class="draggable-col draggable-col-second">'+
      '</div>'
    );

    for (var i=0; i<draggables.length; i++) {
      var col = '#draggable-';

      if (i == 0 || i == 2) {
        col += 'first';
      } else {
        col += 'second';
      }

      $(col)
        .append(
          '<div id="draggable-start-' + i + '" class="draggable-start draggable-drag-'+draggables[i].image+'">'+
            '<div id="draggable-' + i + '" class="draggable-drag draggable-drag-'+draggables[i].image+'"></div>'+
          '</div>'
        );
      $( '#draggable-' + i ).attr('data-draggable', draggables[i].width + 'x' + draggables[i].height );
      $( '#draggable-' + i ).attr('data-codename', draggables[i].image );
      
      $( '#draggable-' + i ).mousedown(function(event) {
        playSound("bubble");
        $(this).addClass("dragging");
      });
  
      $( '#draggable-' + i ).mouseup(function() {
        $(this).removeClass("dragging");
      });
  
      $( '#draggable-' + i ).draggable({
        scroll: false,
        revert: 'invalid',
        //revert: true,
        //revert: 'valid',
        //revert: "invalid",
        revertDuration: 0,
        distance: 0,
        start: function(event, ui) {
          scaleDragStart(event, ui, $(this));
          unuseSpaces(event, ui);
        },
        drag: function(event, ui) {
          var el = document.elementsFromPoint(event.pageX, event.pageY);
          overGrid =  $(el).hasClass('droppable-drop');

          if (!overGrid) {
            $('.droppable-drop').removeClass('drop-fit').removeClass('drop-not-fit');
          }

          scaleDragDrag(event, ui);
        },
        stop: function(event, ui) {
          $(this).removeClass('dragging');

          if(!overValidSpace || !overGrid){
            var startElementId = '#draggable-start-' + $(this).attr('id').replace('draggable-', '');
            var startElement = $(startElementId);
            
            $(this).detach().css({top: 0,left: 0}).appendTo(startElement);
            resetDraggablePosition(event.target);
          }
          $('.droppable-drop').removeClass('drop-fit').removeClass('drop-not-fit');
        }
      });
    }
  }

  function resetBag(){
    $('.draggable-drag').each(function(){
      $(this)
        .detach()
        .css({top: 0,left: 0})
        .appendTo(
          $('#draggable-start-' + $(this).attr('id').replace('draggable-', ''))
        )
    });
    $('.droppable-drop').removeClass('dragging').removeClass('drop-fit').removeClass('drop-not-fit');

    for(var y=0; y<freePositions.length; y++){
      for(var x=0; x<freePositions[y].length; x++){
        freePositions[y][x] = 'free';
      }
    }

    setAvancarEncomendasButton();
  }

  function createDroppables(droppables) {
    $('#container-drops').empty();

    for (var i=0; i<droppables.length; i++) {
      $('#container-drops').append('<div id="droppable-' + i + '" class="droppable-drop drop-'+droppables[i]+'"></div>');

      $( '#droppable-' + i ).attr('data-draggable', droppables[i]);
      $( '#droppable-' + i ).droppable({
        tolerance: 'pointer',
        accept: '.draggable-drag',
        /*
        out: function( event, ui ) {
          //$('.droppable-drop').removeClass('drop-fit').removeClass('drop-not-fit');
        },
        */
        over: function( event, ui ) {
          $('.droppable-drop').removeClass('drop-fit').removeClass('drop-not-fit');
          if(fitPosition(event, ui, 'drop-fit')){
            overValidSpace = true;
          } else {
            overValidSpace = false;
            $(event.target).addClass('drop-not-fit');
          }
        },
				drop: function( event, ui ) {
          if(fitPosition(event, ui)){
            useSpaces(event, ui);
            setDroppablePosition(event, ui, $(this));
          }
				}
      });
    }
  }

  function fitPosition(event, ui, classToAddFit = '') {
    var _droppable = $(event.target);
    var _draggable = $(ui.draggable[0]);

    var objectWidth = parseInt(_draggable.attr('data-draggable').split('x')[0]);
    var objectHeight = parseInt(_draggable.attr('data-draggable').split('x')[1]);

    var targetPositionX = parseInt(_droppable.attr('data-draggable').split('x')[0]);
    var targetPositionY = parseInt(_droppable.attr('data-draggable').split('x')[1]);

    /*
    console.log('objectWidth', objectWidth);
    console.log('targetPositionX', targetPositionX);
    console.log('objectWidth + targetPositionX -1', objectWidth + targetPositionX -1);
    console.log('targetPositionY', targetPositionY);
    console.log('freePositions[targetPositionY-1].length', freePositions[targetPositionY-1].length);
    console.log('objectWidth + targetPositionX -1 <= freePositions[targetPositionY-1].length', objectWidth + targetPositionX -1 <= freePositions[targetPositionY-1].length);
    console.log('objectHeight', objectHeight);
    console.log('targetPositionY', targetPositionY);
    console.log('freePositions.length', freePositions.length);
    console.log('objectHeight + targetPositionY -1', objectHeight + targetPositionY -1);
    console.log('objectHeight + targetPositionY -1 <= freePositions.length', objectHeight + targetPositionY -1 <= freePositions.length);
    console.log('objectWidth + targetPositionX -1 <= freePositions[targetPositionY-1].length && objectHeight + targetPositionY -1 <= freePositions.length', objectWidth + targetPositionX -1 <= freePositions[targetPositionY-1].length && objectHeight + targetPositionY -1 <= freePositions.length);
    */

    if(objectWidth + targetPositionX -1 <= freePositions[targetPositionY-1].length &&
      objectHeight + targetPositionY -1 <= freePositions.length) {

        var canFit = true;
        var fitObjects = new Array();
        for(var y=targetPositionY-1; y<objectHeight + targetPositionY -1; y++){
          for(var x=targetPositionX-1; x<objectWidth + targetPositionX -1; x++){
            if(freePositions[y][x] != 'free'){
              canFit = false
            } else {
              fitObjects.push((x+1)+'x'+(y+1));
            }
          }
        }

        if(canFit){
          if(classToAddFit != '') {
            for(var i=0; i<fitObjects.length; i++){
              $('.drop-'+fitObjects[i]).addClass(classToAddFit);
            }
          }
          return true;
        }
    }

    return false;
  }

  function setDroppablePosition(event, ui, element) {
    $(ui.draggable).detach().css({top: draggableOnGridTop,left: draggableOnGridLeft}).appendTo(element);
  }

  function useSpaces(event, ui) {
    var _droppable = $(event.target);
    var _draggable = $(ui.draggable[0]);

    var objectWidth = parseInt(_draggable.attr('data-draggable').split('x')[0]);
    var objectHeight = parseInt(_draggable.attr('data-draggable').split('x')[1]);
    var objectCodename = _draggable.attr('data-codename');

    var targetPositionX = parseInt(_droppable.attr('data-draggable').split('x')[0]);
    var targetPositionY = parseInt(_droppable.attr('data-draggable').split('x')[1]);

    

    for(var y=targetPositionY-1; y<objectHeight + targetPositionY -1; y++){
      for(var x=targetPositionX-1; x<objectWidth + targetPositionX -1; x++){
        freePositions[y][x] = objectCodename;
      }
    }

    setAvancarEncomendasButton();
  }

  function unuseSpaces(event, ui) {
    var _draggable = $(event.target);
    var objectCodename = _draggable.attr('data-codename');

    for(var y=0; y<freePositions.length; y++){
      for(var x=0; x<freePositions[y].length; x++){
        if(freePositions[y][x] == objectCodename){
          freePositions[y][x] = 'free';
        }
      }
    }

    setAvancarEncomendasButton();
  }

  function setAvancarEncomendasButton () {
    var hasUsedSpace = false;

    for(var y=0; y<freePositions.length; y++){
      for(var x=0; x<freePositions[y].length; x++){
        if(freePositions[y][x] != 'free'){
          hasUsedSpace = true;
        }
      }
    }
  
    $('#button-avancar-encomendas').attr('disabled', !hasUsedSpace);    
  }

  function changeCorrectClasses(_draggable, _droppable, classToAdd) {
    $(_draggable).addClass(classToAdd);
      
    $( _droppable )
    //.droppable( 'option', 'disabled', true )
    .removeClass('wrong')
    .removeClass( 'correct' )
    .addClass(classToAdd);
    //playSound(classToAdd);
    
    //$(_draggable).draggable( 'option', 'disabled', true );
  }

  function resetDraggablePosition(draggable) {
    $(draggable)
    .removeClass( 'dragging' )
    .css('top', 0)
    .css('left', 0);
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


  /******* SCALE FIX *********/
  function scaleDragStart(event, ui, element) {
    var zoom = getScale();
    var original = ui.originalPosition;
    
    clickScale.x = event.clientX;
    clickScale.y = event.clientY;
    clickScale.centerX = event.clientX - ui.offset.left - draggableSquareWidth*zoom/2;
    clickScale.centerY = event.clientY - ui.offset.top - draggableSquareHeight*zoom/2;

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
//});