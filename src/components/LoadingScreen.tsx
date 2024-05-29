import { motion, AnimatePresence } from "framer-motion";
import { ImSpinner2 } from "react-icons/im";

const LoadingScreen = ({ loading }: { loading: boolean }) => {
    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 bg-[#11151c] z-20 flex flex-col items-center justify-center gap-2"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, pointerEvents: 'none' }}
                >
                    <h1 className="text-white text-md">Rubik's Cube</h1>
                    <div className="animate-spin">
                        <ImSpinner2 color="white" size={40} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoadingScreen;