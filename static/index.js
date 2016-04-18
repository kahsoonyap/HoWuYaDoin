var counter = 1;
var slide = d3.select("#slide");
var slides = {1: "../static/websocketpics/slide1.png", 
	      2: "../static/websocketpics/slide2.png",
	      3: "../static/websocketpics/slide3.png",
	      4: "../static/websocketpics/slide4.png",
	      5: "../static/websocketpics/slide5.png",
	      6: "../static/websocketpics/slide6.png",
	      7: "../static/websocketpics/slide7.png",
	      8: "../static/websocketpics/slide8.png",
	      9: "../static/websocketpics/slide9.png",
	      10: "../static/websocketpics/slide10.png"};

var onKeyUp = function onKeyUp(event){
    var keyCode = event.keyCode;
    if (keyCode== 39){
	if (counter < 10){
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
