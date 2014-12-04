var spellsArray = new Array();
var filteredSpellsArray = spellsArray;

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
			school : $('school', this).text(),
			castingTime : $('casting_time', this).text(),
			range : $('range', this).text(),
			components : $('components', this).text(),
			description : $('description', this).text()
		}
		spellsArray.push(spellTemp);
	});
}

function listSpells(array){
	$("#spell_list").html("");
	$(array).each(function(){
		$("#spell_list").append('<option value="'+this.name+'">'+this.name+'</option>');
	});
}

function addEvents(){
	spellListChangeEvent();
	addSpellButtonClickEvent();
	schoolsFilterChangeEvent()
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
		if(selectedSpellObject.level == "cantrip"){
			$("#selected_spell").append('<p class="level">'+selectedSpellObject.school+selectedSpellObject.level+'</p>');
		}else{
			$("#selected_spell").append('<p class="level">'+selectedSpellObject.level+selectedSpellObject.school+'</p>');
		}
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

function sortByName(x,y){
	if (x.name < y.name){
		return -1;
	}
	if (x.name > y.name){
		return 1;
	}
	return 0;
}

function allFilters(){
	filterBySchool();
}

function schoolsFilterChangeEvent(){
	$("#schools_filter").change(function(){
		allFilters();
		listSpells(filteredSpellsArray);
	});
}
function filterBySchool(){
	var schoolsSelected = new Array();
	$("#schools_filter input:checkbox").each(function(){
		if(this.checked){
			schoolsSelected.push(this.value);
		}
	});

	var spellsNew = new Array();
	$(schoolsSelected).each(function(){
		var that = this;
		$(spellsArray).each(function(){
			if(this.school.toUpperCase().indexOf(that.toUpperCase()) != -1){
				spellsNew.push(this);
			}
		});
	});
	spellsNew.sort(sortByName);
	filteredSpellsArray = spellsNew;
}