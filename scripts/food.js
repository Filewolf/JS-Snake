import Config from "./config.js";
import { getRandomNum } from "./supportFunctions.js";


export default class Food {
    constructor(canvas, config, snake) {
        this.canvas = canvas;
        this.config = config;

        this.position = this.getRandomFoodPosition(snake);
    }

    update(score, snake) {
        if (snake.onSnake(this.position)) {
            snake.maxBody++;
            this.position = this.getRandomFoodPosition(snake);
            score.increment();
        }
    }
    
    draw(context) {
        context.beginPath();
        context.fillStyle = '#c2003d';
        context.arc( this.position.x + (this.config.CELL_SIZE / 2), this.position.y + (this.config.CELL_SIZE / 2), this.config.FOOD_RADIUS, 0, 2 * Math.PI );
        context.fill();
    }

    getRandomFoodPosition(snake) {
        let newPos;
    
        while (newPos == null || snake.onSnake(newPos)) {
            newPos = this.randomCanvasPosition();
        }
    
        return newPos;
    }

    randomCanvasPosition() {
        return { 
            x: getRandomNum(0, this.canvas.elem.width / this.config.CELL_SIZE) * this.config.CELL_SIZE,
            y: getRandomNum(0, this.canvas.elem.height / this.config.CELL_SIZE) * this.config.CELL_SIZE
        };
    }
}