// JavaScript Document
function Ball(color, status)
{
	//color= 0..7

	/* status
	0 - inactive
	1 - hint
	2 - display
	3 - ready to move (jumping)
	4 - moving
	5 - exploding
	6 - growing
	*/

	this.border= 2;
	this.width= 40;
	this.height= 40;
	this.balls_image_loaded= 0;

	this.color= 0;
	this.status= 0;

	//Animation Control
	this.frame_begin= 0;
	this.frame_end= 0;
	this.frame_current= 0;
	this.delay= 4;
	this.delay_count= 0;

	this.init= function ()
	{
		this.balls_image= new Image();
		this.balls_image.src= './images/balls.png';
		this.balls_image.onload= this.imageloaded();
	}

	this.imageloaded= function ()
	{
		this.balls_image_loaded= 1;
		console.log('balls image loaded!');
	}

	this.draw= function (ctx, x, y, w, h)
	{
		sx= this.frame_current* this.width;
		sy= (this.color- 1)* this.height;

		x= x+ (w- this.width) / 2;
		y= y+ (h- this.height) / 2;

		if (this.balls_image_loaded== 1)
			ctx.drawImage(this.balls_image, sx, sy, this.width, this.height, x, y, this.width, this.height);

		//ctx.fillStyle = 'yellow';
		//ctx.fillText('c'+ this.color, x, y+ 15);
		//ctx.fillText('s'+ this.status, x, y+ 30);
		//ctx.beginPath();
		//ctx.fillStyle= 'rgba(255, 0, 255, 0.5)';
		//ctx.fillRect(x, y, w, h);
	}
}
