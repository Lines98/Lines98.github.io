// JavaScript Document
function Button()
{
	/* status
	0 - Disable
	1 - Normal
	2 - Hover
	3 - Pressed
	*/

	//Base Postion
	this.offset_x= 332;
	this.offset_y= 463;

	this.width= 34;
	this.height= 34;
	this.status= 1; //Apear for default
	this.status_default= 1;
	this.postion_x= 0;
	this.postion_y= 0;
	this.id= 0;
	this.button_image_loaded= 0;
	this.button_image= null;

	this.init= function (id)
	{
		this.id= id;
		this.button_image= new Image();
		this.button_image.src= './images/button.png';
		this.button_image.onload= this.imageloaded();
	}

	this.imageloaded= function ()
	{
		this.button_image_loaded= 1;
		console.log('button image loaded!');
	}

	this.draw= function (ctx, x, y)
	{
		//console.log(this.id);
		this.postion_x= x;
		this.postion_y= y;
		if (this.button_image_loaded== 1)
			ctx.drawImage(this.button_image, this.id* this.width , this.status* this.height, this.width, this.height, this.offset_x+ x, this.offset_y+ y, this.width, this.height);

		this.status= this.status_default;
	}

	this.hover= function ()
	{
		if (!mouse_SX || !mouse_SY)
			return;

		if (mouse_SX< this.offset_x+ this.postion_x)
			return;

		if (mouse_SX> this.offset_x+ this.postion_x+ this.width)
			return;

		if (mouse_SY< this.offset_y+ this.postion_y)
			return;

		if (mouse_SY> this.offset_y+ this.postion_y+ this.height)
			return;

		//console.log('button hover'+ mouse_SX);
		if (this.status!= 0)
			this.status= 2;
	}

	this.pressed= function ()
	{
		if (!mouse_SX || !mouse_SY)
			return;

		if (mouse_SX< this.offset_x+ this.postion_x)
			return;

		if (mouse_SX> this.offset_x+ this.postion_x+ this.width)
			return;

		if (mouse_SY< this.offset_y+ this.postion_y)
			return;

		if (mouse_SY> this.offset_y+ this.postion_y+ this.height)
			return;

		console.log('button pressed');
		if (this.status!= 0)
			this.status= 3;
	}
}