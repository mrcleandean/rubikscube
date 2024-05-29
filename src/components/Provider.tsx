import { type ReactNode, type RefObject, createContext, useRef, useCallback } from "react";
import { type SpringValue, config, useSpring } from "@react-spring/three";
import { ColorsType, RANDOMIZE_DEPTH, SIDES } from "../constants";
import { AUDIO } from '../constants';

import type { Object3DEventMap, Group } from "three";

export type RotationsType = {
    [key in ColorsType]: {
        cw: (chain?: null | number) => void,
        ccw: (chain?: null | number) => void
    }
}

export type CubeContextType = {
    randomSpring: SpringValue<number>;

    rotationRef: RefObject<Group<Object3DEventMap>>;
    mainRef: RefObject<Group<Object3DEventMap>>;
    rotationSpring: SpringValue<[number, number, number]>

    rotate: (axis: 'x' | 'y' | 'z', dir: 1 | -1, filter: '+' | '-' | '0', chain?: number | null) => void
    rotations: RotationsType
} | undefined

export const CubeContext = createContext<CubeContextType>(undefined);

const Provider = ({ children }: { children: ReactNode }) => {
    const rotationRef = useRef<Group>(null);
    const mainRef = useRef<Group>(null);

    const { rotation: rotationSpring } = useSpring<{ rotation: [number, number, number] }>({
        rotation: [0, 0, 0],
        config: config.stiff
    });
    const { scale: randomSpring } = useSpring({ scale: 0, config: config.stiff });

    const rotate = useCallback((axis: 'x' | 'y' | 'z', dir: 1 | -1, filter: '+' | '-' | '0', chain: null | number = null) => {
        if (!rotationRef.current || !mainRef.current || rotationSpring.isAnimating) return;
        AUDIO.load();
        AUDIO.currentTime = 0.15;
        AUDIO.play();
        populateMainRef();
        populateRotationRef(axis, filter);
        animate(axis, dir, chain);
    }, [rotationRef, mainRef, rotationSpring])

    const populateMainRef = useCallback(() => {
        rotationRef.current?.children.slice().forEach(cube => mainRef.current?.attach(cube))
        rotationRef.current?.quaternion.set(0, 0, 0, 1);
        rotationSpring.set([0, 0, 0]);
    }, [rotationRef, mainRef, rotationSpring]);

    const populateRotationRef = useCallback((axis: 'x' | 'y' | 'z', filter: '+' | '-' | '0') => {
        mainRef.current?.children
            .slice()
            .filter((cube) => {
                const pos = cube.position[axis];
                return filter === '+' ? pos > 0.5 : filter === '-' ? pos < -0.5 : Math.abs(pos) < 0.5;
            })
            .forEach((cube) => rotationRef.current?.attach(cube))
    }, [mainRef, rotationRef]);

    const animate = useCallback((axis: 'x' | 'y' | 'z', dir: 1 | -1, chain: null | number) => {
        rotationSpring.start([
            axis === 'x' ? Math.PI / 2 * dir : 0,
            axis === 'y' ? Math.PI / 2 * dir : 0,
            axis === 'z' ? Math.PI / 2 * dir : 0
        ]).then(() => {
            if (chain === null) return; // if chain is null, it means it's a single rotation
            if (chain >= RANDOMIZE_DEPTH) { // break out of the randomization chain
                randomSpring.start(0);
                populateMainRef();
                return;
            }
            randomSpring.start((chain + 1) / (RANDOMIZE_DEPTH));
            const side = SIDES[Math.floor(Math.random() * SIDES.length)];
            const type = Math.random() > 0.5 ? 'cw' : 'ccw';
            rotations[side][type](chain + 1);
        })
    }, [rotationSpring, randomSpring, populateMainRef]);

    const rotations: RotationsType = {
        orange: {
            cw: (chain: null | number = null) => rotate('x', -1, '+', chain),
            ccw: (chain: null | number = null) => rotate('x', 1, '+', chain)
        },
        red: {
            cw: (chain: null | number = null) => rotate('x', 1, '-', chain),
            ccw: (chain: null | number = null) => rotate('x', -1, '-', chain)
        },
        yellow: {
            cw: (chain: null | number = null) => rotate('y', -1, '+', chain),
            ccw: (chain: null | number = null) => rotate('y', 1, '+', chain)
        },
        white: {
            cw: (chain: null | number = null) => rotate('y', -1, '-', chain),
            ccw: (chain: null | number = null) => rotate('y', 1, '-', chain)
        },
        green: {
            cw: (chain: null | number = null) => rotate('z', -1, '+', chain),
            ccw: (chain: null | number = null) => rotate('z', 1, '+', chain)
        },
        blue: {
            cw: (chain: null | number = null) => rotate('z', 1, '-', chain),
            ccw: (chain: null | number = null) => rotate('z', -1, '-', chain)
        },
    }

    return (
        <CubeContext.Provider value={{
            randomSpring,

            rotationRef,
            mainRef,
            rotationSpring,

            rotate,
            rotations
        }}>
            {children}
        </CubeContext.Provider>
    )
}

export default Provider;