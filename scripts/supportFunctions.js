export function comparePositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

export function getRandomNum(min, max) {
    return Math.floor( Math.random() * (max - min) + min );
}