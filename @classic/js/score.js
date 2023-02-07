// JavaScript Document
function Score() {
	this.score= 0;
	this.high_score= 0;
	this.last_score= 0;
	this.score_image_loaded= 0;
	this.score_image= null;

	//Number
	this.number_length= 5;
	this.number_width= 18;
	this.number_height= 35;
	this.number_spacing= 4;

	//Offset
	this.offset_x1= 28;
	this.offset_x2= 280;
	this.offset_y= 9;

	this.init= function () {
		this.score_image= new Image();
		this.score_image.src= './images/score.png';
		this.score_image.onload= this.imageloaded();

		var cookie= document.cookie;
		if (typeof(cookie)!= "undefined") {
			GS= cookie.split('GS=');
			if (GS.length>= 2) {
				this.score= Math.floor(GS[1].split(';')[0]);
			}

			GHS= cookie.split('GHS=');
			if (GHS.length>= 2) {
				this.high_score= Math.floor(GHS[1].split(';')[0]);
			}
		}
    	console.log('GS', this.score);
    	console.log('GHS', this.high_score);
	}

	this.imageloaded= function () {
		this.score_image_loaded= 1;
		console.log('score image loaded!');
	}

	this.show_score= function (ctx, score, x, y) {
		var number_str= score.toString();
		for (var i= number_str.length; i< this.number_length; i++) {
			number_str= '0'+ number_str;
		}

		for (var i=0; i< number_str.length; i++) {
			var sub_number= Math.floor(number_str[i]);
			ctx.drawImage(
				this.score_image,
				sub_number* this.number_width,
				0,
				this.number_width,
				this.number_height,
				x+ i* (this.number_width+ this.number_spacing),
				y,
				this.number_width,
				this.number_height
			);
		}
	}

	this.draw= function (ctx) {
		if (this.score_image_loaded== 1) {
			this.show_score(ctx, this.high_score, this.offset_x1, this.offset_y);
			if (this.score== 0) {
				ctx.save();
				ctx.globalAlpha = 0.5;
				this.show_score(ctx, this.last_score, this.offset_x2, this.offset_y);
				ctx.restore();
			} else {
				this.show_score(ctx, this.score, this.offset_x2, this.offset_y);
			}
		}
	}

	this.save_state= function() {
		var d = new Date();
		d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
		document.cookie= "GS=" + this.score + ";expires=" + d.toUTCString() + ";path=/";
		document.cookie= "GHS=" + this.high_score + ";expires=" + d.toUTCString() + ";path=/";
		console.log("Cookie Score & High Score Saved: "+ this.score+ " "+ this.high_score);
	}

	this.restore_state= function () {
		var cookie= document.cookie;
		if (typeof(cookie)!= "undefined") {
			GS= cookie.split('GS=');
			if (GS.length>= 2) {
				this.score= Math.floor(GS[1].split(';')[0]);
				console.log("Cookie Score Restore: "+ this.score);
			} else {
				console.log("Cookie Score Not Found!");
			}

			GHS= cookie.split('GHS=');
			if (GHS.length>= 2) {
				this.high_score=  Math.floor(GHS[1].split(';')[0]);
				console.log("Cookie High Score Restore: "+ this.high_score);
			} else {
				console.log("Cookie High Score Not Found!");
			}
		}
	}
}
