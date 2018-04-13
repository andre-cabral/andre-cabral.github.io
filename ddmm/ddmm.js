var ddmmArray = new Array();

$(document).ready(function(){
	ddmmArray = $('#list option');
	listChangeEvent();
	getHashSpells()
	addButtonClickEvent();
});

function getHashSpells(){
	var spellHashes = document.location.hash.split('|');
	for(var i=0; i<spellHashes.length; i++){
		if(i == 0){
			showSpell(spellHashes[i].replace('#', ''));
		}else{
			showSpell(spellHashes[i]);
		}
		
		addSpellHash();
	}
}

function addSpellHash(){
	var toAdd = $('#selected_spell').html();
	if(toAdd != ''){
		$(".to_print").append('<div class="spell">'+toAdd+'</div>');
	    
	    var childs = $(".to_print").children();
	    for(var i=0; i < childs.length; i++){
	        if((i+1)%3 ==0){
	            //$(childs[i]).addClass("spell_last");
	            //$(childs[i]).append('<br />');
	            $(".to_print")
	        }
	    }
    }
}

function listChangeEvent(){
	$("#list").change(listChange);
}

function listChange(){
	var selected = $('#list').find(":selected").text();
	showSpell(selected);
}

function showSpell(selected){
	if(selected != ""){
		var selectedSpellObject;
		$(ddmmArray).each(function(){
			if(this.text == selected){
				selectedSpellObject = this;
			}
		});
		if(selectedSpellObject){
			$("#selected").html("");
			$("#selected").append('<img class="'+selected+'" src="'+selectedSpellObject.value+'" />');
		}
	}
}

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
        for(var i=0; i < childs.length; i++){
            if((i+1)%3 ==0){
                $(childs[i]).addClass("last");
            }
        }
	});
}