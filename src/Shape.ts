import { SHAPE_TYPES } from "./constants";
import Point from "./Point";

const NUM_SHAPES = SHAPE_TYPES.length;

export default class Shape {
    public static createShape(): Shape {
        const randNum = Math.floor(Math.random() * NUM_SHAPES);
        const points = SHAPE_TYPES[randNum]
            .map((obj) => new Point(obj.x, obj.y));
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
