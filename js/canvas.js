// JavaScript Document
var h_canvas, w_canvas;

function canvas_paint() {
	h_canvas = $('#gameBoard').height();
	w_canvas = $('#gameBoard').width();
	var canvas = $("<canvas>");
	canvas.attr('id','canvas');
	canvas.attr({'height' : h_canvas ,'width': w_canvas} );
	canvas.css('border','1px solid black');
	canvas.css('z-index','5');
	$("#bdy").append(canvas);
	paint_dash('row',2);
	paint_dash('row',3);
	paint_dash('column',1);
	paint_dash('column',2);
	paint_dash('column',3);
	paint_dash('Diagonal_down');
	paint_dash('Diagonal_up');
}

// @param string : 'column' , 'row' , 'Diagonal_down' , 'Diagonal_up'
// @param x int number row /column 
function paint_dash (where,no) {
	switch (no) {
		case 2:
		no = 3;
		break;
		case 3:
		no=5;
		break;
		}
	var canvas = document.getElementById('canvas');
	h_canvas = $('#canvas').height();
	w_canvas = $('#canvas').width();
	var c = canvas.getContext('2d');
	c.strokeStyle = "black";
	c.lineWidth = 5;
	c.beginPath();
	switch (where) {
		case 'column':
			c.moveTo((no*w_canvas/6),(h_canvas/6));
			c.lineTo((no*w_canvas/6),(5*h_canvas/6));
			break;
		case 'row':
			c.moveTo((w_canvas/6),(no*h_canvas/6));
			c.lineTo((5*w_canvas/6),(no*h_canvas/6));		
			break;
		case 'Diagonal_down':
			c.moveTo((w_canvas/9),(h_canvas/9));
			c.lineTo((8*w_canvas/9),(8*h_canvas/9));
			break;
		case 'Diagonal_up':
			c.moveTo((8*w_canvas/9),(h_canvas/9));
			c.lineTo((w_canvas/9),(8*h_canvas/9));
		}
	c.stroke();
}

