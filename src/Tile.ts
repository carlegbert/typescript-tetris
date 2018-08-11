import { TILE_STATES } from "./constants";
import Point from "./Point";

export default class Tile {
  public point: Point;
  public state: string;
  private element: HTMLElement;

  constructor(element: HTMLElement, point: Point) {
    this.element = element;
    this.point = point;
    this.state = TILE_STATES.EMPTY;
  }

  public changeState(newState: string): void {
    this.state = newState;
    this.element.className = `tile ${this.state}`;
  }
}
