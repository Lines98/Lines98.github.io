// JavaScript Document
var audio_over = new Audio('./audio/over.wav');
var audio_choose = new Audio('./audio/choose.wav');
var audio_disappear = new Audio('./audio/disappear.wav');
var audio_move = new Audio('./audio/move.wav');
var audio_no_move = new Audio('./audio/no_move.wav');
var audio_switch = new Audio('./audio/switch.wav');
var audio_notification = new Audio('./audio/notification.wav');

var music_background= new Audio('./music/music.mp3');

var audioEnabled= false;
function enableAudio()
{
	if (audioEnabled)
		return;

	audioEnabled= true;

	audio_over.play();
	audio_over.pause();

	audio_choose.play();
	audio_choose.pause();

	audio_disappear.play();
	audio_disappear.pause();

	audio_move.play();
	audio_move.pause();

	audio_no_move.play();
	audio_no_move.pause();

	audio_switch.play();
	audio_switch.pause();

	audio_notification.play();
	audio_notification.pause();

	music_background.play();
	music_background.pause();
}
