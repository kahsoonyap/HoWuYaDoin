var counter = 1;
var slide = d3.select("#slide");
var onKeyUp = function onKeyUp(event){
    var keyCode = event.keyCode;
    if (keyCode== 39){
	if (counter < 16){
	    counter++;
	    slide.transition()
		.duration(500)
		.style("opacity", 0);
	    slide.transition()
		.delay(500)
		.duration(2000)
		.style("opacity", 100);
	}
    }
    if (keyCode==37){
	if (counter > 1){
	    counter--;
	    slide.transition()
		.duration(500)
		.style("opacity", 0);
	    slide.transition()
		.delay(500)
		.duration(2000)
		.style("opacity", 100);
	}
    }
    setTimeout(function(){
	slide.attr("src", "../static/websocketpics/slide"+Math.round(counter)+".png")}, 500);
    console.log(counter);
};

window.addEventListener("keyup",onKeyUp,false);
