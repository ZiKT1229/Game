var canvase = document.getElementById("game");
var context = canvas.getContext('2d');
const grid = 16;
var count = 0;

class Snake {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._dx = grid;
        this._dy = 0;
        this._cells = [];
        this._length = 1;
    }
}

class Apple {
    constructor() {
        this._x = 160;
        this._y = 160;
    }
}