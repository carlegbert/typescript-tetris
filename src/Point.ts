export interface IDirection {
    x: number;
    y: number;
}

export default class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public movePoint(direction: IDirection): Point {
        const x = this.x + direction.x;
        const y = this.y + direction.y;
        return new Point(x, y);
    }
}
