var KEY_ENTER = 13;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

function Keyboard(game) {
  this._game = game;
  this._keysRealTime = {};
  this._keysCurrentFrame = {};
  this._listen();
}

Keyboard.prototype._listen = function () {
  var that = this;
  $(document).keydown(function (event) {
    if (event.which == 13) { // If enter key, start game as normal
      killScoreSubmit();
    }
    if (document.getElementById('score_submit').style.cssText==="display: block;") return;
    that._keysRealTime[event.which] = true;
    that._keysCurrentFrame[event.which] = true;
    event.preventDefault();
  });
  $(document).keyup(function (event) {
    if (document.getElementById('score_submit').style.cssText==="display: block;") return;
    that._keysRealTime[event.which] = false;
    event.preventDefault();
  });
};

Keyboard.prototype.handleKeypresses = function () {
  for (var key in this._keysCurrentFrame) {
    if (this._keysCurrentFrame[key]) {
      this._game.keyPressed(key);
      if (!this._keysRealTime[key]) {
        this._keysCurrentFrame[key] = false;
      }
    }
  }
};
