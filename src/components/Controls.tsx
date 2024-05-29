import useCubeContext from "../hooks/useCubeContext";
import { useGLTF } from "@react-three/drei";
import { MeshBasicMaterial } from "three";
import { ARROW_COOR } from "../constants";
import ArrowGroup from "./ArrowGroup";
import { useMemo } from "react";

const Controls = () => {
    const { rotations } = useCubeContext();
    const { scene } = useGLTF('/arrow.glb');

    const white = useMemo(() => new MeshBasicMaterial({ color: 'white' }), []);
    const black = useMemo(() => new MeshBasicMaterial({ color: 'black' }), []);

    return (
        <>
            <ArrowGroup
                scene={scene}
                mats={[white, black]}
                position={[ARROW_COOR, 0, 0]}
                rotation={[0, 0, 0]}
                cw={() => rotations.orange.cw()}
                ccw={() => rotations.orange.ccw()}
            /> {/* orange */}
            <ArrowGroup
                scene={scene}
                mats={[white, black]}
                position={[-ARROW_COOR, 0, 0]}
                rotation={[0, Math.PI, 0]}
                cw={() => rotations.red.cw()}
                ccw={() => rotations.red.ccw()}
            /> {/* red */}

            <ArrowGroup
                scene={scene}
                mats={[white, black]}
                position={[0, 0, ARROW_COOR]}
                rotation={[0, -Math.PI / 2, 0]}
                cw={() => rotations.green.cw()}
                ccw={() => rotations.green.ccw()}
            /> {/* green */}
            <ArrowGroup
                scene={scene}
                mats={[white, black]}
                position={[0, 0, -ARROW_COOR]}
                rotation={[0, Math.PI / 2, 0]}
                cw={() => rotations.blue.cw()}
                ccw={() => rotations.blue.ccw()}
            /> {/* blue */}


            <ArrowGroup
                scene={scene}
                mats={[white, black]}
                position={[0, ARROW_COOR, 0]}
                rotation={[0, Math.PI / 2, Math.PI / 2]}
                cw={() => rotations.yellow.cw()}
                ccw={() => rotations.yellow.ccw()}
            /> {/* yellow */}
            <ArrowGroup
                scene={scene}
                mats={[white, black]}
                position={[0, -ARROW_COOR, 0]}
                rotation={[0, 0, Math.PI / 2]}
                cw={() => rotations.white.cw()}
                ccw={() => rotations.white.ccw()}
            /> {/* white */}
        </>
    )
}

export default Controls;