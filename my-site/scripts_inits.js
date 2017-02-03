(function(){
/****/
/*SIMPLE MODAL INIT START*/
/****/
var simpleModalGoblin = new SimpleModal("modal-container-goblin", "modal-opener-goblin", "modal-closer-goblin");
var simpleModalGoblin = new SimpleModal("modal-container-human", "modal-opener-human", "modal-closer-human");
/****/
/*SIMPLE MODAL INIT END*/
/****/

/****/
/*SIMPLE CAROUSEL INIT START*/
/****/
var carouselScreenshotsGoblin = [
"jogos/goblin.png",
"jogos/goblin2.png",
"jogos/goblin3.png",	
"jogos/goblin4.png",
"jogos/goblin.png"
]; 
var carouselScreenshotImgClassGoblin = ".carousel_screenshot_img_goblin"; 
var carouselThumbsGoblin = ".carousel_thumbs_goblin";
var carouselThumbsIdGoblin = "#carousel_thumbs_goblin_";
var carouselSelectedThumbClassGoblin = ".selected_thumb";

var carouselGoblin = new Carousel(
	carouselScreenshotsGoblin,
	carouselScreenshotImgClassGoblin,
	carouselThumbsGoblin,
	carouselThumbsIdGoblin,
	carouselSelectedThumbClassGoblin
);

var carouselScreenshotshuman = [
"jogos/human.png",
"jogos/human2.png",
"jogos/human3.png",	
"jogos/human4.png",
"jogos/human.png"
]; 
var carouselScreenshotImgClasshuman = ".carousel_screenshot_img_human"; 
var carouselThumbshuman = ".carousel_thumbs_human";
var carouselThumbsIdhuman = "#carousel_thumbs_human_";
var carouselSelectedThumbClasshuman = ".selected_thumb";

var carouselhuman = new Carousel(
	carouselScreenshotshuman,
	carouselScreenshotImgClasshuman,
	carouselThumbshuman,
	carouselThumbsIdhuman,
	carouselSelectedThumbClasshuman
);
/****/
/*SIMPLE CAROUSEL INIT END*/
/****/

/****/
/*CSS3 CAROUSEL INIT START*/
/****/
var carouselContainerId = "site-css3-carousel-container";
var startingId = "home";
var contentPrefix = "content-";
var menuPrefix = "menu-content-";
var allIds = ["home","jogos","sites","contato"];
var contentClass = "content";
var menuContentClass = "menu-content";

var carouselContent = new CarouselCSS3(
	carouselContainerId,
	startingId,
	contentPrefix,
	menuPrefix,
	allIds,
	contentClass,
	menuContentClass
);

carouselContent.addContentChanger("site-title-changer-to-home", "home");
carouselContent.addContentChanger("sites-home-changer", "sites");
carouselContent.addContentChanger("jogos-home-changer", "jogos");
/****/
/*CSS3 CAROUSEL INIT END*/
/****/
})();