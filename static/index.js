var counter = 1;
var slide = d3.select("#slide");
var onKeyUp = function onKeyUp(event){
    var keyCode = event.keyCode;
    if (keyCode== 39){
	if (counter < 16){
	    counter++;
	}
    }
    if (keyCode==37){
	if (counter > 1){
	    counter--;
	}
    }
    slide.attr("src","../static/websocketpics/slide"+counter+".png");
};

window.addEventListener("keyup",onKeyUp,false);
