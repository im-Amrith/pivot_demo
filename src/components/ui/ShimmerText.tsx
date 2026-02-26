import { motion } from 'motion/react';

const ShimmerText = ({ text }: { text: string }) => {
    const words = text.split(" ");

    return (
        <div className="relative cursor-default">
            <h1 className="relative z-10 text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight text-slate-200 neo-kerning break-words hyphens-auto">
                {words.map((word, i) => (
                    <span key={i} className="relative inline-block mr-[0.25em] last:mr-0">
                        {/* Base Text Layer */}
                        <span className="relative z-10">{word}</span>

                        {/* Shimmer Overlay Layer */}
                        <span
                            className="absolute inset-0 z-20 neo-shimmer-text pointer-events-none"
                            aria-hidden="true"
                        >
                            {word}
                        </span>

                        {/* Glow Layer for specific words */}
                        {(word === "Transformation" || word === "Evolution") && (
                            <motion.span
                                animate={{
                                    opacity: [0, 1, 0],
                                    filter: ["drop-shadow(0 0 0px #38bdf8)", "drop-shadow(0 0 15px #38bdf8)", "drop-shadow(0 0 0px #38bdf8)"]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: [0.4, 0, 0.2, 1],
                                    delay: 2.4
                                }}
                                className="absolute inset-0 z-0 text-primary/20 pointer-events-none"
                                aria-hidden="true"
                            >
                                {word}
                            </motion.span>
                        )}
                    </span>
                ))}
            </h1>
        </div>
    );
};

export default ShimmerText;
