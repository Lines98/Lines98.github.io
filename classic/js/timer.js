// JavaScript Document
function Timer() {
	this.hour= 0;
	this.minute= 0;
	this.second= 0;
	this.tick= 0;
	
	this.timer_image_loaded= 0;
	this.timer_image= null;
	
	//Number
	this.number_length= 2;
	this.number_width= 7;
	this.number_height= 13;
	this.number_spacing= 1;
	
	//Offset
	this.offset_x1= 171;
	this.offset_x2= 193;
	this.offset_x3= 216;
	this.offset_y= 31;
	
	this.init= function() {
		this.timer_image= new Image();
		this.timer_image.src= '/images/timer.png';		
		this.timer_image.onload= this.imageloaded();
	}

	this.imageloaded= function() {
		this.timer_image_loaded= 1;
		console.log('timer image loaded!');
	}
	
	this.show_time= function(ctx, time, x, y) {
		if (time< 0) {
			time= 0;
		}
		var number_str= time.toString();
		for (var i= number_str.length; i< this.number_length; i++) {
			number_str= '0'+ number_str;
		}

		for (var i=0; i< number_str.length; i++) {
			var sub_number= Math.floor(number_str[i]);
			ctx.drawImage(
				this.timer_image, 
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

	this.draw= function(ctx) {
		var d= new Date();
		if (this.tick!= d.getSeconds()) {
			this.tick= d.getSeconds();
			this.second++;
			if (this.second> 59) {
				this.second= 0;
				this.minute++;
			}
			if (this.minute> 59) {
				this.minute= 0;
				this.hour++;
			}
			if (this.hour> 99) {
				this.reset();
			}
		}
		//console.log(d.getSeconds());
		if (this.timer_image_loaded== 1) {
			this.show_time(ctx, this.hour, this.offset_x1, this.offset_y);
			this.show_time(ctx, this.minute, this.offset_x2, this.offset_y);
			this.show_time(ctx, this.second, this.offset_x3, this.offset_y);
		}
	}
	
	this.reset= function() {
		this.hour= 0;
		this.minute= 0;
		this.second= 0;
	}
	
	this.save_state= function() {
		var state_str= '';
		state_str+= this.hour.toString()+ '.';
		state_str+= this.minute.toString()+ '.';
		state_str+= this.second.toString();

		var d = new Date();
		d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
		document.cookie= "TM=" + state_str + ";expires=" + d.toUTCString() + ";path=/";
		console.log("Cookie Timer Saved: "+ state_str);
		return state_str;
	}
	
	this.restore_state= function(state_str) {
		var cookie= document.cookie;
		if (typeof(cookie)!= "undefined") {
			TM= cookie.split('TM=');
			if (TM.length>= 2) {
				state_str= TM[1].split(';')[0];				
				console.log("Cookie Timer Restore: "+ state_str);
				var STATE= state_str.split('.');		
				this.hour= Math.floor(STATE[0]);
				this.minute= Math.floor(STATE[1]);
				this.second= Math.floor(STATE[2]);
			} else {
				console.log("Cookie Timer Not Found!");
			}
		}
	}
}
