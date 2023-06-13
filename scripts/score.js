export default class Score {
    constructor(container, _score = 0) {
        this.scoreBlock = document.createElement('span');
        this.scoreBlock.classList.add('score-value');
        this.score = _score;

        this.draw();

        container.appendChild(this.scoreBlock);
    }

    increment() {
        this.score++;
        this.draw();
    }

    draw() {
        this.scoreBlock.innerHTML = this.score;
    }
}