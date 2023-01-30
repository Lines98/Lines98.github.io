// JavaScript Document
var stats_online= 0;
var stats_ranking_list= "0/00:00:00/.../ZZ/na";

function Stats()
{
	this.offset_x= 205;
	this.offset_y= 20;
	this.frame= 0;
	this.color_count= 0;
	this.COLOR= [
		"white", "white", "white", "white", "white",
		"yellow", "yellow", "yellow", "yellow", "yellow",
		"black", "black"];
	
	this.init= function ()
	{
	}
	
	this.draw= function (ctx)
	{
		if (stats_online== 0)
			stats_online= '...';
			
		ctx.fillStyle = this.COLOR[this.color_count];
		ctx.font = "14px Arial";
		ctx.textAlign = "center";
		ctx.fillText(decodeURIComponent(escape('\xf0\x9f\x8c\x8e '))+ stats_online, this.offset_x, this.offset_y);
		
		this.color_count++;
		if (this.color_count>= this.COLOR.length)
			this.color_count= 0;
	}
}

function StatsScoreUpdate(score_id, score_type, score_data) {
	if (score_data=== null) {
		return false;		
	}
	// console.log("Score Update: "+ score_data);
	var DATA= score_data.split("/");
	var hour= Math.floor(DATA[1] / 3600);
	var minute= Math.floor((DATA[1] % 3600) / 60);
	var second= DATA[1] % 60;

	hour= (hour<10? "0": "")+ hour;
	minute= (minute<10? "0": "")+ minute;
	second= (second<10? "0": "")+ second;

	document.getElementById(score_type+ score_id+ "_score").innerHTML= DATA[0];
	document.getElementById(score_type+ score_id+ "_timer").innerHTML= hour+ ":"+ minute+ ":"+ second;
	document.getElementById(score_type+ score_id+ "_flag").src= "/images/flags/16/"+ DATA[3]+ ".png";
	document.getElementById(score_type+ score_id+ "_name").innerHTML= DATA[2];
	if (DATA[4]== session_id) {
		document.getElementById(score_type+ score_id).style.cssText= "color: #16c60c";
	} else {
		document.getElementById(score_type+ score_id).style.cssText= "";
	}
	if (score_type== "ls_") {
		document.getElementById(score_type+ score_id+ "_icon").innerHTML= decodeURIComponent(escape("\xf0\x9f\x9f\xa2"));
		// setTimeout(function(){ document.getElementById(score_type+ score_id+ "_icon").innerHTML= decodeURIComponent(escape("\xf0\x9f\x9f\xa1")); }, 1000);
		setTimeout(function(){ document.getElementById(score_type+ score_id+ "_icon").innerHTML= decodeURIComponent(escape("\xe2\x9a\xaa")); }, 1000);
	}
}
