import Point from "./Point";

export default class Shape {
    public static createShape(points: Point[]): Shape {
        const shape: Shape = new Shape(points);
        return shape;
    }

    public points: Point[] = [];

    constructor(points: Point[]) {
        this.points = points;
    }

    public overlaps(otherShape: Shape) {
        return this.points.some((point) => otherShape.points.some((otherPoint) => point.equals(otherPoint)));
    }
}
