var pageItems = 0;
var pageNumber = 1;

$('#output-container').append(
  '<page id=page-'+pageNumber+' class="page page-preview" size="A4_l" style="background-color:white"></page>'
);

for(var i=0; i<monsters.length; i++){
  if(pageItems == 4){
    pageNumber++;
    pageItems = 0;

    $('#output-container').append(
      '<page id=page-'+pageNumber+' class="page page-preview" size="A4_l" style="background-color:white"></page>'
    );
  }
  if(monsters[i].size == "s"){
    $('#page-'+pageNumber).append(
      '<div class="item item-'+pageItems+'">' +
          '<h2 class="item-title">'+monsters[i].title+'</h2>'+
          '<img src="'+monsters[i].bgaidedd.toLowerCase().replace(/ /g, '-').replace(/-wyrmling/g, '').replace(/ancient-/g, '').replace(/young-/g, '')+'" />' +
      '</div>'
    );

    pageItems++;
  }
}

