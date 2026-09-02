const area = {
    element: document.getElementById('area'),
    width: 1000,
    height: 400,
};

function initialize() {
    if (!area.element) {
        area.element = document.createElement('div');
        area.element.id = 'area';
        document.body.appendChild(area.element);
    }

    area.element.style.width = area.width + 'px';
    area.element.style.height = area.height + 'px';
}

function moveTo(ball, x, y) {
    ball.moveTo(x, y);
}

let movement = {
    moveTo: function (x, y) {
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
    },

    changeDirectionIfNecessary: function (x, y) {
        if (x < 0 || x > area.width - this.width) {
            this.dx = -this.dx;
        }
        if (y < 0 || y > area.height - this.height) {
            this.dy = -this.dy;
        }
    },

    create: function (color, dx, dy) {
        const newBall = Object.create(this);
        newBall.dx = dx;
        newBall.dy = dy;
        newBall.width = 40;
        newBall.height = 40;

        newBall.element = document.createElement('div');
        newBall.element.className = 'ball';
        newBall.element.style.backgroundColor = color;
        newBall.element.style.width = newBall.width + 'px';
        newBall.element.style.height = newBall.height + 'px';

        area.element.appendChild(newBall.element);
        return newBall;
    },

    update: function (x, y) {
        this.moveTo(x, y);
        const ball = this;

        setTimeout(function () {
            ball.changeDirectionIfNecessary(x, y);
            ball.update(x + ball.dx, y + ball.dy);
        }, 16);
    }
};

initialize();

const ball1 = movement.create('blue', 4, 3);
const ball2 = movement.create('red', 1, 5);
const ball3 = movement.create('green', 2, 2);

moveTo(ball1, 1, 1);
moveTo(ball2, 10, 10);
moveTo(ball3, 20, 20);

ball1.update(70, 0);
ball2.update(20, 200);
ball3.update(300, 330);

if (typeof module !== 'undefined') {
    module.exports = { moveTo, create: movement.create, update: movement.update, changeDirectionIfNecessary: movement.changeDirectionIfNecessary, area };
}