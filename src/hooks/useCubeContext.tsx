import { CubeContext } from "../components/Provider";
import { useContext } from "react";

const useCubeContext = () => {
    const context = useContext(CubeContext);
    if (context === undefined) {
        throw new Error('useCubeContext must be used within a CubeProvider');
    }
    return context;
}

export default useCubeContext;