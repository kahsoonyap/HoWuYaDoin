var counter = 1;
var slide = d3.select("#slide");

var onKeyUp = function onKeyUp(event){
    var keyCode = event.keyCode;
    if (keyCode== 39){
	if (counter < 10){
	    counter++;
	}
    }
    if (keyCode==37){
	if (counter > 1){
	    counter--;
	}
    }
    slide.attr("src","../static/websocketpics/slide"+Math.round(counter)+".png");//.delay(1000).duration(1000);
    console.log(counter);
};

window.addEventListener("keyup",onKeyUp,false);
