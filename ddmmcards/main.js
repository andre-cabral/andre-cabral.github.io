var pageItems = 0;
var pageNumber = 1;

$('#output-container').append(
  '<page id=page-'+pageNumber+' class="page page-preview" size="A4" style="background-color:white"></page>'
);

for(var i=0; i<monsters.length; i++){
  if(pageItems == 2){
    pageNumber++;
    pageItems = 0;

    $('#output-container').append(
      '<page id=page-'+pageNumber+' class="page page-preview" size="A4" style="background-color:white"></page>'
    );
  }
  if(monsters[i].size == "l"){
    var pageMod = pageItems%2 == 0 ? '' : ' item-mod';

    $('#page-'+pageNumber).append(
      '<div class="item'+pageMod+'">' +
          '<h2 class="item-title">'+monsters[i].title+'</h2>'+
          '<img src="'+monsters[i].bgaidedd.toLowerCase().replace(/ /g, '-').replace(/-wyrmling/g, '').replace(/ancient-/g, '').replace(/young-/g, '')+'" />' +
      '</div>'
    );

    pageItems++;
  }
}

/*
var foundMonsters = []
for (var i=0; i<monstersString.length; i++){
	for(var j=0; j<monsters.length; j++){
		if(monstersString[i].toLowerCase() == monsters[j].title.toLowerCase()){
			foundMonsters.push(monstersString[i]);
		}
	}
}

var notFoundMonsters = []
for (var i=0; i<monstersString.length; i++){
	if(foundMonsters.indexOf(monstersString[i]) == -1){
		notFoundMonsters.push(monstersString[i]);
	}
}
*/