import { TILE_STATES } from "./constants";
import Tile from "./Tile";

export default class Shape {
    public static createShape(tiles: Tile[]): Shape {
        const shape: Shape = new Shape(tiles);
        shape.tiles.forEach((t) => t.changeState(TILE_STATES.MOVING_SHAPE));
        return shape;
    }

    public tiles: Tile[] = [];

    constructor(tiles: Tile[]) {
        this.tiles = tiles;
    }

    public overlaps(otherShape: Shape) {
        return this.tiles.some((t) => otherShape.tiles.includes(t));
    }
}
