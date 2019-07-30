var nameChosen = 0,
  nameAnswer = 0,
  nameStart = 0,
  numberChosen = 0,
  numberAnswer = 0,
  numberStart = 0;

function startNameMinigame(){
  nameChosen = nameStart;

  nameSetDate();
  $('#minigame-name').css('display', 'block');

  $('#button-confirmar-minigame-name').attr('disabled', true);
}

function startNumberMinigame(){
  numberChosen = numberStart;

  numberSetDate();
  $('#minigame-number').css('display', 'block');

  $('#button-confirmar-minigame-number').attr('disabled', true);
}

function nameSetDate(){
  var date = getRandomDate();
  nameAnswer = date.getMonth+1;

  $('#minigame-name-day').text( addZeroBefore(date.getDate()) );
  $('#minigame-name-month').text( addZeroBefore(date.getMonth()+1) );
  $('#minigame-name-year').text(date.getFullYear());
}

function numberSetDate(){
  var date = getRandomDate();
  numberAnswer = date.getMonth+1;

  $('#minigame-number-day').text( addZeroBefore(date.getDate()) );
  $('#minigame-number-month').text( getMonthName(date.getMonth()+1).toUpperCase() );
  $('#minigame-number-year').text(date.getFullYear());
}

$('.minigame-name-button').click(function(){
  $('.minigame-name-button').removeClass('menu-button-pressed');
  $(this).addClass('menu-button-pressed');

  var slicedArray = $(this).attr('id').split('-');

  nameChosen = slicedArray[slicedArray.length-1];

  $('#button-confirmar-minigame-name').attr('disabled', false);
});
$('.minigame-number-button').click(function(){
  $('.minigame-number-button').removeClass('menu-button-pressed');
  $(this).addClass('menu-button-pressed');

  var slicedArray = $(this).attr('id').split('-');
  numberChosen = slicedArray[slicedArray.length-1];

  $('#button-confirmar-minigame-number').attr('disabled', false);
});
$('#button-confirmar-minigame-name').click(function(){
  $('#minigame-name').css('display', 'none');
  endMinigame(nameCheckAnswer());
});
$('#button-confirmar-minigame-number').click(function(){
  $('#minigame-number').css('display', 'none');
  endMinigame(numberCheckAnswer());
});


function nameCheckAnswer(){
  return nameChosen == nameAnswer;
}
function numberCheckAnswer(){
  return numberChosen == numberAnswer;
}

function getRandomDate(){
  var randomDate = new Date(getRandomNumber(946704240000,1924925040000));
  return randomDate;
}

function addZeroBefore(number){
  if(number < 10){
    return '0'+number;
  }
  return number;
}

function getMonthName(date){
  switch(date.getMonth()+1){
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
}

/*
var randomDate = new Date(getRandomNumber(946704240000,1924925040000));

//nro do dia
randomDate.getDate();

//ano
randomDate.getFullYear();

//nro do mes
randomDate.getMonth()+1

*/