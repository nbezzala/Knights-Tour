# A role to display messages and errors to the user
Display =

  hide-error: ->
    $ \#msg-box .removeClass \error-msg-box .addClass \info-msg-box .hide!
    
  show-error: (msg) ->
    $ \#msg-box .removeClass \info-msg-box .addClass \error-msg-box .html msg .show!
    
  show-info: (msg) ->
    $ \#msg-box .removeClass \error-msg-box .addClass \info-msg-box .html msg .show!

  get-color: (x, y) ->
    if ( (x % 2 == 0 && y % 2 != 0) || (x%2 != 0 && y%2 ==0) )
      color = \white
    else
      color = \grey
    
  make-board: ->
    $ \#board .append "<table border=1 align='center'>"
    for i from 7 to 0 by -1
      row = "row" + i
      $ \#board .find \table .append "<tr id=" + row + ">"
      for j from 0 to 7
        color = @get-color i, j
        $ \#board .find \table .find "#" + row .append "<td class = 'square " + color + "' id='sq" + i + j + "' >"

    $ \#sq01 .addClass \horse
    
# The horse class, which knows where the horse is, and the moves it has made
class Horse implements Display
  ->
    @x = 0
    @y = 1
    @moves = [ \sq01 ]
  
  reset: ->
    @x = 0
    @y = 1
    @moves = [ \sq01 ]
  
  
  getx: (id) ->
    parseInt id.substr 2 1
    
  gety: (id) ->
    parseInt id.substr 3 1
  
  check-move: (x, y) ->
    results = [ [1 2] [1 -2] [-1 2] [-1 -2] [2 1] [2 -1] [-2 1] [-2 -1] ]
    for xy in results
      return 1 if +x == @x + xy[0] and +y == @y + xy[1]
                         
  move: (to) ->
    x = @getx to
    y = @gety to

    valid = @check-move x, y
    if !valid
      @show-error "Invalid Move"
      return
      
    @hide-error!

    id = "#" + to
    @x = x
    @y = y
    $ id .addClass \horse
    @moves.push to
    
    @show-info \Completed if @moves.length == 64
    
  set-xy: (id) ->
    @x = @getx id
    @y = @gety id
  
  undo-move: ->
    return unless @moves.length > 1
    
    remove = "#" + @moves.pop!
    $ remove .removeClass \horse
    previous = @moves.slice -1
    previous = previous[0]
    @set-xy previous
    
    

# Use the class definitions here    
horse = new Horse

$ horse.make-board!

$ \#undo .on \click ->
  horse.undo-move!

$ \#reset .on \click ->
  horse.reset!
  $ \td .removeClass \horse
  $ \#sq01 .addClass \horse
  horse.hide-error!
  

<-! $ \td .on \click
horse.move this.id
