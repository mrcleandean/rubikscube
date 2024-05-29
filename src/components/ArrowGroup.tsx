import { ARROW_HOVER_SCALE, ARROW_SPRING_CONFIG } from '../constants';
import { a, useSpring } from '@react-spring/three';

import type { FC } from 'react';
import type { Group, Object3DEventMap, Material } from 'three';


export type ArrowGroupProps = {
    scene: Group<Object3DEventMap>,
    mats: [Material, Material],
    position: [number, number, number],
    rotation: [number, number, number]
    cw: () => void,
    ccw: () => void
}

const ArrowGroup: FC<ArrowGroupProps> = ({ scene, mats, position, rotation, cw, ccw }) => {
    const { scale: scaleCW } = useSpring({ scale: 1, config: ARROW_SPRING_CONFIG });
    const { scale: scaleCCW } = useSpring({ scale: 1, config: ARROW_SPRING_CONFIG })
    return (
        <group
            position={position}
            rotation={rotation}
        >
            <a.group
                onClick={(e) => {
                    e.stopPropagation();
                    cw();
                }}
                onPointerOver={() => scaleCW.start(ARROW_HOVER_SCALE)}
                onPointerOut={() => scaleCW.start(1)}
                scale={scaleCW}
            >
                <primitive
                    object={scene.clone()}
                    rotation={[-Math.PI / 2, Math.PI, Math.PI / 2]}
                    children-0-material={mats[0]}
                    scale={0.4}
                />
            </a.group>
            <a.group
                onClick={(e) => {
                    e.stopPropagation();
                    ccw();
                }}
                onPointerOver={() => scaleCCW.start(ARROW_HOVER_SCALE)}
                onPointerOut={() => scaleCCW.start(1)}
                scale={scaleCCW}
            >
                <primitive
                    object={scene.clone()}
                    rotation={[0, 0, Math.PI / 2]}
                    children-0-material={mats[1]}
                    scale={0.4}
                />
            </a.group>
        </group>
    )
}

export default ArrowGroup;