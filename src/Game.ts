import Row from "./Row";
import Tile from "./Tile";

export default class Game {
    public static createGame(): Game {
        const game: Game = new Game();
        const gameBoard: HTMLElement = document.getElementById("game");
        for (let y: number = 0; y < 20; y++) {
            const rowElement: HTMLElement = document.createElement("div");
            rowElement.className = "row";
            gameBoard.appendChild(rowElement);
            const row = new Row(rowElement);
            game.rows.push(row);
            for (let x: number = 0; x < 10; x++) {
                const tileElement: HTMLElement = document.createElement("div");
                tileElement.className = "tile";
                rowElement.appendChild(tileElement);
                const tile = new Tile(tileElement);
                row.addTile(tile);
            }
        }

        return game;
    }

    private rows: Row[] = [];
}
