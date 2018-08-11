export const TILE_STATES = {
    EMPTY: "__EMPTY",
    MOVING_SHAPE: "__MOVING_SHAPE",
    RESTING_SHAPE: "__RESTING_SHAPE",
};

export const HEIGHT: number = 20;
export const WIDTH: number = 10;

export const DIRECTIONS = {
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
};

export const GAME_STATES = {
    LOST: "__LOST",
    PLAYING: "__PLAYING",
    STOPPED: "__STOPPED",
};

export const KEYS = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
};
