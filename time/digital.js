var digitalStartHour = 12,
  digitalChosenHour = 12,
  digitalStartMinute = 0,
  digitalChosenMinute = 0,
  digitalPointerTime = 300,
  digitalAnswerHours = 0,
  digitalAnswerMinutes = 0;

function startDigitalMinigame(){
  digitalChosenHour = digitalStartHour;
  digitalChosenMinute = digitalStartMinute;

  $('#minigame-digital-hours').css('transform', 'rotate(0deg)');
  $('#minigame-digital-minutes').css('transform', 'rotate(0deg)');

  digitalSetAnalog();
  $('#minigame-digital').css('display', 'block');

  $('#button-confirmar-minigame-digital').attr('disabled', true);
}

function digitalSetAnalog(){
  digitalAnswerMinutes = 30*getRandomNumber(0,2);
  digitalAnswerHours = getRandomNumber(0,12);

  var hourDegrees = 30 * digitalAnswerHours;
  var minutesDegrees = 0;

  if(digitalAnswerMinutes == 30){
    minutesDegrees = 180;

    hourDegrees += 15;
  }

  $('#minigame-digital-hours').css('transform', 'rotate('+hourDegrees+'deg)');
  $('#minigame-digital-minutes').css('transform', 'rotate('+minutesDegrees+'deg)');
}

$('#minigame-digital-hour-add').click(function(){
  digitalAddHour();
  $('#button-confirmar-minigame-digital').attr('disabled', false);
});
$('#minigame-digital-minutes-add').click(function(){
  digitalAddMinute();
  $('#button-confirmar-minigame-digital').attr('disabled', false);
});
$('#minigame-digital-hour-subtract').click(function(){
  digitalSubtractHour();
  $('#button-confirmar-minigame-digital').attr('disabled', false);
});
$('#minigame-digital-minutes-subtract').click(function(){
  digitalSubtractMinute();
  $('#button-confirmar-minigame-digital').attr('disabled', false);
});
$('#button-confirmar-minigame-digital').click(function(){
  $('#minigame-digital').css('display', 'none');
  endMinigame(digitalCheckAnswer());
});

function digitalAddHour(){
  if(digitalChosenHour < 23){
    digitalChosenHour++;
  } else {
    digitalChosenHour = 0;
  }
  digitalSetDigital(true);
}
function digitalAddMinute(){
    if(digitalChosenMinute == 0){
      digitalChosenMinute = 30;
    } else {
      if(digitalChosenMinute == 30){
        digitalChosenMinute = 0;

        digitalAddHour();
      }
    }
    digitalSetDigital(true);
}

function digitalSubtractHour(){
  if(digitalChosenHour > 0){
    digitalChosenHour--;
  } else {
    digitalChosenHour = 23;
  }
  digitalSetDigital(false);
}
function digitalSubtractMinute(){
  if(digitalChosenMinute == 30){
    digitalChosenMinute = 0;
  } else {
    if(digitalChosenMinute == 0){
      digitalChosenMinute = 30;

      digitalSubtractHour();
    }
  }
  digitalSetDigital(false);
}

function digitalSetDigital(adding = true){
  for(var i=0; i<24; i++){
    $('#minigame-digital-digital-hours').removeClass('hour-'+i);
  }
  $('#minigame-digital-digital-minutes').removeClass('minutes-0').removeClass('minutes-30');

  $('#minigame-digital-digital-hours').addClass('hour-'+digitalChosenHour);
  $('#minigame-digital-digital-minutes').addClass('minutes-'+digitalChosenMinute);
}

function digitalCheckAnswer(){
  if(digitalAnswerMinutes == digitalChosenMinute){
    if(digitalChosenHour == 12 || digitalChosenHour == 0) {
      if(digitalAnswerHours == 0){
        return true
      }
    }
    if(digitalChosenHour > 0 && digitalChosenHour < 12){
      if(digitalAnswerHours == digitalChosenHour){
        return true;
      }
    }

    if(digitalChosenHour>12){
      if(digitalAnswerHours == digitalChosenHour-12){
        return true;
      }
    }
  }
  
  return false;
}

/*
var randomDate = new Date(getRandomNumber(946704240000,1924925040000));

//nro do dia
randomDate.getDate();

//nro do mes
randomDate.getMonth()+1


switch(month){
  case 1:
    return 'Janeiro';
  break;
  case 2:
    return 'Fevereiro';
  break;
  case 3:
    return 'Março';
  break;
  case 4:
    return 'Abril';
  break;
  case 5:
    return 'Maio';
  break;
  case 6:
    return 'Junho';
  break;
  case 7:
    return 'Julho';
  break;
  case 8:
    return 'Agosto';
  break;
  case 9:
    return 'Setembro';
  break;
  case 10:
    return 'Outubro';
  break;
  case 11:
    return 'Novembro';
  break;
  case 12:
    return 'Dezembro';
  break;
}
*/