function SimpleModal(modalId, modalOpenerId, modalCloserId){
	document.getElementById(modalCloserId).addEventListener("click", function(){
		document.getElementById(modalId).style.display = "none";
	});
	document.getElementById(modalOpenerId).addEventListener("click", function(){
		document.getElementById(modalId).style.display = "block";
	});
}