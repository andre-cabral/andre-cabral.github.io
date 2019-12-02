var pageItems = 0;
var pageNumber = 1;

$('#output-container').append(
  '<page id=page-'+pageNumber+' style="background-image:url(pages/DD_5e_Monster_Cards_SRD_COMPLETE_pages-to-jpg-000'+pageNumber+'.jpg)" class="page page-preview" size="A4" style="background-color:white"></page>'
);

for(var i=0; i<monsters.length; i++){
  if(pageItems == 2){
    pageNumber++;
    pageItems = 0;

    var bg =''; 
    
    if(pageNumber < 10){
      bg = 'url(pages/DD_5e_Monster_Cards_SRD_COMPLETE_pages-to-jpg-000'+pageNumber+'.jpg)';
    }

    if(pageNumber >= 10 && pageNumber < 100){
      bg = 'url(pages/DD_5e_Monster_Cards_SRD_COMPLETE_pages-to-jpg-00'+pageNumber+'.jpg)';
    }

    if(pageNumber >= 100){
      bg = 'url(pages/DD_5e_Monster_Cards_SRD_COMPLETE_pages-to-jpg-0'+pageNumber+'.jpg)';
    }

    $('#output-container').append(
      '<page id=page-'+pageNumber+' style="background-image:'+bg+'" class="page page-preview" size="A4" style="background-color:white"></page>'
    );
  }
  if(monsters[i].size == "l"){
    var pageMod = pageItems%2 == 0 ? '' : ' item-mod';

    $('#page-'+pageNumber).append(
      '<div class="item'+pageMod+'">' +
          '<h2 class="item-manual">Monster Manual - '+monstersAndPagesObj[monsters[i].title]+'</h2>'+
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