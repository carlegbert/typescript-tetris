import "./index.css";

(() => {
    const gameBoard: HTMLElement = document.getElementById("game");
    for (let y: number = 0; y < 20; y++) {
        const row: HTMLElement = document.createElement("div");
        row.className = "row";
        gameBoard.appendChild(row);
        for (let x: number = 0; x < 10; x++) {
            const tile: HTMLElement = document.createElement("div");
            tile.className = "tile";
            tile.id = `x${x}y${y}`;
            row.appendChild(tile);
        }
    }
})();
