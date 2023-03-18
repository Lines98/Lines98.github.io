// JavaScript Document
var canvas_width= 410;
var canvas_height= 500;
var canvas_scale= 1;

function CanvasResize()
{
	window_width= window.innerWidth;
	window_height= window.innerHeight;

	if (document.fullscreenElement)
		window_height= window.innerHeight- 6;

	scale_width= window_width/canvas_width;
	scale_height= window_height/ canvas_height;
	if (scale_width> scale_height)
		canvas_scale= scale_height;
	else
		canvas_scale= scale_width;

	var canvas= document.querySelector('canvas');
	var ctx= canvas.getContext('2d');
	canvas.width= Math.floor(canvas_width* canvas_scale);
	canvas.height= Math.floor(canvas_height* canvas_scale);
	ctx.scale(canvas_scale, canvas_scale);
	console.log(canvas);
}
