var analogStartHour = 12,
  analogChosenHour = 12,
  analogStartMinute = 0,
  analogChosenMinute = 0,
  analogCanChange = true,
  analogPointerTime = 300,
  analogAnswerHours = 0,
  analogAnswerMinutes = 0;

function startAnalogMinigame(){
  analogChosenHour = analogStartHour;
  analogChosenMinute = analogStartMinute;

  $('#minigame-analog-hours').css('transform', 'rotate(0deg)');
  $('#minigame-analog-minutes').css('transform', 'rotate(0deg)');

  analogSetDigital();
  $('#minigame-analog').css('display', 'block');

  $('#button-confirmar-minigame-analog').attr('disabled', true);
}

function analogSetDigital(){
  for(var i=0; i<24; i++){
    $('#minigame-analog-digital-hours').removeClass('hour-'+i);
  }
  $('#minigame-analog-digital-minutes').removeClass('minutes-0').removeClass('minutes-30');

  analogAnswerMinutes = 30*getRandomNumber(0,2);
  analogAnswerHours = getRandomNumber(0,24);

  $('#minigame-analog-digital-hours').addClass('hour-'+analogAnswerHours);
  $('#minigame-analog-digital-minutes').addClass('minutes-'+analogAnswerMinutes);
}

$('#minigame-analog-clockwise').click(function(){
  analogAdd();
  $('#button-confirmar-minigame-analog').attr('disabled', false);
});
$('#minigame-analog-counterclockwise').click(function(){
  analogSubtract();
  $('#button-confirmar-minigame-analog').attr('disabled', false);
});
$('#button-confirmar-minigame-analog').click(function(){
  $('#minigame-analog').css('display', 'none');
  endMinigame(analogCheckAnswer());
});

function analogAdd(){
  if(analogCanChange) {
    playSound('minigameselection');
    analogCanChange = false;
    if(analogChosenMinute == 0){
      analogChosenMinute = 30;
    } else {
      if(analogChosenMinute == 30){
        analogChosenMinute = 0;

        if(analogChosenHour < 12){
          analogChosenHour++;
        } else {
          analogChosenHour = 1;
        }
      }
    }
    analogSetPointers(true);
  }
}

function analogSubtract(){
  if(analogCanChange) {
    playSound('minigameselection');
    analogCanChange = false;
    if(analogChosenMinute == 30){
      analogChosenMinute = 0;
    } else {
      if(analogChosenMinute == 0){
        analogChosenMinute = 30;

        if(analogChosenHour > 1){
          analogChosenHour--;
        } else {
          analogChosenHour = 12;
        }
      }
    }

    analogSetPointers(false);
  }
}

function analogSetPointers(adding = true){
  var hourDegrees = 30 * analogChosenHour;
  var minutesDegrees = 0;

  if(!adding && hourDegrees == 360){
    hourDegrees = 0;
  }

  if(analogChosenMinute == 30){
    minutesDegrees = 180;
    
    if(adding && hourDegrees == 360){
      hourDegrees = 15;
    }else{
      hourDegrees += 15;
    }
  }

  if(adding && minutesDegrees == 0){
    minutesDegrees = 360;
  }

  var hourStartingDegrees = getRotationDegrees($('#minigame-analog-hours'));

  if(!adding && hourStartingDegrees == 0){
    hourStartingDegrees = 360;
  }

  // we use a pseudo object for the animation
  // (starts from `0` to `angle`), you can name it as you want
  $({deg: hourStartingDegrees}).animate({deg: hourDegrees}, {
    duration: analogPointerTime,
    step: function(now) {
        // in the step-callback (that is fired each step of the animation),
        // you can use the `now` paramter which contains the current
        // animation-position (`0` up to `angle`)
        $('#minigame-analog-hours').css('transform', 'rotate('+now+'deg)');
    }
  });

  var minutesStartingDegrees = getRotationDegrees($('#minigame-analog-minutes'));

  if(!adding && minutesStartingDegrees == 0){
    minutesStartingDegrees = 360;
  }

  $({deg: minutesStartingDegrees}).animate({deg: minutesDegrees}, {
    duration: analogPointerTime,
    step: function(now) {
        // in the step-callback (that is fired each step of the animation),
        // you can use the `now` paramter which contains the current
        // animation-position (`0` up to `angle`)
        $('#minigame-analog-minutes').css('transform', 'rotate('+now+'deg)');
    },
    complete: function(){
      analogCanChange = true;
    }
  });

  /*
  $('#minigame-analog-hours').css('transform', 'rotate('+minutesDegrees+'deg)');
  $('#minigame-analog-minutes').css('transform', 'rotate('+hourDegrees+'deg)');
  */
}

function analogCheckAnswer(){
  if(analogAnswerMinutes == analogChosenMinute){
    if(analogAnswerHours == 0){
      if(analogChosenHour == 12) {
        return true
      }
    }
    if(analogAnswerHours > 0 && analogAnswerHours < 13){
      if(analogAnswerHours == analogChosenHour){
        return true;
      }
    }

    if(analogAnswerHours>12){
      if(analogAnswerHours-12 == analogChosenHour){
        return true;
      }
    }
  }
  
  return false;
}

function getRotationDegrees(obj) {
  var matrix = obj.css("-webkit-transform") ||
  obj.css("-moz-transform")    ||
  obj.css("-ms-transform")     ||
  obj.css("-o-transform")      ||
  obj.css("transform");
  if(matrix !== 'none') {
      var values = matrix.split('(')[1].split(')')[0].split(',');
      var a = values[0];
      var b = values[1];
      var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
  } else { var angle = 0; }
  return (angle < 0) ? angle + 360 : angle;
}