// JavaScript Document
function Board()
{
	//Board Specs
	this.cols= 9;
	this.rows= 9;
	this.nodes= this.cols* this.rows;

	this.ball_init= 7;
	this.ball_hint= 3;
	this.ball_explode= 5;

	//Ball Specs
	this.ball_width= 44;
	this.ball_height= 44;
	this.BALL_ARRAY= [];

	//Interface
	this.spacing= 1;
	this.border= 3;
	this.offset_x= 0;
	this.offset_y= 51;
	this.board_image= null;
	this.board_image_loaded= 0;

	//Control
	this.ball_selected= -1;

	//Status
	this.board_full= 0;
	this.board_moving= 0;
	this.board_changing= 0;
	this.board_changed= 0;
	this.board_grow= 0;
	this.board_score= 0;
	this.board_status_no_move= 0;
	this.board_status_selected= 0;


	//Moving Animation
	this.MOVE_PATH= [];
	this.ball_moving_color= -1;
	this.ball_saved_node= -1;
	this.ball_saved_color= -1;
	this.ball_saved_status= -1;

	this.board_last_state= '';

	this.init= function () {
    	//Board
		this.board_image= new Image();
		this.board_image.src= './images/board.png';
		this.board_image.onload= this.imageloaded();

		//Ball
		this.BALL_ARRAY= [];
		for (var node=0; node< this.nodes; node++) {
			var ball= new Ball(0, 0);
			ball.init();
			this.BALL_ARRAY.push(ball);
		}
	}

	this.reset= function () {
		//reset board
		for (var node=0; node< board.nodes; node++) {
			//this.BALL_ARRAY[node].color= 0;
			this.BALL_ARRAY[node].status= 5;
		}

		var BLANK= [];
		for (var i=0; i< this.ball_init; i++) {
			do {
				node= Math.floor(Math.random()* (this.nodes - 0.1));
				console.log(node);
			} while (BLANK.indexOf(node)>= 0);
			BLANK.push(node);
			if (this.BALL_ARRAY[node].color<= 0) {
				this.BALL_ARRAY[node].color= 1+ Math.floor(Math.random()* 6.9);
			}
			this.BALL_ARRAY[node].status= 2;
		}

		for (var i=0; i< this.ball_hint; i++) {
			do {
				node= Math.floor(Math.random()* (this.nodes - 0.1));
			} while (BLANK.indexOf(node)>= 0);
			BLANK.push(node);
			if (this.BALL_ARRAY[node].color<= 0) {
				this.BALL_ARRAY[node].color= 1+ Math.floor(Math.random()* 6.9);
			}
			this.BALL_ARRAY[node].status= 1;
		}
		this.board_last_state= '';
		console.log(BLANK);
	}

	this.imageloaded= function () {
		this.board_image_loaded= 1;
		//console.log(this.board_image);
		//console.log(this.board_image_loaded);
		console.log('board image loaded!');
	}

	this.check_line= function () {
		//MATCH5?
		var ball_count= 0;
		console.log('check line');
		this.board_score= 0;
		for (var y=0; y< this.rows; y++) {
			for (var x=0; x< this.cols; x++) {
				if (this.BALL_ARRAY[y* this.rows+ x].status== 2) {
					ball_count++;
				}

				for (var d=0; d< 4; d++) {
					var dx= 0;
					var dy= 0;

					if (d==0 || d== 2 || d== 3)
						dx= 1;

					if (d== 1 || d== 2)
						dy= 1;

					if (d== 3)
						dy= -1;

					cols= x;
					rows= y;
					var LINE= [];
					//console.log('D:'+ d+':'+ dx+ ':'+ dy);
					while (
						cols>=0 &&
						rows>= 0 &&
						cols< this.cols &&
						rows< this.rows &&
						this.BALL_ARRAY[y* this.rows+ x].status>= 2 &&
						this.BALL_ARRAY[rows* this.rows+ cols].status>= 2 &&
						this.BALL_ARRAY[rows* this.rows+ cols].color> 0 &&
						this.BALL_ARRAY[y* this.rows+ x].color== this.BALL_ARRAY[rows* this.rows+ cols].color) {
						LINE.push(rows* this.rows+ cols);
						cols+= dx;
						rows+= dy;
					}
					//console.log(LINE);
					if (LINE.length>= this.ball_explode) {
						this.board_score+= LINE.length;
						ball_count-= this.board_score;

						for (var i=0; i< LINE.length; i++) {
							this.BALL_ARRAY[LINE[i]].status= 5;
						}
					}
				}
			}
		}

		if (ball_count>= this.nodes) {
			this.board_full= 1;
		}

		if (this.board_score> 0) {
			this.board_last_state= this.save_state();
		}
		console.log('ball count:'+ ball_count);
	}

	this.animation_moving= function ()
	{
		//Moving Animation
		if (this.MOVE_PATH.length> 0) {
			console.log('MOVEPATH:'+ this.MOVE_PATH);
			node= this.MOVE_PATH.shift();

			if (this.ball_saved_node>= 0) {
				console.log('move:'+ this.ball_saved_node+ ':'+ node);
				this.BALL_ARRAY[this.ball_saved_node].color= this.ball_saved_color;
				this.BALL_ARRAY[this.ball_saved_node].status= this.ball_saved_status;
			} else {
				console.log('begin:'+ node);
			}

			this.ball_saved_node= node;
			this.ball_saved_color= this.BALL_ARRAY[node].color;
			this.ball_saved_status= this.BALL_ARRAY[node].status;

			this.BALL_ARRAY[node].color= this.ball_moving_color;
			this.BALL_ARRAY[node].status= 4;
		} else if (this.board_moving== 1) {
			console.log('finish:'+ this.ball_saved_node);
			this.BALL_ARRAY[this.ball_saved_node].color= this.ball_moving_color;
			this.BALL_ARRAY[this.ball_saved_node].status= 2;
			this.board_moving= 0;
			this.board_changed= 1;
		}
	}

	this.animation= function () {
		this.board_changing= 0;
		for (var node=0; node< this.nodes; node++) {
			var ball= this.BALL_ARRAY[node];
			if (ball.status== 0) {
				ball.frame_begin= 17;
				ball.frame_end= 17;
			} else if (ball.status== 1) {
				//hint
				ball.frame_begin= 17;
				ball.frame_end= 17;
			} else if (ball.status== 2) {
				//display
				ball.frame_begin= 0;
				ball.frame_end= 0;
			} else if (ball.status== 3) {
				//jumping
				ball.frame_begin= 0;
				ball.frame_end= 6;
			} else if (ball.status== 4) {
				//moving
				ball.frame_begin= 0;
				ball.frame_end= 0;
			} else if (ball.status== 5) {
				//exploding
				this.board_changing= 1;
				ball.frame_begin= 7;
				ball.frame_end= 16;
			} else if (ball.status== 6) {
				//growing
				this.board_changing= 1;
				ball.frame_begin= 17;
				ball.frame_end= 21;
			}

			if (ball.frame_current< ball.frame_begin) {
				ball.frame_current= ball.frame_begin;
			}

			if (ball.frame_current> ball.frame_end) {
				ball.frame_current= ball.frame_end;
			}

			//Animation Frame
			ball.delay_count++;
			if (ball.delay_count> ball.delay) {
				ball.delay_count= 0;

				if (ball.frame_current<= ball.frame_end) {
					ball.frame_current++;
				}

				if (ball.frame_current> ball.frame_end) {
					if (ball.status== 5) {
						//explode to disapear
						if (this.ball_saved_node== node) {
							ball.color=this.ball_saved_color;
							ball.status= this.ball_saved_status;
							this.animation();
						} else {
							ball.color= 0;
							ball.status= 0;
							this.animation();
							this.board_changed= 1;
						}
					}

					if (ball.status== 6) {
						//grow to display
						ball.status= 2;
						this.animation();
						this.board_changed= 1;
					}
					ball.frame_current= ball.frame_begin;
				}
			}
		}
	}

	this.grow= function () {
		console.log('grow');

		var hint= 0;
		for (node=0; node< this.nodes; node++) {
			if (this.BALL_ARRAY[node].status== 1) {
				this.BALL_ARRAY[node].status= 6;
				hint++;
			}
		}

		//Add some balls
		for (var i=hint; i< this.ball_hint; i++) {
			var b= this.get_blank();
			var color= 1+ Math.floor(Math.random()* 6.9);
			if (b>= 0) {
				this.BALL_ARRAY[b].color= color;
				this.BALL_ARRAY[b].status= 6;
			} else {
				this.board_full= 1;
			}
		}

		//New hint ball
		for (var i=0; i< this.ball_hint; i++) {
			var b= this.get_blank();
			var color= 1+ Math.floor(Math.random()* 6.9);
			if (b>= 0) {
				this.BALL_ARRAY[b].color= color;
				this.BALL_ARRAY[b].status= 1;
			}
		}
	}

	this.over= function() {
		//for (node=0; node< this.nodes; node++)
			//this.BALL_ARRAY[node].status= 7;

		console.log('GAMEOVER');
		this.reset();
	}

	this.draw= function (ctx) {
		//console.log(this.board_image_loaded);
		//console.log(this.board_image);
		if (this.board_image_loaded== 1) {
			ctx.drawImage(this.board_image, this.offset_x, this.offset_y, this.board_image.width, this.board_image.height);
		}

		for (var y=0; y<this.rows; y++) {
			for (var x=0; x< this.cols; x++)
			{
				this.BALL_ARRAY[y* this.rows+ x].draw(
					ctx,
					this.offset_x+ this.border+ x* (this.ball_width+ this.spacing),
					this.offset_y+ this.border+ y* (this.ball_height+ this.spacing),
					this.ball_width,
					this.ball_height);
			}
		}
	}

	this.select_ball= function () {
		if (!mouse_SX || !mouse_SY) {
			return;
		}

		x= Math.floor((mouse_SX- this.offset_x- this.border)/ (this.ball_width+ this.spacing));
		y= Math.floor((mouse_SY- this.offset_y- this.border)/ (this.ball_height+ this.spacing));
		node= y* this.rows+ x;

		if (node< 0 || node>= this.nodes) {
			return;
		}

		if (node== this.ball_selected) {
			return;
		}

		console.log('click: '+ node);

		if (this.BALL_ARRAY[node].status<= 1 || this.BALL_ARRAY[node].color== 0) {
			//Move ball
			console.log('move ball:'+ node);
			this.board_last_state= this.save_state();
			this.move_ball(node);
			return;
		}

		if (this.ball_selected>= 0) {
			console.log('unselect ball:'+ this.ball_selected);
			this.BALL_ARRAY[this.ball_selected].status= 2;
			this.ball_selected= -1;
		}

		if (this.BALL_ARRAY[node].status== 2) {
			this.board_status_selected= 1;
			this.ball_saved_node= -1;
			console.log('select ball:'+ node);
			this.BALL_ARRAY[node].status= 3;
			this.ball_selected= node;
		}
	}

	this.move_ball= function (dest) {
		//Initalize
		if (this.ball_selected< 0) {
			return;
		}

		source= this.ball_selected;

		console.log('move ball:'+ node);
		console.log('source:'+ source+ ' dest:'+ dest);

		//Dijkstra Algorithm
		var VISITED= [];
		var DISTANCE= [];
		var ROUTE= [];

		for (var i=0; i< this.nodes; i++) {
			VISITED.push(0);
			DISTANCE.push(this.distance(source, i));
			ROUTE.push(source);
		}
		console.log('D:'+ DISTANCE);

		all_visited= 0;
		next_node= source;

		while (all_visited== 0) {
			//console.log('visited:'+ next_node);
			VISITED[next_node]= 1;

			for (i= 0; i< DISTANCE.length; i++) {
				if (DISTANCE[next_node]+ this.distance(next_node, i)< DISTANCE[i])
				{
					DISTANCE[i]= DISTANCE[next_node]+ this.distance(next_node, i);
					ROUTE[i]= next_node;
				}
			}

			//Find next node
			all_visited= 1;
			min_distance= this.nodes+ 1;
			for (i=0; i< VISITED.length; i++) {
				if (VISITED[i]== 0) {
					if (min_distance> DISTANCE[i]) {
						min_distance= DISTANCE[i];
						all_visited= 0;
						next_node= i;
					}
				}
			}
		}

		console.log('V:'+ VISITED);
		console.log('D:'+ DISTANCE);
		console.log('R:'+ ROUTE);

		//Found Route
		if (DISTANCE[dest]< this.nodes) {
			this.board_moving= 1;
			this.ball_selected= -1;
			this.board_grow= 1;

			this.MOVE_PATH= [];
			trace= dest;
			while (trace!= source) {
				this.MOVE_PATH.unshift(trace);
				trace= ROUTE[trace];
			}
			this.MOVE_PATH.unshift(source);
			//console.log('MOVEPATH:'+ this.MOVE_PATH);

			this.ball_moving_color= this.BALL_ARRAY[source].color;
			this.BALL_ARRAY[source].color= 0;
			this.BALL_ARRAY[source].status= 0;
		}
		else {
			this.board_status_no_move= 1;
		}
	}

	this.distance= function (source, dest) {
		if (this.BALL_ARRAY[dest].status>= 2 && this.BALL_ARRAY[dest].color> 0) {
			return this.nodes+ 1;
		}

		if (dest- source== this.cols) {
			return 1;
		}

		if (source- dest== this.cols) {
			return 1;
		}

		if (dest- source== 1 && dest % this.cols!= 0) {
			return 1;
		}

		if (source- dest== 1 && source % this.cols!= 0) {
			return 1;
		}

		return this.nodes+ 1;
	}

	this.get_blank= function() {
		var BLANK= [];
		for (var node=0; node< this.nodes; node++) {
			if (this.BALL_ARRAY[node].color== 0) {
				BLANK.push(node);
			}
		}
		rand= Math.floor(Math.random()* (BLANK.length- 0.1));
		//console.log('BLANK '+ BLANK);
		//console.log('rand '+ rand);
		if (BLANK.length<= 0) {
			return -1;
		} else {
			return BLANK[rand];
		}
	}

	this.save_state= function () {
		var state_str= '';
		for (var node=0; node< this.nodes; node++) {
			state_str+= this.BALL_ARRAY[node].color;
			state_str+= this.BALL_ARRAY[node].status;
		}

    	var d = new Date();
		d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
		document.cookie= "GB=" + state_str + ";expires=" + d.toUTCString() + ";path=/";
		console.log("Cookie Board Saved!");
		console.log(state_str);
		return state_str;
	}

	this.restore_state= function (state_str= "")
	{
		if (state_str== "") {
			this.reset();
			var cookie= document.cookie;
			if (typeof(cookie)!= "undefined") {
				GB= cookie.split('GB=');
				if (GB.length>= 2) {
					state_str= GB[1].split(';')[0];
					console.log("Cookie Board Restored: "+ state_str);
					this.board_last_state= state_str;
				} else {
					console.log("Cookie Board Not Found!");
				}
			}
		}

		this.board_last_state= state_str;
		this.ball_selected= -1;
		//console.log(state_str);
		if (state_str.length== this.nodes* 2) {
			for (var node=0; node< this.nodes; node++) {
				color= state_str.substr(node* 2, 1);
				status= state_str.substr(node* 2+ 1, 1);
				if (status== 3 || status== 6) {
					status= 2;
				}
				if (status== 5) {
					color= 0;
					status= 0;
				}
				this.BALL_ARRAY[node].color= color;
				this.BALL_ARRAY[node].status= status;
			}
			//console.log(this.BALL_ARRAY);
		}
	}
}
