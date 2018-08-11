import { TILE_STATES } from "./constants";
import Tile from "./Tile";

export default class Row {
    public tiles: Tile[] = [];
    public element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    public addTile(tile: Tile): void {
        this.tiles.push(tile);
    }

    public isFull(): boolean {
        return this.tiles.every((tile) => tile.state === TILE_STATES.RESTING_SHAPE);
    }

    public updateYIndex(y: number): void {
        this.tiles.forEach((tile) => {
            tile.point.y = y;
        });
    }
}
