import { comparePositions } from "./supportFunctions.js";

export default class Snake {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.config = config;

        this.x = this.canvas.elem.width / 2;
        this.y = this.canvas.elem.width / 2;
        
        this.body = [];
        this.maxBody = 3;

        this.lastDirection = { x: this.config.CELL_SIZE, y: 0 };
        this.direction = { x: this.config.CELL_SIZE, y: 0 };

        this.addKeyboardListener();
    }

    update() {
        this.getNewDirection();

        this.x += this.direction.x;
        this.y += this.direction.y;
    
        this.outsideCanvas();
    
        this.body.unshift({ x: this.x, y: this.y });
    
        if (this.body.length > this.maxBody) {
            this.body.pop();
        }
    }
    
    draw(context) {
        this.body.forEach((elem, index) => {
            if (index === 0) {
                context.fillStyle = '#FAC505'; //color of head
            } else {
                context.fillStyle = '#B68F03'; //color of body
            }
            context.fillRect( elem.x, elem.y, this.config.SNAKE_BODY_SIZE, this.config.SNAKE_BODY_SIZE );
        });
    }

    onSnake(obj, { ignoreHead = false } = {}) {
        return this.body.some((elem, index) => {
            if (index === 0 && ignoreHead) return false;
            return comparePositions(elem, obj);
        });
    }

    selfСollision() {
        return this.onSnake(this.body[0], { ignoreHead: true });
    }

    outsideCanvas() {
        if (this.x < 0) {
            this.x = this.canvas.elem.width - this.config.CELL_SIZE;
        } else if (this.x >= this.canvas.elem.width) {
            this.x = 0;
        }
    
        if (this.y < 0) {
            this.y = this.canvas.elem.height - this.config.CELL_SIZE;
        } else if (this.y >= this.canvas.elem.height) {
            this.y = 0;
        }
    }

    addKeyboardListener() {
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'ArrowUp':
                    if (this.lastDirection.y > 0) break;
                
                    this.direction = { x: 0, y: -this.config.CELL_SIZE };
                    break;
                case 'ArrowDown':
                    if (this.lastDirection.y < 0) break;

                    this.direction = { x: 0, y: this.config.CELL_SIZE };
                    break;
                case 'ArrowLeft':
                    if (this.lastDirection.x > 0) break;

                    this.direction = { x: -this.config.CELL_SIZE, y: 0 };
                    break;
                case 'ArrowRight':
                    if (this.lastDirection.x < 0) break;

                    this.direction = { x: this.config.CELL_SIZE, y: 0 };
                    break;
            }
        });
    }

    getNewDirection() {
        this.lastDirection = this.direction;
        return this.direction;
    }
}