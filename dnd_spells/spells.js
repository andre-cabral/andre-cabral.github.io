var spellsArray = new Array();
var classesXmlObject;
var filteredSpellsArray = spellsArray;

var spellsXmlSuccess = false;
var classesXmlSuccess = false;

var hasHashSpells = false;

$(document).ready(function(){
	$.ajax({
        type: "GET",
        url: "https://andre-cabral.github.io/dnd_spells/spells.xml",
        dataType: "xml",
        success: init
    }).then(() => {
		//esse metodo eh muito mais simples que o anterior.
		//poderia ter usado dessa forma no spells.xml.
		$.ajax({
			type: "GET",
			url: "https://andre-cabral.github.io/dnd_spells/classes.xml",
			dataType: "xml",
			success: initClasses
		}).then((res) => {
			getHashSpells();

			init();
			initClasses();
			classesXmlObject = res
		});
	});

	
	
});

function init(xml){
	parseXml(xml);
	if(classesXmlSuccess){
		listSpells(spellsArray);
		//listClasses($(classesXmlObject.responseXML).find("name"));
		addEvents();
		getHashSpells();
		selectFirstSpell();
	}
	spellsXmlSuccess = true;
}

function initClasses(xml){
	//classesXmlObject = $.parseXML(xml);
	if(spellsXmlSuccess){
		listSpells(spellsArray);
		//listClasses($(classesXmlObject.responseXML).find("name"));
		addEvents();
		selectFirstSpell();
	}
	classesXmlSuccess = true;
	if(hasHashSpells){
		$("#selected_spell").html("");
	}
}

function getHashSpells(){
	var spellHashes = document.location.hash.split('|');
	for(var i=0; i<spellHashes.length; i++){
		if(i == 0){
			showSpell(decodeURI(spellHashes[i].replace('#', '')));
			hasHashSpells = true;
		}else{
			showSpell(decodeURI(spellHashes[i]));
		}
		
		addSpellHash();
	}
}

function parseXml(xml){
	$(xml).find("spell").each(function(){
		var spellTemp = {
			name : $('name', this).text(),
			level : $('level', this).text(),
			school : $('school', this).text(),
			ritual : $('ritual', this).text(),
			castingTime : $('casting_time', this).text(),
			range : $('range', this).text(),
			components : $('components', this).text(),
			duration : $('duration', this).text(),
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

function listClasses(array){
	classesArray = $(array);
	$("#classes_filter").append('<input checked id="class0" type="radio" name="class" value="All"><label for="class0">All Classes</label><br>');
	for (var i=1; i < classesArray.length; i++){
		$("#classes_filter").append('<input id="class'+i+'" type="radio" name="class" value="'+classesArray[i-1].textContent+'"><label for="class'+i+'">'+classesArray[i-1].textContent+'</label><br>');
	}
}

function addEvents(){
	spellListChangeEvent();
	addSpellButtonClickEvent();
	allCheckedClickEvent();
	noneCheckedClickEvent();
	schoolsFilterChangeEvent();
	levelFilterChangeEvent();
	classesFilterChangeEvent();
	nameFilterChangeEvent();
	spellListTabClickEvent();
	levelSchoolTabClickEvent();
	classTabClickEvent();
	nameTabClickEvent();
	spellTabClickEvent();
	classesTabsClickEvent();
}

function classesTabsClickEvent(){
	$(".opener_classes_js").click(function(){
		var allClassesOnElement = $(this).attr("class").split(/\s+/);
		var classToOpen = "";
		for (var i=0; i<allClassesOnElement.length; i++){
			if(allClassesOnElement[i].indexOf('open_') > -1){
				classToOpen = ".tab_"+allClassesOnElement[i].slice('open_'.length);
			}
		}

		if(classToOpen!=""){
			if($(classToOpen).css("display") != "none"){
				$(classToOpen).css("display", "none");
				$(this).removeClass("selected");
			}else{
				$(".opener_classes_js").removeClass("selected");
				$(".tab_classes_js").css("display", "none");
				$(classToOpen).css("display", "block");
				$(this).addClass("selected");
			}
			
		}

	});
}

function spellListTabClickEvent(){
	$(".menu_mobile_option_list").click(function(){
		changeTab("#spell_list", ".menu_mobile_option_list");
	});
}

function levelSchoolTabClickEvent(){
	$(".menu_mobile_option_level_school").click(function(){
		changeTab("#level_filter", ".menu_mobile_option_level_school");
		showTab("#schools_filter", ".menu_mobile_option_level_school");
	});
}

function classTabClickEvent(){
	$(".menu_mobile_option_class").click(function(){
		changeTab("#classes_filter", ".menu_mobile_option_class");
	});
}

function nameTabClickEvent(){
	$(".menu_mobile_option_name").click(function(){
		changeTab("#name_filter", ".menu_mobile_option_name");
	});
}

function spellTabClickEvent(){
	$(".menu_mobile_option_spell").click(function(){
		hideAllTabs();
		$(".menu_mobile_option_spell").addClass("selected");
	});
}

function changeTab(tabName, tabOption){
	hideAllTabs();
	showTab(tabName, tabOption);
}

function hideAllTabs(){
	$(".tab_js").css("display", "none");
	$(".menu_mobile_option").removeClass("selected");
}

function showTab(tabName, tabOption){
	$(tabName).css("display", "block");
	$(tabOption).addClass("selected");
}

function selectFirstSpell(){
	if(!hasHashSpells){
		$("#spell_list option:first").attr('selected',true);
		spellListChange();
	}
}

function spellListChangeEvent(){
	$("#spell_list").change(spellListChange);
}

function spellListChange(){
	var selected = $('#spell_list').find(":selected").text();
	showSpell(selected);
}

function showSpell(selected){
	if(selected != ""){
		var selectedSpellObject;
		$(spellsArray).each(function(){
			if(this.name == selected){
				selectedSpellObject = this;
			}
		});
		if(selectedSpellObject){
			$("#selected_spell").html("");
			$("#selected_spell").append('<p class="name">'+selectedSpellObject.name+'</p>');
			if(selectedSpellObject.level == "cantrip"){
				if(selectedSpellObject.ritual == "(no)"){
					$("#selected_spell").append('<p class="level">'+selectedSpellObject.school+selectedSpellObject.level+'</p>');
				}else{
					$("#selected_spell").append('<p class="level">'+selectedSpellObject.school+selectedSpellObject.level+selectedSpellObject.ritual+'</p>');
				}
			}else{
				if(selectedSpellObject.ritual == "(no)"){
					$("#selected_spell").append('<p class="level">'+selectedSpellObject.level+selectedSpellObject.school+'</p>');
				}else{
					$("#selected_spell").append('<p class="level">'+selectedSpellObject.level+selectedSpellObject.school+selectedSpellObject.ritual+'</p>');
				}
			}
			$("#selected_spell").append('<p class="casting_time">'+selectedSpellObject.castingTime+'</p>');
			$("#selected_spell").append('<p class="range">'+selectedSpellObject.range+'</p>');
			$("#selected_spell").append('<p class="components">'+selectedSpellObject.components+'</p>');
			$("#selected_spell").append('<p class="duration">'+selectedSpellObject.duration+'</p>');
			$("#selected_spell").append('<p class="description">'+selectedSpellObject.description+'</p>');
		}
	}
}

function addSpellHash(){
	var toAdd = $('#selected_spell').html();
	if(toAdd != ''){
		$(".spells_to_print").append('<div class="spell">'+toAdd+'</div>');
	    
	    var childs = $(".spells_to_print").children();
	    for(var i=0; i < childs.length; i++){
	        if((i+1)%3 ==0){
	            //$(childs[i]).addClass("spell_last");
	            //$(childs[i]).append('<br />');
	            $(".spells_to_print")
	        }
	    }
    }
}

function addSpellButtonClickEvent(){
	$(".add_spell").click(function(){
		var toAdd = $('#selected_spell').html();
		$(".spells_to_print").append('<div class="spell">'+toAdd+'</div>');

		if(document.location.hash == ''){
			document.location.hash += $('#selected_spell').children('.name').text();
        }else{
			document.location.hash += '|'+$('#selected_spell').children('.name').text();
        }
        var childs = $(".spells_to_print").children();
        for(var i=0; i < childs.length; i++){
            if((i+1)%3 ==0){
                //$(childs[i]).addClass("spell_last");
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
	filteredSpellsArray = spellsArray;
	filterBySchool();
	filterByLevel();
	filterByClass();
	filterByName();

	listSpells(filteredSpellsArray);
}

function allCheckedClickEvent(){
	$(".all_checked_button").click(function(){
		$(this).parent(".div_filter").children("input").prop( "checked", true );
		allFilters();
	});
}

function noneCheckedClickEvent(){
	$(".none_checked_button").click(function(){
		$(this).parent(".div_filter").children("input").prop( "checked", false );
		allFilters();
	});
}

function schoolsFilterChangeEvent(){
	$("#schools_filter").change(function(){
		allFilters();
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
		$(filteredSpellsArray).each(function(){
			if(this.school.toUpperCase().indexOf(that.toUpperCase()) != -1){
				spellsNew.push(this);
			}
		});
	});
	spellsNew.sort(sortByName);
	filteredSpellsArray = spellsNew;
}

function levelFilterChangeEvent(){
	$("#level_filter").change(function(){
		allFilters();
	});
}
function filterByLevel(){
	var levelsSelected = new Array();
	$("#level_filter input:checkbox").each(function(){
		if(this.checked){
			levelsSelected.push(this.value);
		}
	});

	var spellsNew = new Array();
	$(levelsSelected).each(function(){
		var that = this;
		$(filteredSpellsArray).each(function(){
			if(this.level.toUpperCase().indexOf(that.toUpperCase()) != -1){
				spellsNew.push(this);
			}
		});
	});
	spellsNew.sort(sortByName);
	filteredSpellsArray = spellsNew;
}

function nameFilterChangeEvent(){
	$("#name_filter input").on('change keydown paste input', function() {
		allFilters();
		selectFirstSpell();
	});
}
function filterByName(){
	var nameSelected =	$("#name_filter input:text").val();
	if(nameSelected != ""){
		var spellsNew = new Array();
		$(filteredSpellsArray).each(function(){
			if(this.name.toUpperCase().indexOf(nameSelected.toUpperCase()) != -1){
				spellsNew.push(this);
			}
		});
	
		spellsNew.sort(sortByName);
		filteredSpellsArray = spellsNew;
	}
}

function classesFilterChangeEvent(){
	$("#classes_filter").change(function(){
		allFilters();
	});
}
function filterByClass(){
	var classSelected =	$("#classes_filter input:radio:checked").val();
	
	if(classSelected != "All"){
		var spellsNew = new Array();
		$(classesXmlObject).find("classes class name:contains('" + classSelected + "')").siblings().find("spell").each(function(){
			var nameSelected = this.textContent;
			$(filteredSpellsArray).each(function(){
				if(this.name.toUpperCase() == nameSelected.toUpperCase()){
					spellsNew.push(this);
				}
			});
		});	
		
		spellsNew.sort(sortByName);
		filteredSpellsArray = spellsNew;
	}
}

function nextSpell(){
	nextObj = $("#spell_list option:selected").next();
	$("#spell_list option:selected").attr('selected',false);
	$(nextObj).attr('selected', true);
	spellListChange();
}

function prevSpell(){
	prevObj = $("#spell_list option:selected").prev();
	$("#spell_list option:selected").attr('selected',false);
	$(prevObj).attr('selected', true);
	spellListChange();
}