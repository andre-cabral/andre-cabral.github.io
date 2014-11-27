var spellsArray = new Array();

$(document).ready(function(){
	$.ajax({
        type: "GET",
        url: "spells.xml",
        dataType: "xml",
        success: init
      });
});

function init(xml){
	parseXml(xml);
	listSpells(spellsArray);
	addEvents();
}

function parseXml(xml){
	$(xml).find("spell").each(function(){
		var spellTemp = {
			name : $('name', this).text(),
			level : $('level', this).text(),
			castingTime : $('casting_time', this).text(),
			range : $('range', this).text(),
			components : $('components', this).text(),
			description : $('description', this).text()
		}
		spellsArray.push(spellTemp);
	});
}

function listSpells(array){
	$(array).each(function(){
		$("#spell_list").append('<option value="'+this.name+'">'+this.name+'</option>');
	});
}

function addEvents(){
	spellListChangeEvent();
	addSpellButtonClickEvent();
}

function spellListChangeEvent(){
	$("#spell_list").change(function(){
		var selected = $('#spell_list').find(":selected").text();
		var selectedSpellObject;
		$(spellsArray).each(function(){
			if(this.name == selected){
				selectedSpellObject = this;
			}
		});
		$("#selected_spell").html("");
		$("#selected_spell").append('<p class="name">'+selectedSpellObject.name+'</p>');
		$("#selected_spell").append('<p class="level">'+selectedSpellObject.level+'</p>');
		$("#selected_spell").append('<p class="casting_time">'+selectedSpellObject.castingTime+'</p>');
		$("#selected_spell").append('<p class="range">'+selectedSpellObject.range+'</p>');
		$("#selected_spell").append('<p class="components">'+selectedSpellObject.components+'</p>');
		$("#selected_spell").append('<p class="description">'+selectedSpellObject.description+'</p>');
	});
}

function addSpellButtonClickEvent(){
	$(".add_spell").click(function(){
		var toAdd = $('#selected_spell').html();
		$(".spells_to_print").append('<div class="spell">'+toAdd+'</div>');
        
        var childs = $(".spells_to_print").children();
        for(var i=0; i < childs.length; i++){
            if((i+1)%3 ==0){
                $(childs[i]).addClass("spell_last");
            }
        }
	});
}