/*
 * Author: Nitish Bezzala
 * Date: 25/03/2009
 * Email: nbezzala@yahoo.com
 */

//Utility functions
function showError(msg) {
    showError(msg, "info-msg-box", "error-msg-box");
}

function showInfo(msg) {
    showError(msg, "error-msg-box", "info-msg-box");
}

function showError(msg, oldClass, newClass) {
    $('#msg-box').removeClass(oldClass).addClass(newClass);
    $('#msg-box').html(msg);
    $('#msg-box').show('normal');
}

function dismissMsg() {
    $('#msg-box').hide('normal');
}
//End Utility functions


/*********** Global Variables ********/
/* A global horse object which knows
  * its current position on the board
  * the number of moves it has made
 */
var horse = new Object();

/* Define a board in which we store the number of the move
 * when the horse came to this square.
 * Makes it easy to find out if a square has been used before
 */
var board = [];

/* Horse history */
var horse_history = [];


/************ Functions ***************/
/* The colour of the square, we have the left bottom corner black.
*/
function get_color(x, y) {
    var color = "grey";
    if ( (x %2 == 0 && y %2 != 0) || (x %2 != 0 && y %2 == 0) ) 
        color = "white";
    
    return color;
}

/* Functions to get x and y given an id of the form "sq01"
*/
function getx ( id ) {
    var x = id.substr(2, 1);
    return x;
}

function gety ( id ) {
    var y = id.substr(3, 1);
    return y;
}

function valid_horse_move(x, y) {

    if ( parseInt(x) == parseInt(horse.x) + 1 && parseInt(y) == parseInt(horse.y) + 2 )
        return true;
    if ( parseInt(x) == parseInt(horse.x) + 1 && parseInt(y) == parseInt(horse.y) - 2 )
        return true;
    if ( parseInt(x) == parseInt(horse.x) - 1 && parseInt(y) == parseInt(horse.y) + 2 )
        return true;
    if ( parseInt(x) == parseInt(horse.x) - 1 && parseInt(y) == parseInt(horse.y) - 2 )
        return true;
    if ( parseInt(x) == parseInt(horse.x) + 2 && parseInt(y) == parseInt(horse.y) + 1 )
        return true;
    if ( parseInt(x) == parseInt(horse.x) + 2 && parseInt(y) == parseInt(horse.y) - 1 )
        return true;
    if ( parseInt(x) == parseInt(horse.x) - 2 && parseInt(y) == parseInt(horse.y) + 1 )
        return true;
    if ( parseInt(x) == parseInt(horse.x) - 2 && parseInt(y) == parseInt(horse.y) - 1 )
        return true;
    
    return false;
}

function been_here_before(x, y) {
    
    if ( board[x][y] != undefined )
        return true;
    
    return false;
}

function on_board() {
    if ( x >= 0 && x <= 7 && y >= 0 && y <= 7 )
        return true;
    
    return false;
}

function unused_square(x, y) {
    var color = get_color(x, y);
    var class_name = color + "_horse";
    var str = "td#sq" + x + y;

    $(str).removeClass("horse");
    $(str).attr('bgcolor', color);
}

function used_square(x, y) {
    var color = get_color(x, y);
    var class_name = color + "_horse";
    var str = "td#sq" + x + y;

    $(str).attr('bgcolor', color);
}

function current_square(x, y) {
    var str = "td#sq" + x + y;
    var color = get_color(x, y);
    $(str).addClass("horse");
    $(str).attr('bgcolor', 'yellow');
    
}

function move(x, y) {

    used_square(horse.x, horse.y);

    horse.x = x;
    horse.y = y;
    horse.moves++;
    board[x][y] = horse.moves;
    
    horse_history[horse.moves] = "sq" + x + y;

    current_square(x, y);
    if (horse.moves == 63)
        solved();
}

function solved() {
    showInfo("You completed the Knights Tour! Congragulations!!! :-)");
    var msg = "just solved the Knights Tour!!!";
    postActivity(msg, "content_div", opensocial.CreateActivityPriority.HIGH);
}

function make_board() {
    for ( var i = 0; i < 8; i++ ) {
        for ( var j = 0; j < 8; j++ ) {
            color = get_color(i, j);
            str = "td#sq" + i + j;
            $(str).removeClass("horse");
            $(str).attr('bgcolor', color);
        }
    }
}

function horse_start() {

    make_board();

    $("td#sq01").addClass("horse");
    $("td#sq01").attr('bgcolor', 'yellow');

    horse.x = 0;
    horse.y = 1;
    horse.moves = 0;

	for (var i = 0; i <= 7; i++) {
	    board[i] = [];
	}
	board[0][1] = horse.moves;
    horse_history[0] = "sq" + horse.x + horse.y;
}

function horse_click(x, y) {
    if ( been_here_before(x, y) ) {
        showInfo("You have already been here once.");
        return;
    }

    if (!valid_horse_move(x, y)) {
        showInfo("Not a valid horse move.");
        return;
    }
        
    dismissMsg();        
    move(x, y);

}

$(document).ready( function() {

    horse_start();

    $("td").click(function() {
        
        var x = getx(this.id);
        var y = gety(this.id);
                
        var $tabs = $('#tabs').tabs();
        var selected = $tabs.tabs('option', 'selected');
        if ( selected == 0 )
            horse_click(x, y);
        else
            queen_click(x, y);
    });
    
    $("input#undo").click(function() {
        
        if ( horse.moves == 0 ) {
            showInfo("Click on any square to move the horse to that square.");
            return;
        }
        
        horse_history[horse.moves] = undefined;
        unused_square(horse.x, horse.y);
        board[horse.x][horse.y] = undefined;
        
        var n = horse.moves - 1;
        var id = horse_history[n];
        var x = getx(id);
        var y = gety(id);
        
        horse.x = x;
        horse.y = y;
        horse.moves = n
        
        current_square(x, y);
        
    });
    
    $("input#restart").click(function() {
        horse_start();
    });

    $("input#restart_q").click(function() {
        queen_start();
    });

    //Tell everyone that the viewer is using the app.
//    var priority = opensocial.CreateActivityPriority.LOW;
//    postActivity("is trying to solve the Knights Tour.", "content_div", priority);

});

