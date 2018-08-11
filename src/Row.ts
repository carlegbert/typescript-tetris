import Tile from "./Tile";

export default class Row {
    public tiles: Tile[] = [];
    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    public addTile(tile: Tile): void {
        this.tiles.push(tile);
    }
}
