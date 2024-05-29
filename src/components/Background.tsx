import { Depth, LayerMaterial, Noise } from "lamina";
import { useFrame } from "@react-three/fiber";
import { BackSide, type Mesh } from "three";
import { useRef } from "react";


const Background = () => {
    const ref = useRef<Mesh>(null);

    useFrame((_state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta * 0.1;
    });

    return (
        <mesh scale={20} ref={ref}>
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial side={BackSide}>
                <Depth
                    colorA="#f21a62"
                    colorB="#0081fc"
                    alpha={1}
                    mode="normal"
                    near={130}
                    far={200}
                    origin={[100, 100, -100]}
                />
                <Noise
                    mapping="local"
                    type="white"
                    scale={100}
                    colorA="white"
                    colorB="black"
                    mode="subtract"
                    alpha={0.42}
                />
            </LayerMaterial>
        </mesh>
    );
};

export default Background;