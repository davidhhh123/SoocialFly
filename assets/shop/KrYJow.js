;(function(){

  setTimeout(function(){
    console.log("Made by @benjaminhoegh");
  },100);
	
	var elem = document.createElement('div');
	elem.setAttribute('data-pen-credit','');
	document.body.appendChild(elem);

	function check() {

  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    console.log('not fullscreen');
    $("#videoContainer").removeClass("videoContainer");
    $("#videoContainer").addClass('c');
    $(".s").addClass('ion-md-expand');


      $(".s").removeClass('ion-md-contract');

    document.getElementsByClassName("vcard")[0].style.display = "block";
  } else {
    console.log('fullscreen');
    document.getElementsByClassName("vcard")[0].style.display = "none";
  }
}
["", "webkit", "moz", "ms"].forEach(
    prefix => document.addEventListener(prefix+"fullscreenchange", check, false)
);
	
//  var el = document.querySelector('[data-pen-credit]');

//  if ( el ) {
 
//    el.className += ' kf_credit';
    
//   var hasText = el.innerHTML.length;
//    el.insertAdjacentHTML('afterbegin', `
//html
//);

//css    document.head.insertAdjacentHTML('beforeend',`<style>
//); 
  }

)();