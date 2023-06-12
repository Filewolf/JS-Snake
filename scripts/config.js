export default class Config {
    constructor() {
        this.CELL_SIZE = 20;
        this.FOOD_RADIUS = this.CELL_SIZE * 2/5; // radius of food circle
        this.SNAKE_SPEED = 10; // snake moves x times per second
        this.SNAKE_BODY_SIZE = this.CELL_SIZE; // size of one element
    }
}