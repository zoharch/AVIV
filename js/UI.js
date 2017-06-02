const MAX_ROWS = 3;
const MAX_COLS = 3;
const X = "img/x-png-18.png";
const O = "img/O-Jolle_insigna.png";
//*********************************************
//on load Jquery :
$(function () {
	//deligate click event of the div(gameCell) childes
	// to the parent container gameBoard
	$("#gameBoard").on("click",".gameCell",spotClick);
	//paint the board game and the canvas;
	board_paint();
	//Modal btn event listener (game over dialog)
    $("#btn2").on("click",restart);
});
//*********************************************
// painting board game and setting click event 
function board_paint() {
	console.log("board_paint");
	var x,y,div;
	//using clientWidth and clientHeight for IE8 and earlier
	const H = window.innerHeight/MAX_ROWS || 
		  document.documentElement.clientHeight/MAX_ROWS ||
		  document.body.clientHeight/MAX_ROWS;
	// loop:
	for (y = 1; y <= MAX_ROWS; y++) {
		for (x = 1; x <= MAX_COLS; x++) {
			div = $("<div>");
			div.addClass('gameCell btn btn-primary col-xs-4 spot');
			div.css('height',H);
			div.attr('id',y+'-'+x);
			div.attr('value',0);
			$("#gameBoard").append(div);
		}
	}
}

function printSymbol(_this) {
	
	var symbol = (player == "H" || player == 'H tmp') ? X : O ;
	
	console.log("printSymbol"+ symbol+ " id: "+$(_this).attr('id') );
	$(_this).attr('value',player).removeClass('spot');
	// player A/H tmp are the middle process of AI calculating it's best move.
	// therefore the img is not showed on the board.
	if (player == 'A tmp') {
		$(_this).addClass('AIguess');
		return;
		}
	if (player == 'H tmp') {
		$(_this).addClass('AI-Hguess');
		return;
		}
	var img = $("<img>");
	img.attr("src",symbol);
	img.css("height",$(_this).height()+"px");
	img.css("width",$(_this).width()+"px");
	$(_this).append(img);
}

// clear the bord from AI guses
function clearAIgueses(gameCell) {
	console.log("clearAIgueses");
	$(gameCell).attr('value',0);
	$(gameCell).addClass('spot').removeClass('AIguess');
}

// clear the bord from AI guses
function clearAI_Hgueses(gameCell) {
	console.log("clearAI_Hgueses");
	$(gameCell).attr('value',0);
	$(gameCell).addClass('spot').removeClass('AI-Hguess');
}

function restart() {
	console.log("restart");
    $('#GameModal').modal('hide');
    $('#gameBoard').empty();
    board_paint() ;
}
function showGameModal () {
	console.log("showGameModal");
	var str;
	//states of the game are:
	//"Didn't Start" ; 'AI win' ; 'Human win'; 'The Game is Draw'; 
	switch(gameTerminal) {
		case 'Human win':
			str = 'כל הכבוד !!  ניצחת ! רוצה לשחק שוב ??';
			break;
		case 'AI win':
			str = 'אני ניצחתי. רוצה לשחק שוב. אני בטוח שאתה יכול יותר.';
			break;
		default:
			console.log ('showGameModal Called when the state of the game was: ' + gameTerminal );
		   }
    $("#msg").html(str);
    $('#GameModal').modal('show');
}

