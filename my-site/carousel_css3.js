function CarouselCSS3(carouselContainerId, startingId, contentPrefix, menuPrefix, allIds, contentClass, menuContentClass, useBrowserHash = true, appearLeftClass = "appear-left", appearRightClass = "appear-right", disapperLeftClass = "disappear-left", disappearRightClass = "disappear-right", dontShowClass = "dont-show"){

	var actualId = startingId;

	function changeContent(idToGo){
		if(idToGo != actualId){
			var actualIdElement = document.getElementById(contentPrefix+actualId);
			var idToGoElement = document.getElementById(contentPrefix+idToGo);
			if(getIdIndex(actualId) < getIdIndex(idToGo)){
				actualId = idToGo;
				actualIdElement.className = contentClass +" "+ disapperLeftClass;
				idToGoElement.className = contentClass +" "+ appearRightClass;
			}else{
				actualId = idToGo;
				actualIdElement.className = contentClass +" "+ disappearRightClass;
				idToGoElement.className = contentClass +" "+ appearLeftClass;
			}
		}
	}

	function getIdIndex(idName){
		for(var i=0; i<allIds.length; i++){
			if(allIds[i] == idName){
				return i;
			}
		}
		return 1000203;
	}

	function getGreaterHeight(){
		var greaterHeight = 0;
		for(var i=0; i<allIds.length; i++){
			var elementToCheck = document.getElementById(contentPrefix+allIds[i]);
			if(elementToCheck.offsetHeight > greaterHeight){
				greaterHeight = elementToCheck.offsetHeight;
			}
		}

		return greaterHeight + "px";
	}

	if(useBrowserHash){
		if(document.location.hash != ""){
			var changerIdToGo = document.location.hash.substring(1);
			var hashExists = false;
			for(var i=0; i<allIds.length; i++){
				if(allIds[i] == changerIdToGo){
					hashExists = true;
					actualId = allIds[i];
					document.getElementById(contentPrefix+allIds[i]).className = contentClass;
				}
			}

			if(hashExists){
				for(var i=0; i<allIds.length; i++){
					if(allIds[i] != changerIdToGo){
						document.getElementById(contentPrefix+allIds[i]).className = contentClass +" "+ dontShowClass;
					}
				}
			}
		}
	}

	for(var i=0; i<allIds.length; i++){
		document.getElementById(menuPrefix+allIds[i]).addEventListener("click", function(){
			changeContent( this.id.substring(menuPrefix.length) );				
		});
	}

	this.addContentChanger = function(contentChangerId, changerIdToGo){
		document.getElementById(contentChangerId).addEventListener("click", function(){
			changeContent( changerIdToGo );				
		});
	}

	//height resizing container to get the height of position:absolute
	document.getElementById(carouselContainerId).style.height = getGreaterHeight();
	window.addEventListener('load', 
	function(){
		document.getElementById(carouselContainerId).style.height = getGreaterHeight();
	}, false);
	window.addEventListener('resize', 
	function(){
		document.getElementById(carouselContainerId).style.height = getGreaterHeight();
	}, false);
}