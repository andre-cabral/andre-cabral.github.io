//$(function() {
  
  /********VARIABLES*/
  var lastPlayedSound = '',
      audio = document.querySelector('audio'),
      patterns = {a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', none: ''},
      gridTypes = {triangle: 'triangle', square: 'square', hex: 'hex'},
      gridTypesTranslation = {triangle: 'triangulo', square: 'quadrado', hex: 'hexagono'},
      gridSelected = 'hex',
      patternSelected = '',
      selectedId = '',
      selectedSelector = '',
      closeWheel = false
    ;

  var timeoutToClear;

  /************* MENU **************/
  $('#menu-button-comecar').click(function(){
    $('.container-splash-screen').css('display', 'none');
    $('#container-tutorial').css('display', 'block');
    playSound('button2');
  });

  $('#button-triangle-menu').click(function() {
    startStage(gridTypes.triangle, patterns.none);
  });
  $('#button-square-menu').click(function() {
    startStage(gridTypes.square, patterns.none);
  });
  $('#button-hex-menu').click(function() {
    startStage(gridTypes.hex, patterns.none);
  });

  $('#button-a-menu').click(function() {
    startStage(gridTypes.triangle, patterns.a);
  });
  $('#button-b-menu').click(function() {
    startStage(gridTypes.square, patterns.b);
  });
  $('#button-c-menu').click(function() {
    startStage(gridTypes.hex, patterns.c);
  });
  $('#button-d-menu').click(function() {
    startStage(gridTypes.triangle, patterns.d);
  });
  $('#button-e-menu').click(function() {
    startStage(gridTypes.triangle, patterns.e);
  });
  $('#button-f-menu').click(function() {
    startStage(gridTypes.square, patterns.f);
  });

  $('#menu-button-grades').click(function() {
    playSound('button2');

    $('#menu-button-grades').addClass('menu-button-pressed');
    $('#menu-button-padroes').removeClass('menu-button-pressed');

    $('#menu-grids').css('display', 'block');
    $('#menu-patterns').css('display', 'none');
  });

  $('#menu-button-padroes').click(function() {
    playSound('button2');

    $('#menu-button-grades').removeClass('menu-button-pressed');
    $('#menu-button-padroes').addClass('menu-button-pressed');

    $('#menu-grids').css('display', 'none');
    $('#menu-patterns').css('display', 'block');
  });

  $('#menu-button-config').click(function() {
    closePrint();
    if($('#container-config').hasClass('container-config-show')){
      $('#container-config').removeClass('container-config-show');
    }else{
      $('#container-config').addClass('container-config-show');
    }
  });

  $('#menu-button-menu').click(function() {
    playSound('button2');
    hideWheel();

    $('#menu-button-config').css('display', 'none');
    $('#container-config').removeClass('container-config-show');
    closePrint();

    $('#container-jogo-triangulo').css('display', 'none');
    $('#container-jogo-quadrado').css('display', 'none');
    $('#container-jogo-hexagono').css('display', 'none');
    $('#container-end').css('display', 'none');
    $('.container-splash-screen').css('display', 'block');
  });

  $('#menu-button-limpar').click(function() {
    removeAllColors();

    closePrint();
    $('#container-config').removeClass('container-config-show');
  });

  $('#menu-button-imprimir').click(function() {
    $('#container-config').removeClass('container-config-show');
    openPrint();
  });

  $('#menu-button-android').click(function() {
    $('#container-print')
    .addClass('print-android')
    .removeClass('print-win')
    .removeClass('print-ios');
  });
  $('#menu-button-win').click(function() {
    $('#container-print')
    .removeClass('print-android')
    .addClass('print-win')
    .removeClass('print-ios');
  });
  $('#menu-button-ios').click(function() {
    $('#container-print')
    .removeClass('print-android')
    .removeClass('print-win')
    .addClass('print-ios');
  });

  $('#menu-button-print-exit').click(function() {
    closePrint();
  });

  for(var y=0; y<11;y++){
    for(var x=0; x<15; x++){
      //$('#triangle-img-'+x+'_'+y).text(x+'-'+y);
      $('#triangle-'+x+'_'+y).click(function(){
        if(!$(this).hasClass('triangle--selected')){
          $('.triangle-image').removeClass('triangle--selected');
          $('.triangle-area').removeClass('triangle--selected');

          var triangleNumbers = this.id.replace('triangle-', '').split('_');
          selectedId = '#triangle-img-'+triangleNumbers[0]+'_'+triangleNumbers[1];
  
          $(selectedId).addClass('triangle--selected');
          $(this).addClass('triangle--selected');
  
          positionWheelTriangle(triangleNumbers[0], triangleNumbers[1], 'a');
        }else {
          clickedOnColor('');
          hideWheel();
        }
      });

      //$('#triangle-img-b-'+x+'_'+y).text('b-'+x+'-'+y);
      $('#triangle-b-'+x+'_'+y).click(function(){
        if(!$(this).hasClass('triangle--selected')){
          $('.triangle-image').removeClass('triangle--selected');
          $('.triangle-area').removeClass('triangle--selected');
          
          var triangleNumbers = this.id.replace('triangle-b-', '').split('_');
          selectedId = '#triangle-img-b-'+triangleNumbers[0]+'_'+triangleNumbers[1];
          
          $(selectedId).addClass('triangle--selected');
          $(this).addClass('triangle--selected');
          
          positionWheelTriangle(triangleNumbers[0], triangleNumbers[1], 'b');
        } else {
          clickedOnColor('');
          hideWheel();
        }
      });



      $('#square-img-'+x+'_'+y).click(function(){
        if(!$(this).hasClass('square--selected')){
          $('.square-image').removeClass('square--selected');

          var squareNumbers = this.id.replace('square-img-', '').split('_');
          selectedId = '#square-img-'+squareNumbers[0]+'_'+squareNumbers[1];
  
          $(selectedId).addClass('square--selected');
          $(this).addClass('square--selected');
  
          positionWheelSquare(squareNumbers[0], squareNumbers[1]);
        }else {
          clickedOnColor('');
          hideWheel();
        }
      });

      //$('#hex-img-'+x+'_'+y).text(x+'-'+y);
      $('#hexagon-'+x+'_'+y).click(function(){
        if(!$(this).hasClass('hex--selected')){
          $('.hex-image').removeClass('hex--selected');
          $('.hexagon-area').removeClass('hex--selected');

          var hexNumbers = this.id.replace('hexagon-', '').split('_');
          selectedId = '#hex-img-'+hexNumbers[0]+'_'+hexNumbers[1];
  
          $(selectedId).addClass('hex--selected');
          $(this).addClass('hex--selected');
  
          positionWheelHex(hexNumbers[0], hexNumbers[1], 'a');
        }else {
          clickedOnColor('');
          hideWheel();
        }
      });

      //$('#hex-img-b-'+x+'_'+y).text('b-'+x+'-'+y);
      $('#hexagon-b-'+x+'_'+y).click(function(){
        if(!$(this).hasClass('hex--selected')){
          $('.hex-image').removeClass('hex--selected');
          $('.hexagon-area').removeClass('hex--selected');
          
          var hexNumbers = this.id.replace('hexagon-b-', '').split('_');
          selectedId = '#hex-img-b-'+hexNumbers[0]+'_'+hexNumbers[1];
          
          $(selectedId).addClass('hex--selected');
          $(this).addClass('hex--selected');
          
          positionWheelHex(hexNumbers[0], hexNumbers[1], 'b');
        } else {
          clickedOnColor('');
          hideWheel();
        }
      });
    }
  }

  for(var i=0; i<12;i++){
    $('#wheel-color-'+i).click(function(){
      var colorNumber = this.id.replace('wheel-color-', '');
      clickedOnColor(colorNumber);
    });
  }
  $('#wheel-close').click(function(){
    if(closeWheel){
      clickedOnColor('');
      hideWheel();
    }
  });

  function positionWheelTriangle(x=0, y=0, aOrB='a'){
    var xToUse = parseInt(x);
    closeWheel = true;
    if(aOrB == 'a' && y%2 != 0){
      xToUse -= 0.5;
    }
    if(aOrB == 'b' && y%2 == 0){
      xToUse -= 0.5;
    }

    var xTotal = (xToUse-1)*81;
    var yTotal = (parseInt(y)-1)*70;

    if(xTotal < 0){
      xTotal = 81;
      closeWheel = false;
    }
    if(xTotal > 770){
      xTotal = 688;
      closeWheel = false;
    }

    if(yTotal < 0){
      yTotal = 70;
      closeWheel = false;
    }
    if(yTotal > 500){
      yTotal = 420;
      closeWheel = false;
    }

    $('#wheel-container')
    .css('left', xTotal)
    .css('top', yTotal);
  
    showWheel();
  }

  function positionWheelSquare(x=0, y=0){
    var xToUse = parseInt(x);
    closeWheel = true;

    var xTotal = ((xToUse-1)*72)-33;
    var yTotal = (parseInt(y)-1)*70;

    if(xTotal < 0){
      xTotal = 116;
      closeWheel = false;
    }
    if(xTotal > 770){
      xTotal = 688;
      closeWheel = false;
    }

    if(yTotal < 0){
      yTotal = 70;
      closeWheel = false;
    }
    if(yTotal > 500){
      yTotal = 420;
      closeWheel = false;
    }

    $('#wheel-container')
    .css('left', xTotal)
    .css('top', yTotal);
  
    showWheel();
  }

  function positionWheelHex(x=0, y=0, aOrB='a'){
    closeWheel = true;

    var xTotal = parseInt(x)*147;
    var yTotal = parseInt(y)*86;

    if(aOrB == 'a'){
      xTotal -= 110;
      yTotal -= 64;
    }
    if(aOrB == 'b'){
      xTotal -= 36;
      yTotal -= 108;
    }

    if(xTotal < 40){
      xTotal = 126;
      closeWheel = false;
    }
    if(xTotal > 780){
      xTotal = 688;
      closeWheel = false;
    }

    if(yTotal < 40){
      yTotal = 130;
      closeWheel = false;
    }
    if(yTotal > 540){
      yTotal = 420;
      closeWheel = false;
    }

    $('#wheel-container')
    .css('left', xTotal)
    .css('top', yTotal);
  
    showWheel();
  }

  function showWheel(){
    $('#wheel-container').css('display', 'block');
  }

  function hideWheel(){
    $('.triangle-image').removeClass('triangle--selected');
    $('.triangle-area').removeClass('triangle--selected');

    $('.square-image').removeClass('square--selected');

    $('.hex-image').removeClass('hex--selected');
    $('.hexagon-area').removeClass('hex--selected');
  
    $('#wheel-container').css('display', 'none');
  }

  function clickedOnColor(color = ''){
    var selectorToUse = selectedId;
    if(patternSelected != patterns.none){
      selectorToUse = getSelectedPattern(selectedId);
    }

    selectColor(selectorToUse, color);
    hideWheel();
  }

  function selectColor(selectorToUse='', color = ''){
    for(var i=0; i<12; i++){
      $(selectorToUse).removeClass(gridSelected+'--color'+i);
    }

    if(color != ''){
      $(selectorToUse).addClass(gridSelected+'--color'+color);
    }
  }

  function getSelectedPattern(selectedId){
    var patternClass = $(selectedId).attr("class")
      .split(/\s+/)
      .filter(function(item){
        return item.indexOf('pattern-'+patternSelected) > -1
      });

    if(patternClass.length > 0){
      return '.'+patternClass[0];
    }
    return '';
  }

  function removeAllColors(){
    for(var i=0; i<12; i++){
      $('.'+gridSelected+'-image').removeClass(gridSelected+'--color'+i)
    }
  }

  function openPrint(){
    closePrint();
    $('#container-print').addClass('print-opened');
  }

  function closePrint(){
    $('#container-print')
    .removeClass('print-opened')
    .removeClass('print-android')
    .removeClass('print-win')
    .removeClass('print-ios');
  }

  /********GAME MECHANICS********/
  function startStage(gridType, patternType) {
    playSound('button2');

    gridSelected = gridType;
    patternSelected = patternType;
    
    removeAllColors();

    if(patternSelected != patterns.none){
      startPattern();
    }

    $('#container-tutorial').css('display', 'none');
    $('#menu-button-config').css('display', 'block');
    $('#container-jogo-'+gridTypesTranslation[gridSelected]).css('display', 'block');
  }

  function startPattern(){
    switch(patternSelected){
      case patterns.a :
        selectColor('.pattern-a_1', '7');
        selectColor('.pattern-a_2', '5');
        selectColor('.pattern-a_3', '0');
      break;
      case patterns.b:
        selectColor('.pattern-b_1', '1');
        selectColor('.pattern-b_2', '11');
        selectColor('.pattern-b_3', '5');
        selectColor('.pattern-b_4', '7');
      break;
      case patterns.c:
        selectColor('.pattern-c_1', '10');
        selectColor('.pattern-c_2', '6');
        selectColor('.pattern-c_3', '2');
      break;
      case patterns.d:
        selectColor('.pattern-d_1', '8');
        selectColor('.pattern-d_2', '7');
      break;
      case patterns.e:
        selectColor('.pattern-e_2', '2');
      break;
      case patterns.f:
        selectColor('.pattern-f_1', '9');
        selectColor('.pattern-f_2', '11');
        selectColor('.pattern-f_3', '10');
      break;
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