import { DIRECTIONS, HEIGHT, TILE_STATES, WIDTH } from "./constants";
import Point from "./Point";
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
        this.clock = setInterval(this.playFrame.bind(this), 10);
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
        const tilesBelowShape = this.getNextShapeLocation();
        if (tilesBelowShape) {
            this.shape.tiles.forEach((t) => t.changeState(TILE_STATES.EMPTY));
            this.shape.tiles = tilesBelowShape;
            this.shape.tiles.forEach((t) => t.changeState(TILE_STATES.MOVING_SHAPE));
        } else {
            this.shape.tiles.forEach((t) => t.changeState(TILE_STATES.RESTING_SHAPE));
            this.createShape();
        }
    }

    private getNextShapeLocation(): Tile[] | void {
        const newTileLocations: Tile[] = [];
        this.shape.tiles.forEach((tile) => {
            const newLocation = tile.point.movePoint(DIRECTIONS.DOWN);
            const tileAtLocation = this.getTile(newLocation.x, newLocation.y);
            if (tileAtLocation && tileAtLocation.state !== TILE_STATES.RESTING_SHAPE) {
                newTileLocations.push(tileAtLocation);
            }
        });
        return newTileLocations.length > 0 && newTileLocations;
    }
}
