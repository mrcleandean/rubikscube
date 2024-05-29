const Lights = () => {
    return (
        <>
            <pointLight position={[7, 7, 7]} intensity={500} color="white" />
            <pointLight position={[-7, -10, -7]} intensity={500} color="white" />
            <ambientLight intensity={0.1} />
        </>
    )
}

export default Lights;