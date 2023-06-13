export default class Loop {
    constructor (_update, _draw, _checkDeath, _config) {
        this.update = _update;
        this.draw = _draw;
        this.checkDeath = _checkDeath;

        this.config = _config;

        this.deltaTime = 0;
        this.lastRenderTime = 0;

        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate(currentTime = 0) {
        if (this.checkDeath()) {
            if ( confirm(`Game over! Do you want to try again?`) ) {
                window.location.reload();
            }
    
            return;
        }

        window.requestAnimationFrame(this.animate);

        this.deltaTime = currentTime - this.lastRenderTime;

        if ( (this.deltaTime / 1000) < (1 / this.config.SNAKE_SPEED) ) return;
        
        this.update();
        this.draw();

        this.lastRenderTime = currentTime;
    }
}