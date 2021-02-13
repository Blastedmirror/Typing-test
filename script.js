const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var running = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(timer){
  var res = timer;
  if(timer<=9){
    res = "0"+timer;
  }
  return res;
}

// Run a standard minute/second/hundredths timer:
function setTimer(){

  var timerString = leadingZero(timer[0])+":"+leadingZero(timer[1])+":"+leadingZero(timer[2]);
  theTimer.innerHTML = timerString;
  timer[3]++;
  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100)-(timer[0]*60));
  timer[2] = Math.floor(timer[3]-(timer[1]*100) - timer[0]*6000);
}

// Match the text entered with the provided text on the page:
function spellCheak(){
  let element = testArea.value;
  let targetTest = originText.substring(0,element.length);
  if(element == originText){
    clearInterval(interval);
    testWrapper.style.borderColor = "green";
  }else{
    if(element == targetTest){
      testWrapper.style.borderColor = "blue";
    }
    else{
      testWrapper.style.borderColor = "red";
    }
  }
  // console.log(element);
}

// Start the timer:
function start(){
  let elementLength = testArea.value.length;
  if(elementLength == 0 && !running){
    running = true;
    interval = setInterval(setTimer,10);
  }
  // console.log(elementLength);
}

// Reset everything:
function reset(){
   clearInterval(interval);
   interval = null;
   timer = [0,0,0,0];
   running = false;

   testArea.value = "";
   testWrapper.style.borderColor = "grey";
   theTimer.innerHTML = "00:00:00";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellCheak,false);
resetButton.addEventListener("click",reset,false);
