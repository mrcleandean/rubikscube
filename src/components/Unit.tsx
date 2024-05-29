import { COLOR_SIDES } from "../constants";
import { type FC, useRef } from "react";

import type { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import type { Mesh } from "three";

export type UnitProps = {
    position: [number, number, number],
    geometry: RoundedBoxGeometry
}

const Unit: FC<UnitProps> = ({ position, geometry }) => {
    const meshRef = useRef<Mesh>(null);
    return (
        <mesh
            position={position}
            ref={meshRef}
            key={`${position[0]}-${position[1]}-${position[2]}`}
            geometry={geometry}
            onClick={(e) => e.stopPropagation()}
        >
            {[...Array(6).keys()].map((i) => (
                <meshStandardMaterial
                    key={i}
                    attach={`material-${i}`}
                    color={position[COLOR_SIDES[i][0]] === COLOR_SIDES[i][1] ? COLOR_SIDES[i][2] : 'black'}
                    roughness={0.1}
                />
            ))}
        </mesh>
    )
}

export default Unit;