import { motion } from 'motion/react';
import pivotLogoImg from './PIVOT.png';

const PivotLogo = ({ className = "h-10 w-10", isLoader = false }: { className?: string, isLoader?: boolean }) => {
    return (
        <motion.div
            whileHover={!isLoader ? { rotate: 15 } : {}}
            animate={isLoader ? { rotate: 360 } : {}}
            transition={isLoader ? { duration: 2, repeat: Infinity, ease: "linear" } : { type: "spring", stiffness: 300 }}
            className={`relative flex items-center justify-center rounded-lg backdrop-blur-sm overflow-hidden ${className}`}
            style={{
                filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.5))",
            }}
        >
            <motion.img
                src={pivotLogoImg}
                alt="Pivot Logo"
                className="h-full w-full object-contain"
                animate={!isLoader ? {
                    scale: [1, 1.05, 1],
                } : {}}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                referrerPolicy="no-referrer"
            />
        </motion.div>
    );
};

export default PivotLogo;
