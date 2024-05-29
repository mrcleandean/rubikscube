export type ColorsType = 'orange' | 'red' | 'yellow' | 'white' | 'green' | 'blue';

export const SIDES: ColorsType[] = ['orange', 'red', 'yellow', 'white', 'green', 'blue'];

export const COLOR_SIDES: [number, number, ColorsType][] = [
    [0, 1, 'orange'],
    [0, -1, 'red'],
    [1, 1, 'yellow'],
    [1, -1, 'white'],
    [2, 1, 'green'],
    [2, -1, 'blue']
]

export const STYLES = {
    button: 'flex justify-center items-center gap-1 py-1 px-2 text-white rounded-lg drop-shadow-2xl shadow-2xl relative overflow-hidden md:hover:scale-105 transition-all',
    buttonBackground: 'absolute z-0 inset-0'
}

export const ARROW_HOVER_SCALE = 1.125;

export const ARROW_SPRING_CONFIG = {
    mass: 1,
    tension: 450,
    friction: 26
}

export const ARROW_COOR = 1.65;

export const RANDOMIZE_DEPTH = 25;

const AUDIO = new Audio('/turn.mp3');
AUDIO.volume = 0.65;

export { AUDIO }