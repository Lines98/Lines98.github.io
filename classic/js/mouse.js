// JavaScript Document

var mouse_X= null;
var mouse_Y= null;
var mouse_SX;
var mouse_SY;
var mouse_IsDown;
var mouse_Clicked;

function MouseInit()
{
	var canvas= document.querySelector('canvas');
	canvas.addEventListener('touchenter', MouseDown, false);
	canvas.addEventListener('touchmove', MouseMove, false);
	canvas.addEventListener('touchleave', MouseUp, false);
	
	canvas.addEventListener('mousedown', MouseDown, false);
	canvas.addEventListener('mousemove', MouseMove, false);
	canvas.addEventListener('mouseup', MouseUp, false);
}

function MouseMove(ev)
{	
	
	// Opera
	if (ev.offsetX || ev.offsetX == 0) 
  	{
    	mouse_X = ev.offsetX;
    	mouse_Y = ev.offsetY;
		
		//console.log('offsetX:'+ mouse_X+ ':'+ mouse_Y);
	}

	// Firefox
	else if (ev.layerX || ev.layerX == 0) 
	{
	    mouse_X = ev.layerX;
	    mouse_Y = ev.layerY;		
		//console.log('layerX:'+ mouse_X+ ':'+ mouse_Y);
  	}

	//Safari
	else if (ev.pageX || ev.pageX == 0) 
	{
		mouse_X = ev.pageX;
    	mouse_Y = ev.pageY;
		//console.log('pageX:'+ mouse_X+ ':'+ mouse_Y);
	}
	
	mouse_SX= Math.floor(mouse_X/ canvas_scale);
	mouse_SY= Math.floor(mouse_Y/ canvas_scale);
	
	//console.log('mouse:'+ mouse_X+ ':'+ mouse_Y+ ':'+ mouse_SX+ ':'+ mouse_SY);
}

function MouseUp(ev)
{
	//console.log('Mouse Up');
	mouse_IsDown = false;
	mouse_Clicked= true;
	MouseMove(ev);
}

function MouseDown(ev)
{
	//console.log('Mouse Down');
	mouse_IsDown = true;
	MouseMove(ev);
}

function MouseIsClicked()
{
	if (mouse_Clicked)
	{
		console.log('Mouse Clicked:'+ mouse_SX+ ':'+ mouse_SY);
		mouse_Clicked= false;
		return true;
	}
	return false;
}
