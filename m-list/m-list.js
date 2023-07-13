$(document).ready(() => {
	init();
});

const init = () => {
	mountFilter('jogo');
	mountFilter('race');
	mountFilter('class');
	mountHtml();
	$('.show-filter__input').change(mountHtml);
	$('.jogo-filter__input').change(mountHtml);
	$('.race-filter__input').change(mountHtml);
	$('.class-filter__input').change(mountHtml);

	$('#show-filter__all').click(function(){
		$('.show-filter__input').prop('checked', true);
		mountHtml();
	});
	$('#show-filter__none').click(function(){
		$('.show-filter__input').prop('checked', false);
		mountHtml();
	});
}

const mountFilter = (filterType = 'race') => {
	const valuesArray = [...new Set(completeList.map( (item, index) => {
		return item[filterType];
	} ))].sort(function(a, b) {
		var valueA = a.toUpperCase(); // ignore upper and lowercase
		var valueB = b.toUpperCase(); // ignore upper and lowercase
		if (valueA < valueB) {
			return -1;
		}
		if (valueA > valueB) {
			return 1;
		}
		
		// values must be equal
		return 0;
	});

	valuesArray.forEach((item) => {
		$('#'+filterType+'-filter').append($(`
		<div class="filter-list__item">	
			<input checked id="${filterType}-filter--${item}" 
					class="${filterType}-filter__input"
					type="checkbox"
					name="${filterType}-filter"
					value="${item}">
			<label for="${filterType}-filter--${item}">${item}</label>
		</div>
		`));
	});
	$('#'+filterType+'-filter').append($(`
		<div class="break-line"></div>
		<button id="${filterType}-filter__all" class="${filterType}-filter__all">All</button>
		<button id="${filterType}-filter__none" class="${filterType}-filter__none">None</button>
	`));

	$('#'+filterType+'-filter__all').click(function(){
		$('.'+filterType+'-filter__input').prop('checked', true);
		mountHtml();
	});
	$('#'+filterType+'-filter__none').click(function(){
		$('.'+filterType+'-filter__input').prop('checked', false);
		mountHtml();
	});
}

const mountHtml = () => {
	const showFilters = $('.show-filter__input:checked').map(function () { return $(this).attr('value') } ).toArray();
	const jogoFilters = $('.jogo-filter__input:checked').map(function () { return $(this).attr('value') } ).toArray();
	const raceFilters = $('.race-filter__input:checked').map(function () { return $(this).attr('value') } ).toArray();
	const classFilters = $('.class-filter__input:checked').map(function () { return $(this).attr('value') } ).toArray();

	$('#selected_miniatures').empty();
	for(var i =0; i< completeList.length; i++){
		if(
			jogoFilters.indexOf(completeList[i].jogo) > -1 &&
			raceFilters.indexOf(completeList[i].race) > -1 &&
			classFilters.indexOf(completeList[i].class) > -1
		){
			$('#selected_miniatures').append($('<div class="miniature__info" id="miniature-'+ i +'"></div>'));
			
			if( showFilters.indexOf('image') > -1 ) {
				$('#miniature-'+i).append($('<img class="miniature__image" src="'+ completeList[i].image +'" />'));
			}
			if( showFilters.indexOf('quantidade') > -1 ) {
				$('#miniature-'+i).append($('<div>quantidade: '+ completeList[i].quantidade +'</div>'));
			}
			if( showFilters.indexOf('miniatura') > -1 ) {
				$('#miniature-'+i).append($('<div>miniatura: '+ completeList[i].miniatura +'</div>'));
			}
			if( showFilters.indexOf('jogo') > -1 ) {
				$('#miniature-'+i).append($('<div>jogo: '+ completeList[i].jogo +'</div>'));
			}
			if( showFilters.indexOf('race') > -1 ) {
				$('#miniature-'+i).append($('<div>race: '+ completeList[i].race +'</div>'));
			}
			if( showFilters.indexOf('class') > -1 ) {
				$('#miniature-'+i).append($('<div>class: '+ completeList[i].class +'</div>'));
			}
			if( showFilters.indexOf('size') > -1 ) {
				$('#miniature-'+i).append($('<div>size(squares): '+ completeList[i].size +'</div>'));
			}
		}
	}
}