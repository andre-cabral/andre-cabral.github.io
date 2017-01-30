function Carousel(carouselScreenshotsSrc, carouselScreenshotImgClass, carouselThumbsClass, carouselThumbsIdVal, carouselSelectedThumb){

	var carouselScreenshots = carouselScreenshotsSrc; 
	var carouselScreenshot_img = jQuery(carouselScreenshotImgClass); 
	var carouselThumbs = jQuery(carouselThumbsClass); 
	var carouselThumbsId = carouselThumbsIdVal;
	var carouselSelectedThumbClass = carouselSelectedThumb.replace(".","");
	var carouselActualNumber = 0;
	var carouselTotalNumber = carouselScreenshots.length; 

	function goToNumber(numberToGo){ 
		carouselThumbs.removeClass(carouselSelectedThumbClass); 
		if(carouselScreenshots.length > numberToGo){ 
			carouselScreenshot_img.attr("src", carouselScreenshots[numberToGo]); 
			jQuery(carouselThumbsId + numberToGo).addClass(carouselSelectedThumbClass); 
			carouselActualNumber = numberToGo; 
		}else{ 
			carouselScreenshot_img.attr("src", carouselScreenshots[0]); 
			jQuery(carouselThumbsId+"0").addClass(carouselSelectedThumbClass); 
			carouselActualNumber = 0; 
		}
	}

	function nextNumber(){ 
		goToNumber(carouselActualNumber + 1); 
	} 

	function previousNumber(){ 
		if(carouselActualNumber > 0){
			goToNumber(carouselActualNumber - 1); 
		}else{
			goToNumber(carouselScreenshots.length - 1); 
		}
	}

	carouselThumbs.click(function(){ 
		goToNumber(this.id.substring(carouselThumbsId.length-1)); 
	});
}