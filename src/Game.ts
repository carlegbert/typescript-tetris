import { DIRECTIONS, HEIGHT, KEYS, TILE_STATES, WIDTH } from "./constants";
import Point, { IDirection } from "./Point";
import Row from "./Row";
import Shape from "./Shape";
import Tile from "./Tile";

export default class Game {
    public static createGame(): Game {
        const game: Game = new Game();
        const gameBoard: HTMLElement = document.getElementById("game");
        for (let y: number = 0; y < HEIGHT; y++) {
            const rowElement: HTMLElement = document.createElement("div");
            rowElement.className = "row";
            gameBoard.appendChild(rowElement);
            const row = new Row(rowElement);
            game.rows.push(row);
            for (let x: number = 0; x < WIDTH; x++) {
                const tileElement: HTMLElement = document.createElement("div");
                tileElement.className = "tile";
                rowElement.appendChild(tileElement);
                const tile = new Tile(tileElement, new Point(x, y));
                row.addTile(tile);
            }
        }

        return game;
    }

    private rows: Row[] = [];
    private shape?: Shape = null;
    private clock?: any;

    public start(): void {
        this.shape = Shape.createShape([this.getTile(5, 0)]);
        this.clock = setInterval(this.playFrame.bind(this), 100);
        document.onkeydown = (event) => {
            this.handleKeypress(event);
        };
    }

    private createShape(): void {
        const newShape = Shape.createShape([this.getTile(5, 0)]);
        if (newShape.overlaps(this.shape)) {
            this.loseGame();
        } else {
            this.shape = newShape;
        }
    }

    private loseGame(): void {
        alert("you lost!!!!!");
        clearInterval(this.clock);
    }

    private getTile(x: number, y: number): Tile {
        const row = this.rows[y];
        return row && row.tiles[x];
    }

    private playFrame(): void {
        this.descendShape();
    }

    private moveShape(direction: IDirection): boolean {
        const newTileLocations: Tile[] = [];
        this.shape.tiles.forEach((tile) => {
            const newLocation = tile.point.movePoint(direction);
            const tileAtLocation = this.getTile(newLocation.x, newLocation.y);
            if (tileAtLocation && tileAtLocation.state !== TILE_STATES.RESTING_SHAPE) {
                newTileLocations.push(tileAtLocation);
            }
        });
        if (newTileLocations.length === 0) {
            return false;
        }

        this.shape.tiles.forEach((t) => t.changeState(TILE_STATES.EMPTY));
        this.shape.tiles = newTileLocations;
        this.shape.tiles.forEach((t) => t.changeState(TILE_STATES.MOVING_SHAPE));
        return true;
    }

    private descendShape(): void {
        const shapeDidDescend = this.moveShape(DIRECTIONS.DOWN);
        if (!shapeDidDescend) {
            this.shape.tiles.forEach((t) => t.changeState(TILE_STATES.RESTING_SHAPE));
            this.createShape();
        }
    }

    private handleKeypress(event: KeyboardEvent) {
        switch (event.keyCode) {
            case KEYS.DOWN:
                event.preventDefault();
                this.moveShape(DIRECTIONS.DOWN);
                break;
            case KEYS.LEFT:
                event.preventDefault();
                this.moveShape(DIRECTIONS.LEFT);
                break;
            case KEYS.RIGHT:
                event.preventDefault();
                this.moveShape(DIRECTIONS.RIGHT);
                break;
        }
    }
}
