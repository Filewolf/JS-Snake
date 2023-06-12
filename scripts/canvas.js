export default class Canvas {
    constructor (container) {
        this.elem = document.createElement('canvas');
        this.elem.style.display = 'block';
        this.context = this.elem.getContext('2d');

        this.elem.width = 400;
        this.elem.height = 500;

        container.appendChild(this.elem);
    }
}