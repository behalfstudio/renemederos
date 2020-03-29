/**
 * NOTE: currently this works on Chrome. Other browsers are untested.
 * TODO:
 * - better fullscreen experience
 * - make it work with fonts other than monospace, esp. in fullscreen mode
 */

var input = document.querySelector('input.typewriter');
function resizeTF() {
  input.size = Math.max(1, input.value.length + 1);
}
function reposTFIfNeeded() {
  if(!document.webkitFullscreenElement) {
    input.style.left = 0;
    return;
  }
  var boxWidth = window.innerWidth;
  var theWidth = input.offsetWidth;
  var theMark = boxWidth/2;
  var thePos = theMark - theWidth;
  if(theWidth > boxWidth) {
    input.style.left = thePos + 'px';
  } else {
    input.style.left = 0;
  }
}
input.onkeyup = function(evt) {
  if(evt.keyCode === 8) {
    // `delete` button on a Mac
    resizeTF();
    reposTFIfNeeded();
    return;
  }
}
input.onkeypress = function(evt) {
  resizeTF();
  reposTFIfNeeded();
  // allow going fullscreen when 
  // the literal string 'fullscreen' is input
  ringBellsAndWistles(evt);
   var regex = new RegExp("^[a-zA-Z ]");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
}

/**
 * below are just bells and wistles that 
 * can be removed
 */

function ringBellsAndWistles(evt) {
  
  if(evt.keyCode === 13 && evt.target.value.trim() === 'fullscreen') {
    evt.target.value = '';
    resizeTF();
    reposTFIfNeeded();
    return requestFullScreen(document.body);
  }
  
}

/**
 * kudos to http://stackoverflow.com/a/7525760/3429055
 */
function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}