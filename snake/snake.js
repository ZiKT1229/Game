var canvas = document.getElementById("game");
var context = canvas.getContext('2d');
const grid = 16;
var count = 0;
var autoFlag = true;

class Snake {
    constructor() {
        this._x = getRandomInt(0, 25) * grid;
        this._y = getRandomInt(0, 25) * grid;
        this._dx = grid;
        this._dy = 0;
        this._cells = [];
        this._length = 1;
    }
    drawSnake() {
        context.fillStyle = 'green';
        this._cells.forEach(function(cell, index) { //有些問題，關於this的使用
            context.fillRect(cell.x, cell.y, grid-1, grid-1);

            if (cell.x === apple.x && cell.y === apple.y) {
                snake._length++;
                apple.newApple();
            }
            
            for (let i = index + 1; i < snake._cells.length; i++) {
                if (cell.x === snake._cells[i].x && cell.y === snake._cells[i].y) {
                    snake._x = getRandomInt(0, 25) * grid;
                    snake._y = getRandomInt(0, 25) * grid;
                    snake._cells = [];
                    snake._length = 1;
                    snake._dx = grid;
                    snake._dy = 0;
                    apple.newApple();
                }
            }
        });
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
    turn(direction) {
        if (direction === 37 && this._dx === 0) {
            this._dx = -grid;
            this._dy = 0;
        }
        // up arrow key
        else if (direction === 38 && this._dy === 0) {
            this._dy = -grid;
            this._dx = 0;
        }
        // right arrow key
        else if (direction === 39 && this._dx === 0) {
            this._dx = grid;
            this._dy = 0;
        }
        // down arrow key
        else if (direction === 40 && this._dy === 0) {
            this._dy = grid;
            this._dx = 0;
        }
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get dx() {
        return this._dx;
    }
    get dy() {
        return this._dy;
    }
    set dx(dx) {
        this._dx = dx;
    }
    set dy(dy) {
        this._dy = dy;
    } 
}

class Apple {
    constructor() {
        this._x = getRandomInt(0, 25) * grid;
        this._y = getRandomInt(0, 25) * grid;
    }
    newApple() {
        this._x = getRandomInt(0, 25) * grid;
        this._y = getRandomInt(0, 25) * grid;
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

const autoControl = () => {
    if (snake.x > apple.x) {
        if (snake.y > apple.y) {
            if (snake.dx === 0) {
                snake.dx = -grid;
                snake.dy = 0;
            } else if (snake.dy === 0) {
                snake.dy = -grid;
                snake.dx = 0;
            }
        } else if (snake.y < apple.y) {
            if (snake.dx === 0) {
                snake.dx = -grid;
                snake.dy = 0;
            } else if (snake.dy === 0) {
                snake.dy = grid;
                snake.dx = 0;
            }
        } else {
            if (snake.dx === 0) {
                snake.dx = -grid;
                snake.dy = 0;
            }
        }
    } 
    else if (snake.x < apple.x) {
        if (snake.y > apple.y) {
            if (snake.dx === 0) {
                snake.dx = grid;
                snake.dy = 0;
            } else if (snake.dy === 0) {
                snake.dy = -grid;
                snake.dx = 0;
            }
        } else if (snake.y < apple.y) {
            if (snake.dx === 0) {
                snake.dx = grid;
                snake.dy = 0;
            } else if (snake.dy === 0) {
                snake.dy = grid;
                snake.dx = 0;
            }
        } else {
            if (snake.dx === 0) {
                snake.dx = grid;
                snake.dy = 0;
            }
        }
    }
    else if (snake.x === apple.x) {
        if (snake.y > apple.y) {
            if (snake.dy === 0) {
                snake.dy = -grid;
                snake.dx = 0;
            }
        } else if (snake.y < apple.y) {
            if (snake.dy === 0) {
                snake.dy = grid;
                snake.dx = 0;
            }
        }
    }
};

const animation = () => {
    requestAnimationFrame(animation);
    if (++count < 4) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.move();

    apple.drawApple();

    snake.drawSnake();

    if (autoFlag === true) {
        autoControl();
    }
};

document.addEventListener('keydown', function(e) {
    snake.turn(e.which);
});

var snake = new Snake();
var apple = new Apple();
requestAnimationFrame(animation);