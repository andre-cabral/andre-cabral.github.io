var pageItems = 0;
var pageNumber = 1;

$('#output-container').append(
  '<page id=page-'+pageNumber+' style="background-image:url(pages/DD_5e_Monster_Cards_SRD_COMPLETE_pages-to-jpg-0084.jpg);flex-direction:row;" class="page page-preview" size="A4_l" style="background-color:white"></page>'
);

for(var i=0; i<monsters.length; i++){
  if(pageItems == 4){
    pageNumber++;
    pageItems = 0;

    var bg ='';
    var pagenumberPlus = pageNumber+83;
    
    if(pagenumberPlus+83 < 10){
      bg = 'url(pages/DD_5e_Monster_Cards_SRD_COMPLETE_pages-to-jpg-000'+pagenumberPlus+'.jpg)';
    }

    if(pagenumberPlus >= 10 && pagenumberPlus < 100){
      bg = 'url(pages/DD_5e_Monster_Cards_SRD_COMPLETE_pages-to-jpg-00'+pagenumberPlus+'.jpg)';
    }

    if(pagenumberPlus >= 100){
      bg = 'url(pages/DD_5e_Monster_Cards_SRD_COMPLETE_pages-to-jpg-0'+pagenumberPlus+'.jpg)';
    }

    $('#output-container').append(
      '<page id=page-'+pageNumber+' style="background-image:'+bg+';flex-direction:row;" class="page page-preview" size="A4_l" style="background-color:white"></page>'
    );
  }
  if(monsters[i].size == "s"){
    $('#page-'+pageNumber).append(
      '<div class="item item-'+pageItems+'">' +
        '<h2 class="item-manual">Monster Manual - '+monstersAndPagesObj[monsters[i].title]+'</h2>'+
      '</div>'
    );

    pageItems++;
  }
}

