// ai function
function ai() {
	var options = searchForEmptyCells();
	// AI Blind
	if (level == 1) {
		//return random empty cell
		var selection = options[Math.round((options.length-1)*Math.random())];
		player = 'A'; // symbolise AI plauyers vers H for Human player
		printSymbol(selection);
	}
	toggelPlayer(selection);
}

function searchForEmptyCells() {
	var emptyCells = $('.spot');
	return emptyCells;
}

//var cln = $('.gameCell').clone(false); // copy the board
