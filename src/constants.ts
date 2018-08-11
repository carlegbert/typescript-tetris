export const TILE_STATES = {
    EMPTY: "__EMPTY",
    MOVING_SHAPE: "__MOVING_SHAPE",
    RESTING_SHAPE: "__RESTING_SHAPE",
};

export const HEIGHT: number = 20;
export const WIDTH: number = 10;

export interface IDirection {
    x: number;
    y: number;
}

export const DIRECTIONS = {
    DOWN: { x: 0, y: 1 },
    LEFT: { x: 1, y: 0 },
    RIGHT: { x: -1, y: 0 },
};
