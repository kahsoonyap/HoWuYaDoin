//Loads when the page is ready
$(document).ready(function(){
//Variables
    var name = prompt("Please enter a name");
    var ws = io.connect("localhost:5000");
    var canvas = document.getElementById("drawcanvas");
    var context = canvas.getContext("2d");
    context.strokeStyle="black";
    context.lineWidth="5";
    var rect = canvas.getBoundingClientRect();
    var xPos;
    var yPos;
    var lastX;
    var lastY;
    var xPos2;
    var yPos2;
    var lastX2;
    var lastY2;
    var isDrawing2 = false;
    var isDrawing = false;
    var drawer = false;

    //Tells server to let all clients that are connected
    //a new client has connected
    ws.emit("clientMessage", {msg:""+name+" has connected.", nam:"Server"});

//Chat

    //When the client recieves data with 'serverMessage'
    //add the name of the sender and the message
    //to the chat box
    ws.on("serverMessage", function(data){
	$("#chat").append("<p>" + data.nam + ": " + data.msg + "</p>");
    });

    //When the button is pressed emit the data in the
    //chat bar to the server. The chat bar is
    //then cleared.
    var sendMessage = function sendMessage(){
	ws.emit("clientMessage", {msg: document.getElementById("chatBar").value, nam: name});
	document.getElementById("chatBar").value="";
    };

    //event listener
    var sendMsg = document.getElementById("sendMsg");
    sendMsg.addEventListener("click", sendMessage);


//Drawing

    //When the client recieves data with 'drawing'
    //move the pen to the same position as the drawer's
    //If the drawer's mouse is down, lines will be drawn
    ws.on("drawing",function(coordData){
	if (!drawer){
	    xPos2 = coordData[0];
	    yPos2 = coordData[1];
	    context.lineWidth = coordData[2];
	    console.log(xPos2+" "+yPos2);
	    context.beginPath();
	    context.lineJoin="round";
	    context.moveTo(lastX2,lastY2);
	    context.lineTo(xPos2,yPos2);
	    context.closePath();
	    context.stroke();
	    lastX2 = xPos2;
	    lastY2 = yPos2;
	}
    });
    

    //Moves the pen. If mouse is down emit data about the
    //pen's position to the server.
    var draw = function changeColor(event){
	var rect = canvas.getBoundingClientRect(); 
	xPos = (event.clientX-rect.left)/(rect.right-rect.left)*canvas.width;
	yPos = (event.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height;
	if (isDrawing){
	    ws.emit("coordinates",{"x":xPos,"y":yPos,"ctx": context.strokeStyle, "width": context.lineWidth,"isDrawing": isDrawing});
	    context.beginPath();
	    context.lineJoin="round";
	    context.moveTo(lastX,lastY);
	    context.lineTo(xPos,yPos);
	    context.closePath();
	    context.stroke();
	};
	lastX = xPos;
	lastY = yPos;
    };

    //Change cursor depending if mouse is down or not
    var drawing = function drawing(e){
	canvas.style.cursor="crosshair";
	isDrawing=true;
	drawer = true;
    };
    var notDraw = function notDraw(e){
	canvas.style.cursor="default";
	isDrawing=false;
	drawer = false;
    };

    //event listeners
    canvas.addEventListener("mousemove",draw);
    canvas.addEventListener("mousedown",drawing);
    canvas.addEventListener("mouseup",notDraw);
    canvas.addEventListener("mouseout",notDraw);


    //When the user closes the page, let the server know
    //to broadcast the client has disconnected  
    window.onunload = function leaving(){
	ws.emit("clientMessage", {msg:""+name+" has disconnected.", nam:"Server"});
    }
});

