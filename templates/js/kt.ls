# A role to display messages and errors to the user
MessageDisplay =

  hide-error: ->
    $ \#msg-box .removeClass \error-msg-box .addClass \info-msg-box .hide!
    
  show-error: (msg) ->
    $ \#msg-box .removeClass \info-msg-box .addClass \error-msg-box .html msg .show!
    
  show-info: (msg) ->
    $ \#msg-box .removeClass \error-msg-box .addClass \info-msg-box .html msg .show!

    
# The horse class, which knows where the horse is, and the moves it has made
class Horse implements MessageDisplay
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
    results = [ 
      [ @x + 1, @y + 2],
      [ @x + 1, @y + 2],
    ]
    return 1 if +x == @x + 1 and +y == @y + 2
    return 1 if +x == @x + 1 and +y == @y - 2
    return 1 if +x == @x - 1 and +y == @y + 2
    return 1 if +x == @x - 1 and +y == @y - 2
    return 1 if +x == @x + 2 and +y == @y + 1
    return 1 if +x == @x - 2 and +y == @y + 1
    return 1 if +x == @x - 2 and +y == @y - 1
    return 1 if +x == @x + 2 and +y == @y - 1
                     
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

$ \#undo .on \click ->
  horse.undo-move!

$ \#reset .on \click ->
  horse.reset!
  $ \td .removeClass \horse
  $ \#sq01 .addClass \horse
  horse.hide-error!
  

<-! $ \td .on \click
horse.move this.id
