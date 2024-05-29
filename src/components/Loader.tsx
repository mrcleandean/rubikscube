import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useProgress } from "@react-three/drei";

const Loader = ({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) => {
    const { progress } = useProgress();

    useEffect(() => {
        if (progress === 100) {
            setLoading(false);
        }
    }, [progress]);

    return null;
}

export default Loader;