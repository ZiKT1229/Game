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
    move() {
        this._x += this._dx;
        this._y += this._dy;
        if (this._x < 0) {
            this._x = canvas.width - grid;
        }
        else if (this._x >= canvas.width) {
            this._x = 0;
        }
        if (this._y < 0) {
            this._y = canvas.width - grid;
        }
        else if (this._y >= canvas.width) {
            this._y = 0;
        }
        this._cells.unshift({x: this._x, y: this._y});
        if (this._cells.length > this._length) {
            this._cells.pop();
        }
    }
}

class Apple {
    constructor() {
        this._x = getRandomInt(0, 25);
        this._y = getRandomInt(0, 25);
    }
    newApple() {
        this._x = getRandomInt(0, 25);
        this._y = getRandomInt(0, 25);
    }
    drawApple() {
        context.fillStyle = 'red';
        context.fillRect(this._x, this._y, grid-1, grid-1);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}