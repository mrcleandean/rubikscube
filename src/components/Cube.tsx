import { RoundedBoxGeometry } from "three/examples/jsm/Addons.js";
import { useMemo } from "react";
import Unit from './Unit';

const Cube = () => {
    const roundedBoxGeometry = useMemo(() => {
        return new RoundedBoxGeometry(1, 1, 1, 3, 0.1)
    }, []);
    return (
        <>
            {[...Array(3).keys()].map(x =>
                [...Array(3).keys()].map(y =>
                    [...Array(3).keys()].map(z => (
                        <Unit
                            position={[x - 1, y - 1, z - 1]}
                            geometry={roundedBoxGeometry}
                            key={`cube-${x}-${y}-${z}`}
                        />
                    ))
                )
            )}
        </>
    )
}

export default Cube;