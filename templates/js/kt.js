(function(){
  var Display, Horse, horse;
  Display = {
    hideError: function(){
      return $('#msg-box').removeClass('error-msg-box').addClass('info-msg-box').hide();
    },
    showError: function(msg){
      return $('#msg-box').removeClass('info-msg-box').addClass('error-msg-box').html(msg).show();
    },
    showInfo: function(msg){
      return $('#msg-box').removeClass('error-msg-box').addClass('info-msg-box').html(msg).show();
    },
    getColor: function(x, y){
      var color;
      if ((x % 2 === 0 && y % 2 !== 0) || (x % 2 !== 0 && y % 2 === 0)) {
        return color = 'white';
      } else {
        return color = 'grey';
      }
    },
    makeBoard: function(){
      var i, row, j, color;
      $('#board').append("<table border=1 align='center'>");
      for (i = 7; i >= 0; --i) {
        row = "row" + i;
        $('#board').find('table').append("<tr id=" + row + ">");
        for (j = 0; j <= 7; ++j) {
          color = this.getColor(i, j);
          $('#board').find('table').find("#" + row).append("<td class = 'square " + color + "' id='sq" + i + j + "' >");
        }
      }
      return $('#sq01').addClass('horse');
    }
  };
  Horse = (function(){
    Horse.displayName = 'Horse';
    var prototype = Horse.prototype, constructor = Horse;
    importAll$(prototype, arguments[0]);
    function Horse(){
      this.x = 0;
      this.y = 1;
      this.moves = ['sq01'];
    }
    prototype.reset = function(){
      this.x = 0;
      this.y = 1;
      return this.moves = ['sq01'];
    };
    prototype.getx = function(id){
      return parseInt(id.substr(2, 1));
    };
    prototype.gety = function(id){
      return parseInt(id.substr(3, 1));
    };
    prototype.checkMove = function(x, y){
      var results, i$, len$, xy;
      results = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
      for (i$ = 0, len$ = results.length; i$ < len$; ++i$) {
        xy = results[i$];
        if (+x === this.x + xy[0] && +y === this.y + xy[1]) {
          return 1;
        }
      }
    };
    prototype.move = function(to){
      var x, y, valid, id;
      x = this.getx(to);
      y = this.gety(to);
      valid = this.checkMove(x, y);
      if (!valid) {
        this.showError("Invalid Move");
        return;
      }
      this.hideError();
      id = "#" + to;
      this.x = x;
      this.y = y;
      $(id).addClass('horse');
      this.moves.push(to);
      if (this.moves.length === 64) {
        return this.showInfo('Completed');
      }
    };
    prototype.setXy = function(id){
      this.x = this.getx(id);
      return this.y = this.gety(id);
    };
    prototype.undoMove = function(){
      var remove, previous;
      if (!(this.moves.length > 1)) {
        return;
      }
      remove = "#" + this.moves.pop();
      $(remove).removeClass('horse');
      previous = this.moves.slice(-1);
      previous = previous[0];
      return this.setXy(previous);
    };
    return Horse;
  }(Display));
  horse = new Horse;
  $(horse.makeBoard());
  $('#undo').on('click', function(){
    return horse.undoMove();
  });
  $('#reset').on('click', function(){
    horse.reset();
    $('td').removeClass('horse');
    $('#sq01').addClass('horse');
    return horse.hideError();
  });
  $('td').on('click', function(){
    horse.move(this.id);
  });
  function importAll$(obj, src){
    for (var key in src) obj[key] = src[key];
    return obj;
  }
}).call(this);
