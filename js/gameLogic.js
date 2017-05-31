function toggelPlayer(_this) {
	GameState($('.gameCell'),_this);
	player = player==='H' ? 'A' : 'H' ; //if a human is playing change the player to AI and vise versia.
	if (player === 'A') {
		ai();
	}
}
//Event handler for clicing in a box game
function spotClick() {
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
		return;
	}
	//if the state is win or draw then this methode will be executed.
	showGameModal();
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