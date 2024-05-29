import useCubeContext from "../hooks/useCubeContext";
import { Canvas } from "@react-three/fiber";
import { a } from "@react-spring/three";
import Background from "./Background";
import Camera from "./Camera";
import Lights from "./Lights";
import Action from "./Action";
import Cube from "./Cube";

const Experience = () => {
    const { mainRef, rotationRef, rotationSpring } = useCubeContext();
    return (
        <Canvas className="z-0">
            <a.group ref={mainRef}>
                <Cube />
            </a.group>
            <a.group ref={rotationRef} rotation={rotationSpring as unknown as [number, number, number]} />
            <Camera />
            <Lights />
            <Action />
            <Background />
        </Canvas>
    )
}

export default Experience;