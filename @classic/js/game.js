// JavaScript Document
var canvas= document.querySelector('canvas');
var ctx= canvas.getContext('2d');
var board= new Board();
var score= new Score();
var timer= new Timer();
var stats= new Stats();
var switch_sound= new Switch();
var switch_music= new Switch();
var button_undo= new Button();
var button_power= new Button();
var layout_image= new Image();
var layout_image_loaded= 0;
var gamePlayerName= "";

/*
	option= 0 - Move Only
	option= 1 - Scored
	option= 2 - Board Full
*/
function GameSave(option= 1) {
	console.log("--firebase_uid--", firebase_uid);
	if (option== 1 && firebase_uid!= "") {
		console.log("Firebase Score Saved!");
		firebase.firestore().collection("sessions").doc(session_id).set({
			score: score.score,
			timer: ((timer.hour* 60)+ timer.minute* 60)+ timer.second,
			version: "20220601",
		}, {merge: true});
	}
	board.save_state();
	score.save_state();
	timer.save_state();
}

function GameRestore()
{
	board.restore_state();
	score.restore_state();
	timer.restore_state();
	button_undo.status_default= 0;
}

function GameDraw() {
	requestAnimationFrame(GameDraw);
	board.animation_moving();
	board.animation();

	if (board.board_moving== 0 && board.board_changing== 0) {
		if (board.board_changed== 1) {
			board.check_line();
			board.board_changed= 0;
		}

		if (board.board_grow== 1) {
			if (board.board_score<= 0) {
				if (switch_sound.status== 1) {
					audio_move.play();
				}
				//Board Grow
				board.grow();
			}
			button_undo.status_default= 1;
			button_power.status_default= 1;
			board.board_grow= 0;
			GameSave(0);
		}

		if (board.board_status_no_move== 1) {
			if (switch_sound.status== 1) {
				audio_no_move.play();
			}
			board.board_status_no_move= 0;
		}

		if (board.board_status_selected== 1) {
			if (switch_sound.status== 1) {
				audio_choose.play();
			}
			board.board_status_selected= 0;
		}

		if (board.board_score> 0) {
			//Board Scored
			if (switch_sound.status== 1) {
				audio_disappear.play();
			}

			score.score+= board.board_score;
			if (score.score> 99999) {
				score.score= 99999;
			}
			if (score.high_score< score.score) {
				score.high_score= score.score;
			}
			board.board_score= 0;
			button_undo.status_default= 0;
			GameSave(1);
		}

		if (board.board_full== 1) {
			score.last_score= score.score;
			score.score= 0;
			if (switch_sound.status== 1) {
				audio_over.play();
			}
			board.over();
			timer.reset();
			board.board_full= 0;
			button_undo.status= 0;
			button_undo.status_default= 0;
			button_power.status= 0;
			button_power.status_default= 0;
			GameSave(2);
		}
	}

	if (MouseIsClicked()) {
		switch_sound.turn();
		switch_music.turn();
		button_undo.pressed();
		button_power.pressed();

		//skip when moving //skip when changing (explode & grow)
		if (board.board_moving== 0 && board.board_changing== 0) {
			if (button_undo.status== 3) {
				if (switch_sound.status== 1) {
					audio_notification.play();
				}
			button_undo.status= 0;
			button_undo.status_default= 0;
			board.restore_state(board.board_last_state);
			} else if (button_power.status== 3) {
				button_power.status= 0;
				button_power.status_default= 0;
				score.last_score= score.score;
				score.score= 0;
				timer.reset();
				board.over();
				board.save_state();
			}
			board.select_ball();
		}

		if (switch_music.status==1) {
			music_background.play();
			music_background.loop= true;
			music_background.volume= 0.5;
		} else {
			music_background.pause();
		}

		if (switch_sound.status_change== 1 || switch_music.status_change== 1) {
			if (switch_sound.status== 1) {
				audio_switch.play();
			}
			switch_sound.status_change= 0;
			switch_music.status_change= 0;
		}

	} else {
		button_undo.hover();
		button_power.hover();
	}

	if (layout_image_loaded== 1) {
		ctx.drawImage(layout_image, 0, 0, layout_image.width, layout_image.height);
	}

	board.draw(ctx);
	score.draw(ctx);
	timer.draw(ctx);
	stats.draw(ctx);
	switch_sound.draw(ctx, 0, 0);
	switch_music.draw(ctx, 64, 0);
	button_undo.draw(ctx, 0, 0);
	button_power.draw(ctx, 39, 0);
	//console.log('draw');
	//console.log(mouse_IsDown);
}

function GameInit() {
	layout_image.src= './images/layout.png';
	layout_image.onload= function () {
		console.log('layout image loaded');
		layout_image_loaded= 1;
	}

	board.init();
	score.init();
	timer.init();
	stats.init();
	switch_sound.init(0, 'SWS');
	switch_music.init(1, 'SWM');
	button_undo.init(0);
	button_power.init(1);
	GameRestore();
	GameDraw();
}
