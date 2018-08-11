export default class Tile {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  public changeState(newState: string): void {
    this.element.className = `tile ${newState}`;
  }
}
