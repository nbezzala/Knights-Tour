/*
 * Author: Nitish Bezzala
 * Date: 22/05/2009
 * Email: nbezzala@yahoo.com
 */

// Global variable
var queens = 0;

function queen_str(x, y) {
    return str = "td#eq" + x + y;
}

function attacked(x, y) {
    var str = queen_str(x, y);

    if ( $(str).attr('bgcolor') == 'red' )    
        return true;

    return false;
}

function mark_attacked_squares(x, y) {
    for ( var i = 7; i >= 0; i-- ) {
        for (var j = 0; j < 8; j++ ) {
            if ( x == i && y == j )
                continue;

            var str = queen_str(i, j); 
            if ( x == i || y == j)
                $(str).attr('bgcolor', 'red');
            if ( x - i == y - j )
                $(str).attr('bgcolor', 'red'); 
            if ( Number(x) + Number(y) == Number(i) + j )
                $(str).attr('bgcolor', 'red'); 
        }
    } 
    return false;
}

function queen_click(x, y) {
    if ( attacked(x, y) ) {
        showInfo("Queen will be killed on that square!");
        return;
    }

    dismissMsg();        
    var str = "td#eq" + x + y;
    $(str).attr('bgcolor', 'yellow');
    $(str).addClass('queen');
    mark_attacked_squares(x, y);
    queens++;
    
    if ( queens == 8 ) 
        q_solved();
}

function queen_start() {
    for ( var i = 0; i < 8; i++ ) {
        for ( var j = 0; j < 8; j++ ) {
            color = get_color(i, j);
            str = "td#eq" + i + j;
            $(str).attr('bgcolor', color);
            $(str).removeClass("queen");
        }
    }
    queens = 0;
}

function q_solved() {
    showInfo("You completed the Eight Queens Puzzle! Congragulations!!! :-)");
    var msg = "just solved the Eight Queens Puzzle!!!";
    postActivity(msg, "content_div", opensocial.CreateActivityPriority.HIGH);
}

