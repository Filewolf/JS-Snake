import Canvas from "./canvas.js";
import Score from "./score.js";
import Config from "./config.js";
import Loop from "./loop.js";
import Snake from "./snake.js";
import Food from "./food.js";

class Game {
    constructor (container) {
        this.canvas = new Canvas(container);
        this.score = new Score(document.querySelector('.game__score'));
        this.config = new Config();
        this.snake = new Snake(this.canvas, this.config);
        this.food = new Food(this.canvas, this.config, this.snake);

        new Loop(this.update.bind(this), this.draw.bind(this), this.checkDeath.bind(this));
    }

    update() {
        this.snake.update();
        this.food.update(this.score, this.snake);
    }

    draw() {
        this.canvas.context.clearRect( 0, 0, this.canvas.elem.width, this.canvas.elem.height );

        this.snake.draw(this.canvas.context);
        this.food.draw(this.canvas.context);
    }

    checkDeath() {
        return this.snake.selfСollision();
    }
}

new Game(document.querySelector('.game__wrapper'));