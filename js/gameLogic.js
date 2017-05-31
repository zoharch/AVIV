var player = 'H'; /* 'A' for AI moves
					  'H' for Human moves
					  'A tmp' for AI temporary examination
					  'H tmp' for AI temporary examination what whould Human whould do.
				   */
var level = 3 ; // AI levels: 1- blind , 2 - novice, 3 - master
//states of the game are:
//"Didn't Start" ; 'AI win' ; 'Human win'; 'The Game is Draw'; 
var gameTerminal = "Didn't Start";

function toggelPlayer(_this) {
	console.log("toggelPlayer");
	GameState($('.gameCell'),_this);
	//If AI is examinating the board it uses two agent players: A/H temp
	switch(player) {
		case 'H':
			//if the state is win or draw then terminate the game.
			if ((gameTerminal == 'AI win') || (gameTerminal == 'Human win') || (gameTerminal == 'The Game is Draw')) {
				showGameModal();
			}			
			player = 'A'; //if a human is playing change the player to AI
			ai();
			break;
		case 'A':
			//if the state is win or draw then terminate the game.
			if ((gameTerminal == 'AI win') || (gameTerminal == 'Human win') || (gameTerminal == 'The Game is Draw')) {
				showGameModal();
			}						
			player = 'H';
			break;
		case 'A tmp': // 'A tmp' for AI temporary moves
			//game state is only temporary so dont show anything to the screen yet.
			// issue: check game state in ai()
			player = 'H tmp';
			ai();
			break;
		case 'H tmp': // 'H tmp' for AI temporary examination what whould Human whould do.
			//game state is only temporary so dont show anything to the screen yet.
			// issue: check game state in ai()
			player = 'A tmp';
			ai();
			break;
		default:
			console.log('undefined player:'+player);
		   }
	console.log("player is: "+ player);
}
//Event handler for clicing in a box game
function spotClick() {
	console.log("spotClick");
	//each cell box value that occuied by a player, 
	//has a non  0 value. Therefore return to avoid
	//ocupy an already ocupied cell again.
	if ($(this).attr('value')!="0") {
		return;
	}
	printSymbol(this);
	toggelPlayer(this);
}
//const MAX_ROWS = 3;
//const MAX_COLS = 3
//playerValue = H for Human player, A for AI

//@param aGameMap as the boad play
//@param position of the player cell box 
//State is in gameTerminal.
//States are : 'AI win' , 'Human win' , 'The Game is Draw', 'The Game is still running'.
function GameState(aGameMap,position) {
	console.log("GameState");
	var winner, win = false;
    var x,y;
    y = Number($(position).attr('id').substr(0,1));
    x = Number($(position).attr('id').substr(2,1));
    
    //  bSearchWin: board , posX , PosY
	win = bSearchWin(aGameMap,x,y);
	if (win) {
        gameTerminal = player=='A' ? 'AI win' : 'Human win';
    } else if (!searchForEmptyCells()) {
        //check if it is a finale state, (all bord is ocupied)
        // if no empty cells then the function will return nothing.
        gameTerminal = 'The Game is Draw';  
    } else {
		gameTerminal = 'The Game is still running';
	}
}
// searchfor empty cells
//each time Human plays, the class spot is removed.
// when AI plays, it first descover all posibilities.
// it plays on the board virtually without showing the other player his guessings.
// therefore it replace the class sopt with the class AIguess.
function searchForEmptyCells() {
	console.log("searchForEmptyCells");
	var emptyCells = $('.spot');
	return emptyCells;
}
//-----------------------------------------------
//         bSearchWin -  check wining state
// return true if the playyer wins.
//------------------------------------------------
function bSearchWin(aGameMap,x,y) {
	
	'use strict';

	var i,
		k,
		bWin = false,
		str = '',
		strWin = '',
		intWinCounter;
	console.log("bSearchWin");
	//decide the strWin
	for (i = 1 ; i<= MAX_COLS; i++){
		strWin += player; //HHH or AAA
	}
	
//	direction(y, yDir, x, xDir,str,newY,newX)
// y,y is the position in the multidemantion array of the starting point.
// yDir and xDir are the diretions to go (+1,-1)
// str is the string to search in the array.
// newY,Newx is the position of the new place to search in the array.	
	if (!bWin) {
		//row check
		//go right:
		str = direction(y, 0, x,+1,"",y,x);
		//go lefr: (and add the previous result)
		str = direction(y, 0, x,-1,str,y,x);
		//add curent place
		str += $('#'+y+'-'+x).attr('value'); //  aGameMap[y][x];
		bWin  = (str == strWin) ?  true : bWin = false ;
	}
	
	if (!bWin) {
		//column check
		//go down:
		str = direction(y,+1, x,0,"",y,x);
		//go up: (and add the previous result)
		str = direction(y,-1, x,0,str,y,x);
		//add curent place
		str += $('#'+y+'-'+x).attr('value'); //  aGameMap[y][x];
		bWin  = (str == strWin) ?  true : bWin = false ;
	}

	if (!bWin) {
		//left diagonal
		//go down:
		str = direction(y,+1, x,+1,"",y,x);
		//go up: (and add the previous result)
		str = direction(y,-1, x,-1,str,y,x);
		//add curent place
		str += $('#'+y+'-'+x).attr('value'); //  aGameMap[y][x];
		bWin  = (str == strWin) ?  true : bWin = false ;
	}

	if (!bWin) {
		//right diagonal
		//go down:
		str = direction(y,+1, x,-1,"",y,x);
		//go up: (and add the previous result)
		str = direction(y,-1, x,+1,str,y,x);
		//add curent place
		str += $('#'+y+'-'+x).attr('value'); //  aGameMap[y][x];
		bWin  = (str == strWin) ?  true : bWin = false ;
	}

	return bWin;
}
//-----------------------------------------------
//             direction
//------------------------------------------------
//rturn str
function direction(y, yDir, x, xDir,str,newY,newX) {
	
    'use strict';
	
//	console.log("direction");
	newY += yDir;
	newX += xDir;
	if ((0 < newY) && (newY <= MAX_ROWS) && (0 < newX) && (newX <= MAX_COLS)) {
		if ($('#'+newY+'-'+newX).attr('value') == $('#'+y+'-'+x).attr('value')) {
			str += String($('#'+newY+'-'+newX).attr('value'));
			str = direction(y, yDir, x, xDir,str,newY,newX);
			}
		}
	return str;
}