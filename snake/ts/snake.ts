const enum Direction {
    up,
    down,
    left,
    right
}
interface Rect {
    left: number;
    right: number;
    top: number;
    bottom: number;

}

function isIntersect(rect1: Rect, rect2: Rect) {
    if (rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom) {
        return false;
    } else {
        return true;
    }
}

function isInside(small: Rect, large: Rect) {
    if (small.top >= large.top && small.bottom <= large.bottom && small.left >= large.left && small.right <= large.right) {
        return true;
    } else {
        return false;
    }
}

class Snake {
    private canvasRect: Rect;
    private ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    direction: Direction;
    private head: number[];
    private body: number[][];
    private food: number[];
    private headRect: Rect;
    private foodRect: Rect;
    constructor(private canvas: HTMLCanvasElement) {
        this.canvasRect = {
            left: 0,
            right: canvas.width,
            top: 0,
            bottom: canvas.height
        }
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(120, 120, 15, 15);

        this.width = this.height = this.width = this.height = 15;

        this.direction = Direction.right;

        this.body = [[120, 120]];
        this.head = [120, 120];

        this.food = [];
        this.feed();
    }
    handleEvent(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowUp':
                if (this.direction != Direction.down) {
                    this.direction = Direction.up;
                }
                break;
            case 'ArrowDown':
                if (this.direction != Direction.up) {
                    this.direction = Direction.down;
                }
                break;
            case 'ArrowLeft':
                if (this.direction != Direction.right) {
                    this.direction = Direction.left;
                }
                break;
            case 'ArrowRight':
                if (this.direction != Direction.left) {
                    this.direction = Direction.right;
                }
                break;
            default:
                return;
        }
    }
    run() {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.head[0], this.head[1], this.width, this.height);
        switch (this.direction) {
            case Direction.left:
                this.head = [this.head[0] - this.width - 1, this.head[1]];
                break;
            case Direction.right:
                this.head = [this.head[0] + this.width + 1, this.head[1]];
                break;
            case Direction.up:
                this.head = [this.head[0], this.head[1] - this.height - 1];
                break;
            case Direction.down:
                this.head = [this.head[0], this.head[1] + this.height + 1];
                break;
            default:
                break;
        }
        this.body.unshift(this.head);
        this.headRect = {
            left: this.head[0],
            right: this.head[0] + this.width,
            top: this.head[1],
            bottom: this.head[1] + this.height
        }

        if (isIntersect(this.foodRect, this.headRect)) {
            this.ctx.clearRect(this.food[0], this.food[1], this.width, this.height);
            this.feed();
        } else {
            let trash = this.body.pop();
            this.ctx.clearRect(trash[0], trash[1], this.width, this.height);
        }

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.head[0], this.head[1], this.width, this.height);

        if (this.gameOver()) {
            location.reload();
            setTimeout(alert, 0, '得分' + (this.body.length - 1));
        }
    }
    gameOver() {
        if (!isInside(this.headRect, this.canvasRect)) {
            return true;
        }
        for (let i = 1; i < this.body.length; i++) {
            let section = this.body[i];
            let sectionRect = {
                left: section[0],
                right: section[0] + this.width,
                top: section[1],
                bottom: section[1] + this.height
            };
            if (isIntersect(this.headRect, sectionRect)) {
                return true;
            }
        }
        return false;
    }
    feed() {
        do {
            this.food[0] = Math.round(Math.random() * this.canvas.width);
            this.food[1] = Math.round(Math.random() * this.canvas.height);
        } while (this.feedError());
        this.foodRect = {
            left: this.food[0],
            right: this.food[0] + this.width,
            top: this.food[1],
            bottom: this.food[1] + this.height
        }
        this.ctx.fillStyle = 'orange';
        this.ctx.fillRect(this.food[0], this.food[1], this.width, this.height);
    }
    feedError() {
        let foodRect = {
            left: this.food[0],
            right: this.food[0] + this.width,
            top: this.food[1],
            bottom: this.food[1] + this.height
        };
        for (const section of this.body) {
            let sectionRect = {
                left: section[0],
                right: section[0] + this.width,
                top: section[1],
                bottom: section[1] + this.height
            };
            if (isIntersect(foodRect, sectionRect) || !isInside(foodRect, this.canvasRect)) {
                return true;
            }
        }
    }
}

let snake = new Snake(<HTMLCanvasElement>document.getElementById('game'));
setInterval(() => snake.run(), 500);
document.addEventListener('keydown', snake);
