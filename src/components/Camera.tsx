import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const Camera = () => {
    return (
        <>
            <OrbitControls makeDefault maxDistance={20} minDistance={5} panSpeed={0} />
            <PerspectiveCamera makeDefault position={[6, 5, -6]} />
        </>
    )
}

export default Camera;