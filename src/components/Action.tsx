import { GizmoHelper, GizmoViewport, Html } from "@react-three/drei";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { a, useSpring, config } from "@react-spring/web";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import useCubeContext from "../hooks/useCubeContext";
import { SIDES, STYLES } from "../constants";
import { LuAxis3D } from "react-icons/lu";
import { useState } from "react";
import Controls from "./Controls";

const Action = () => {
    const { rotations, randomSpring } = useCubeContext();
    const [showAxes, setShowAxes] = useState(true);
    const [showArrows, setShowArrows] = useState(true);

    const { scale: axisSpring } = useSpring({ scale: showAxes ? 1 : 0, config: config.stiff });
    const { scale: arrowSpring } = useSpring({ scale: showArrows ? 1 : 0, config: config.stiff });

    const randomize = () => {
        const side = SIDES[Math.floor(Math.random() * SIDES.length)];
        const type = Math.random() > 0.5 ? 'cw' : 'ccw';
        rotations[side][type](0);
    }

    return (
        <>
            <Html fullscreen>
                <div className="sm:w-fit sm:rounded-bl-md w-full h-fit absolute bg-white right-0 box-border p-2 flex justify-center gap-2 items-start">
                    <button
                        onClick={randomize}
                        className={`${STYLES.button} bg-black`}
                    >
                        <p className="relative z-[1]">Randomize</p>
                        <GiPerspectiveDiceSixFacesRandom color="white" size={22} className="relative z-[1]" />
                        <a.div className={`${STYLES.buttonBackground} bg-blue-500 origin-left`} style={{ scaleX: randomSpring }} />
                    </button>
                    <button
                        onClick={() => setShowAxes(prev => !prev)}
                        className={`${STYLES.button} bg-red-500`}
                    >
                        <p className="relative z-[1]">Axes</p>
                        <LuAxis3D color="white" size={18} className="relative z-[1]" />
                        <a.div className={`${STYLES.buttonBackground} bg-lime-500 origin-bottom`} style={{ scaleY: axisSpring }} />
                    </button>
                    <button
                        onClick={() => setShowArrows(prev => !prev)}
                        className={`${STYLES.button} bg-red-500`}
                    >
                        <p className="relative z-[1]">Arrows</p>
                        <PiArrowsClockwiseBold color="white" size={20} className="relative z-[1]" />
                        <a.div className={`${STYLES.buttonBackground} bg-lime-500 origin-top`} style={{ scaleY: arrowSpring }} />
                    </button>
                </div>
            </Html>
            {showArrows && (
                <Controls />
            )}
            {showAxes && (
                <GizmoHelper
                    alignment="bottom-right" // widget alignment within scene
                    margin={[80, 80]} // widget margins (X, Y)
                >
                    <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
                </GizmoHelper>
            )}
        </>
    )
}

export default Action;