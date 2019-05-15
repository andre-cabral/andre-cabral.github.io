var ddmmArray = new Array();
var actualIndexes = [0, 0];

$(document).ready(function(){
	ddmmArray = $('#list option');
	createList();
	listChangeEvent();
	//addButtonClickEvent();
	//getHashSpells();
	listAnswersChangeEvent();
	selectFirstSpell();
});

function createList(){
	$('#list').empty();
	for (var i=0; i<phrasesFirstStage.length; i++){
		var stageArray = phrasesFirstStage[i];
		createOption('1', i, stageArray[0].theme);
	}
	for (var i=0; i<phrasesSecondStage.length; i++){
		var stageArray = phrasesSecondStage[i];
		createOption('2', i, stageArray[0].theme);
	}
}

function createOption(phraseStage, phraseIndex, theme){
	$('#list').append(
	'<option value="'+
	phraseStage+
	','+phraseIndex+
	'">'+
	theme+
	', frase'+
	phraseStage+
	'</option>');
}

$('#phrase1-before').keyup(changeJsonValuePhraseBefore);
$('#phrase2-before').keyup(changeJsonValuePhraseBefore);
function changeJsonValuePhraseBefore(){
	if(actualIndexes[0] == '1'){
		phrasesFirstStage[actualIndexes[1]][0].phraseBefore = $('#phrase1-before').val();
		phrasesFirstStage[actualIndexes[1]][1].phraseBefore = $('#phrase2-before').val();
	} 
	if(actualIndexes[0] == '2') {
		phrasesSecondStage[actualIndexes[1]][0].phraseBefore = $('#phrase1-before').val();
		phrasesSecondStage[actualIndexes[1]][1].phraseBefore = $('#phrase2-before').val();
	}
}
$('#phrase1-middle').keyup(changeJsonValuePhraseMiddle);
$('#phrase2-middle').keyup(changeJsonValuePhraseMiddle);
function changeJsonValuePhraseMiddle(){
	if(actualIndexes[0] == '1'){
		phrasesFirstStage[actualIndexes[1]][0].phraseMiddle = $('#phrase1-middle').val();
		phrasesFirstStage[actualIndexes[1]][1].phraseMiddle = $('#phrase2-middle').val();
	} 
	if(actualIndexes[0] == '2') {
		phrasesSecondStage[actualIndexes[1]][0].phraseMiddle = $('#phrase1-middle').val();
		phrasesSecondStage[actualIndexes[1]][1].phraseMiddle = $('#phrase2-middle').val();
	}
}
$('#phrase1-answer').keyup(changeJsonValuePhraseAnswer);
$('#phrase2-answer').keyup(changeJsonValuePhraseAnswer);
function changeJsonValuePhraseAnswer(){
	if(actualIndexes[0] == '1'){
		phrasesFirstStage[actualIndexes[1]][0].phraseAnswer = $('#phrase1-answer').val();
		phrasesFirstStage[actualIndexes[1]][1].phraseAnswer = $('#phrase2-answer').val();
	} 
	if(actualIndexes[0] == '2') {
		phrasesSecondStage[actualIndexes[1]][0].phraseAnswer = $('#phrase1-answer').val();
		phrasesSecondStage[actualIndexes[1]][1].phraseAnswer = $('#phrase2-answer').val();
	}
}
$('#phrase1-after').keyup(changeJsonValuePhraseAfter);
$('#phrase2-after').keyup(changeJsonValuePhraseAfter);
function changeJsonValuePhraseAfter(){
	if(actualIndexes[0] == '1'){
		phrasesFirstStage[actualIndexes[1]][0].phraseAfter = $('#phrase1-after').val();
		phrasesFirstStage[actualIndexes[1]][1].phraseAfter = $('#phrase2-after').val();
	} 
	if(actualIndexes[0] == '2') {
		phrasesSecondStage[actualIndexes[1]][0].phraseAfter = $('#phrase1-after').val();
		phrasesSecondStage[actualIndexes[1]][1].phraseAfter = $('#phrase2-after').val();
	}
}
$('#answer').keyup(changeJsonValueAnswers);
function changeJsonValueAnswers(){
	var newValue = $('#answer').val();
	$('#list-answers').find(":selected").attr('value', newValue);
	$('#list-answers').find(":selected").val(newValue);
	$('#list-answers').find(":selected").text(newValue);

	var allAnswers = new Array();
	$('#list-answers option').val(function( index, value ) {
		allAnswers.push(value);

		//need to return the value, otherwise the value will be 
		//turned into empty string
		return value;
	});
	
	if(actualIndexes[0] == '1'){
		phrasesFirstStage[actualIndexes[1]][0].answers = allAnswers;
		phrasesFirstStage[actualIndexes[1]][1].answers = allAnswers;
	}
	if(actualIndexes[0] == '2') {
		phrasesSecondStage[actualIndexes[1]][0].answers = allAnswers;
		phrasesSecondStage[actualIndexes[1]][1].answers = allAnswers;
	}
}
$('#phrase1-theme').keyup(changeJsonValueTheme);
function changeJsonValueTheme(){
	if(actualIndexes[0] == '1'){
		phrasesFirstStage[actualIndexes[1]][0].theme = $('#phrase1-theme').val();
		phrasesFirstStage[actualIndexes[1]][1].theme = $('#phrase1-theme').val();
	} 
	if(actualIndexes[0] == '2') {
		phrasesSecondStage[actualIndexes[1]][0].theme = $('#phrase1-theme').val();
		phrasesSecondStage[actualIndexes[1]][1].theme = $('#phrase1-theme').val();
	}
}

/*
function getHashSpells(){
	var spellHashes = document.location.hash.split('|');
	for(var i=0; i<spellHashes.length; i++){
		if(i == 0){
			showSpell(spellHashes[i].replace('#', ''));
		}else{
			showSpell(spellHashes[i]);
		}
		
		addSpellHash();
		$("#selected").html("");
	}
}
*/

function selectFirstSpell(){
	if($(".to_print").children().length == 0) {
		$("#list option:first").attr('selected',true);
		listChange();
	}
}

/*
function addSpellHash(){
	var toAdd = $('#selected').html();
	if(toAdd != ''){
		$(".to_print").append('<div class="ddmm">'+toAdd+'</div>');
	    
	    var childs = $(".to_print").children();
	    for(var i=0; i < childs.length; i++){
            if((i+1)%3 ==0){
                $(childs[i]).addClass("last");
            }
        }
    }
}
*/

function listAnswersChangeEvent(){
	$("#list-answers").change(listAnswerChange);
}

function listAnswerChange(){
	var selectedAnswer = $('#list-answers').find(":selected").val();
	$('#answer').attr('value', selectedAnswer);
	$('#answer').val(selectedAnswer);
}

function listChangeEvent(){
	$("#list").change(listChange);
}

function listChange(){
	var selected = $('#list').find(":selected").val();
	showSpell(selected);
}

function showSpell(selected){
	if(selected != ""){
		actualIndexes = selected.split(',');

		if(actualIndexes[0] == '1'){
			showPhraseData(phrasesFirstStage[actualIndexes[1]], phrasesFirstStage[actualIndexes[1]][0].phraseMiddle != undefined);
		} 
		if(actualIndexes[0] == '2') {
			showPhraseData(phrasesSecondStage[actualIndexes[1]], phrasesSecondStage[actualIndexes[1]][0].phraseMiddle != undefined);
		}
	}
}

function showPhraseData(arrayPhrases, hasPhraseMiddle = true) {
	$('#phrase1-theme').attr('value', arrayPhrases[0].theme);
	$('#phrase1-theme').val(arrayPhrases[0].theme);
	
	$('#phrase1-before').attr('value', arrayPhrases[0].phraseBefore);
	$('#phrase1-before').val(arrayPhrases[0].phraseBefore);
	if (hasPhraseMiddle) {
		$('#phrase1-middle').css('display', 'block');
		$('#phrase1-middle-label').css('display', 'block');
		$('#phrase1-middle').attr('value', arrayPhrases[0].phraseMiddle);
		$('#phrase1-middle').val(arrayPhrases[0].phraseMiddle);
	} else {
		$('#phrase1-middle').css('display', 'none');
		$('#phrase1-middle-label').css('display', 'none');
	}
	$('#phrase1-answer').attr('value', arrayPhrases[0].phraseAnswer);
	$('#phrase1-answer').val(arrayPhrases[0].phraseAnswer);
	$('#phrase1-after').attr('value', arrayPhrases[0].phraseAfter);
	$('#phrase1-after').val(arrayPhrases[0].phraseAfter);

	/* */
	/* */

	$('#phrase2-before').attr('value', arrayPhrases[1].phraseBefore);
	$('#phrase2-before').val(arrayPhrases[1].phraseBefore);
	if (hasPhraseMiddle) {
		$('#phrase2-middle').css('display', 'block');
		$('#phrase2-middle-label').css('display', 'block');
		$('#phrase2-middle').attr('value', arrayPhrases[1].phraseMiddle);
		$('#phrase2-middle').val(arrayPhrases[1].phraseMiddle);
	} else {
		$('#phrase2-middle').css('display', 'none');
		$('#phrase2-middle-label').css('display', 'none');
	}
	$('#phrase2-answer').attr('value', arrayPhrases[1].phraseAnswer);
	$('#phrase2-answer').val(arrayPhrases[1].phraseAnswer);
	$('#phrase2-after').attr('value', arrayPhrases[1].phraseAfter);
	$('#phrase2-after').val(arrayPhrases[1].phraseAfter);

	/* */

	var answersList = arrayPhrases[0].answers;
	$('#list-answers').empty();
	for (var i=0; i<answersList.length; i++) {
		$('#list-answers').append(
		'<option value="'+
		answersList[i]+
		'">'+
		answersList[i]+
		'</option>');
	}
}

/*
function addButtonClickEvent(){
	$("#add").click(function(){
		var toAdd = $('#selected').html();
		$(".to_print").append('<div class="ddmm">'+toAdd+'</div>');
        
		if(document.location.hash == ''){
			document.location.hash += $('#selected').children('img').attr('class');
        }else{
			document.location.hash += '|'+$('#selected').children('img').attr('class');
        }

        var childs = $(".to_print").children();
	});
}
*/


function download(filename, text, element) {
	//var element = element;
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
  
	//element.style.display = 'none';
	document.body.appendChild(element);
  /*
	element.click();
  
	document.body.removeChild(element);
	*/
  }
  
$('#download').click(function(){
	var text = getJsonExport();
	this.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	this.setAttribute('download', 'json.txt');
});

function getJsonExport(){
	var text = 	'var phrasesFirstStage = ' + JSON.stringify(phrasesFirstStage) + ';\n\n' +
				'var phrasesSecondStage = ' + JSON.stringify(phrasesSecondStage) + ';';
	return text;
}


// Builds the HTML Table out of myList.
function buildHtmlTable(selector, arrayTable) {
	$(selector).empty();
	var columns = addAllColumnHeaders(arrayTable, selector);

	for (var i = 0; i < arrayTable.length; i++) {
		for (var j=0; j<arrayTable[i].length; j++){
			var row$ = $('<tr/>');
			for (var colIndex = 0; colIndex < columns.length; colIndex++) {
				var cellValue = arrayTable[i][j][columns[colIndex]];

				if (cellValue == null) cellValue = "";
				if (Array.isArray(cellValue)) cellValue = cellValue.join(', ');
				row$.append($('<td/>').html(cellValue));
			}
			$(selector).append(row$);
			if(j == 1){
				$(selector).append('<tr class="blank_row"><td colspan="'+columns.length+'"></td></tr>');
			}
		}
	}
}
// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(arrayTable, selector) {
	var columnSet = [];
	var headerTr$ = $('<tr/>');

	for (var i = 0; i < arrayTable.length; i++) {
		for (var j=0; j<arrayTable[i].length; j++){
			var rowHash = arrayTable[i][j];
			for (var key in rowHash) {
				if ($.inArray(key, columnSet) == -1) {
					columnSet.push(key);
					headerTr$.append($('<th/>').html(keyNames[key]));
				}
			}
		}
	}
	$(selector).append(headerTr$);
	return columnSet;
}

$('#ver-tabela').click(function(){
	buildHtmlTable('#excelDataTable', phrasesFirstStage);
	buildHtmlTable('#excelDataTable2', phrasesSecondStage);
});

var keyNames = {
	'phraseBefore': 'começo da frase',
	'phraseMiddle': 'meio da frase',
	'phraseAnswer': 'resposta correta',
	'phraseAfter': 'final da frase',
	'answers': 'lista de respostas',
	'theme': 'tema da fase'
}