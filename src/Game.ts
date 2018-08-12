import { DIRECTIONS, HEIGHT, KEYS, TILE_STATES, WIDTH } from "./constants";
import Point, { IDirection } from "./Point";
import Row from "./Row";
import Shape from "./Shape";
import Tile from "./Tile";

export default class Game {
    public static createGame(): Game {
        const game: Game = new Game();
        for (let y: number = 0; y < HEIGHT; y++) {
            const row = game.createRow(y);
            game.rows.push(row);
            game.gameBoard.appendChild(row.element);
        }

        return game;
    }

    private rows: Row[] = [];
    private shape?: Shape = null;
    private clock?: any;
    private gameBoard: HTMLElement = document.getElementById("game");

    public start(): void {
        this.createShape();
        this.shape.points
            .filter((p) => p.y !== -1)
            .map((p) => this.getTile(p.x, p.y))
            .forEach((t) => t.changeState(TILE_STATES.MOVING_SHAPE));
        this.clock = setInterval(this.playFrame.bind(this), 50);
        document.onkeydown = (event) => {
            this.handleKeypress(event);
        };
    }

    private createRow(idx: number): Row {
        const rowElement: HTMLElement = document.createElement("div");
        rowElement.className = "row";
        const row = new Row(rowElement);
        for (let x: number = 0; x < WIDTH; x++) {
            const tileElement: HTMLElement = document.createElement("div");
            tileElement.className = "tile";
            rowElement.appendChild(tileElement);
            const tile = new Tile(tileElement, new Point(x, idx));
            row.addTile(tile);
        }

        return row;
    }

    private createShape(): void {
        this.shape = Shape.createShape();
        const shapeCanSpawn = this.shape.points
            .filter((p) => p.y === 0)
            .every((p) => this.getTile(p.x, p.y).state !== TILE_STATES.RESTING_SHAPE);
        if (!shapeCanSpawn) {
            this.loseGame();
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
        const newShapePoints: Point[] = [];
        this.shape.points.forEach((point) => {
            const newLocation = point.movePoint(direction);
            const tileAtLocation = this.getTile(newLocation.x, newLocation.y);
            if (tileAtLocation && tileAtLocation.state !== TILE_STATES.RESTING_SHAPE) {
                newShapePoints.push(tileAtLocation.point);
            }
        });
        if (newShapePoints.length !== this.shape.points.length) {
            return false;
        }

        this.shape.points
            .filter((p) => p.y !== -1)
            .map((p) => this.getTile(p.x, p.y))
            .forEach((t) => t.changeState(TILE_STATES.EMPTY));
        this.shape.points = newShapePoints;
        this.shape.points
            .filter((p) => p.y !== -1)
            .map((p) => this.getTile(p.x, p.y))
            .forEach((t) => t.changeState(TILE_STATES.MOVING_SHAPE));
        return true;
    }

    private descendShape(): void {
        const shapeDidDescend = this.moveShape(DIRECTIONS.DOWN);
        if (!shapeDidDescend) {
            this.arrestShape();
            this.createShape();
        }
    }

    private arrestShape(): void {
        this.shape.points
            .filter((p) => p.y !== -1)
            .map((p) => this.getTile(p.x, p.y))
            .forEach((t) => t.changeState(TILE_STATES.RESTING_SHAPE));
        const rowsToCheck: number[] = this.shape.points
            .filter((p) => p.y !== -1)
            .map((point) => point.y)
            .filter((y, idx, arr) => arr.indexOf(y) === idx)
            .sort((a, b) => b - a);
        const rowsToRemove: number[] = rowsToCheck
            .filter((idx) => this.rows[idx].isFull());

        if (rowsToRemove.length === 0) {
            return;
        }

        rowsToRemove.forEach((idx) => {
            this.rows[idx].element.remove();
            this.rows = [ ...this.rows.slice(0, idx), ...this.rows.slice(idx + 1)];
        });

        for (let idx: number = 0; idx < rowsToRemove.length; idx += 1) {
            const row = this.createRow(idx);
            this.rows.unshift(row);
            this.gameBoard.insertBefore(row.element, this.rows[1].element);
        }

        this.rows.forEach((row, y) => row.updateYIndex(y));
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
