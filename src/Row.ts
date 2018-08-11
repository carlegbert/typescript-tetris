import Tile from "./Tile";

export default class Row {
    private tiles: Tile[] = [];
    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    public addTile(tile: Tile): void {
        this.tiles.push(tile);
    }
}
