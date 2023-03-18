// JavaScript Document
function Switch()
{
	/* status
	0 - Off
	1 - On
	2 - ...
	*/

	//Base Postion
	this.offset_x= 3;
	this.offset_y= 463;

	this.width= 64;
	this.height= 34;
	this.status= 1; //On for default
	this.max_status= 1;
	this.postion_x= 0;
	this.postion_y= 0;
	this.id= 0;
  this.name= '';
	this.status_change= 0;

	this.switch_image_loaded= 0;
	this.switch_image= null;

	this.init= function (id, name= '')
	{
    this.id= id;
    this.name= name;
		this.switch_image= new Image();
		this.switch_image.src= './images/switch.png';
		this.switch_image.onload= this.imageloaded();

    var cookie= document.cookie;
    if (typeof(cookie)!= "undefined")
    {
      SS= cookie.split(this.name + '=');
      if (SS.length>= 2)
        this.status= SS[1].split(';')[0];
    }
    console.log('SW', this.name, this.status);
	}

	this.imageloaded= function ()
	{
		this.switch_image_loaded= 1;
		console.log('switch image loaded!');
	}

	this.draw= function (ctx, x, y)
	{
		//console.log(this.id);
		this.postion_x= x;
		this.postion_y= y;
		if (this.switch_image_loaded== 1)
			ctx.drawImage(this.switch_image, this.id* this.width , this.status* this.height, this.width, this.height, this.offset_x+ x, this.offset_y+ y, this.width, this.height);
	}

	this.turn= function ()
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

		this.status_change= 1;
		this.status++;
		if (this.status> this.max_status)
			this.status= 0;

    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie= this.name + "=" + this.status + ";expires=" + d.toUTCString() + ";path=/";
	}
}
