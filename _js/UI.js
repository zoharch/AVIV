const MAX_ROWS = 3;
const MAX_COLS = 3;
const X = "img/x-png-18.png";
const O = "img/O-Jolle_insigna.png";
var player = 'H';
var level = 1 ; // AI levels: 1- blind , 2 - novice, 3 - master
var gameTerminal = "Didn't Start";

//on load Jquery :
$(function () {
	board_paint();
    $("#btn2").on("click",restart);
});

// painting board game and setting click event 
function board_paint() {
	var x,y,div,gm;
	//using clientWidth and clientHeight for IE8 and earlier
	const H = window.innerHeight/MAX_ROWS || 
		  document.documentElement.clientHeight/MAX_ROWS ||
		  document.body.clientHeight/MAX_ROWS;
    gm = $("<div>");
    gm.addClass('container row').attr('id','gameBoard');
	$('body').append(gm);
	// loop:
	for (y = 1; y <= MAX_ROWS; y++) {
		for (x = 1; x <= MAX_COLS; x++) {
			div = $("<div>");
			div.addClass('gameCell btn btn-primary col-xs-4 spot');
			div.css('height',H);
			div.attr('id',y+'-'+x);
			div.attr('value',0);
			gm.append(div);
			//seting click function
			div.on("click",spotClick);
		}
	}
}

function printSymbol(_this) {
	var symbol = player=="H" ? X : O ;
	$(_this).attr('value',player).removeClass('spot');
	var img = $("<img>");
	img.attr("src",symbol);
	img.css("height",$(_this).height()+"px");
	img.css("width",$(_this).width()+"px");
	$(_this).append(img);
}

function restart() {
    $('#GameModal').modal('hide');
    $('#gameBoard').empty();
    board_paint() ;
}
function showGameModal () {
    $("#msg").html("Game Result is: "+gameTerminal);
    $('#GameModal').modal('show');
}

