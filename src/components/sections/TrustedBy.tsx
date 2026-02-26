import { useState } from 'react';
import { motion } from 'motion/react';
import { SPRING, VIEWPORT } from '../ui/MotionKit';

/* ─── SVG Logo Placeholders ─── */
const logos = [
    {
        name: 'Meridian', svg: (
            <svg viewBox="0 0 140 36" className="h-8 w-auto">
                <rect x="0" y="8" width="20" height="20" rx="4" className="fill-current" />
                <text x="28" y="25" className="fill-current text-[16px] font-bold" fontFamily="Inter, system-ui, sans-serif">Meridian</text>
            </svg>
        )
    },
    {
        name: 'NovaTech', svg: (
            <svg viewBox="0 0 140 36" className="h-8 w-auto">
                <polygon points="10,4 20,28 0,28" className="fill-current" />
                <text x="26" y="25" className="fill-current text-[16px] font-bold" fontFamily="Inter, system-ui, sans-serif">NovaTech</text>
            </svg>
        )
    },
    {
        name: 'Apex', svg: (
            <svg viewBox="0 0 100 36" className="h-8 w-auto">
                <circle cx="12" cy="18" r="10" className="fill-current" />
                <text x="28" y="25" className="fill-current text-[16px] font-bold" fontFamily="Inter, system-ui, sans-serif">Apex</text>
            </svg>
        )
    },
    {
        name: 'Stratos', svg: (
            <svg viewBox="0 0 120 36" className="h-8 w-auto">
                <rect x="0" y="6" width="18" height="10" rx="2" className="fill-current" />
                <rect x="0" y="20" width="18" height="10" rx="2" className="fill-current opacity-50" />
                <text x="26" y="25" className="fill-current text-[16px] font-bold" fontFamily="Inter, system-ui, sans-serif">Stratos</text>
            </svg>
        )
    },
    {
        name: 'Helix', svg: (
            <svg viewBox="0 0 110 36" className="h-8 w-auto">
                <path d="M4 28 Q10 4 16 18 Q22 32 28 8" strokeWidth="3" className="stroke-current fill-none" />
                <text x="34" y="25" className="fill-current text-[16px] font-bold" fontFamily="Inter, system-ui, sans-serif">Helix</text>
            </svg>
        )
    },
    {
        name: 'Quantum', svg: (
            <svg viewBox="0 0 140 36" className="h-8 w-auto">
                <rect x="0" y="8" width="20" height="20" rx="10" className="fill-none stroke-current" strokeWidth="2.5" />
                <circle cx="10" cy="18" r="4" className="fill-current" />
                <text x="28" y="25" className="fill-current text-[16px] font-bold" fontFamily="Inter, system-ui, sans-serif">Quantum</text>
            </svg>
        )
    },
    {
        name: 'Vantage', svg: (
            <svg viewBox="0 0 130 36" className="h-8 w-auto">
                <path d="M0 8 L10 28 L20 8" strokeWidth="3" className="stroke-current fill-none" />
                <text x="28" y="25" className="fill-current text-[16px] font-bold" fontFamily="Inter, system-ui, sans-serif">Vantage</text>
            </svg>
        )
    },
    {
        name: 'Zenith', svg: (
            <svg viewBox="0 0 120 36" className="h-8 w-auto">
                <path d="M0 8 H18 L0 28 H18" strokeWidth="2.5" className="stroke-current fill-none" />
                <text x="26" y="25" className="fill-current text-[16px] font-bold" fontFamily="Inter, system-ui, sans-serif">Zenith</text>
            </svg>
        )
    },
];

// Double the array for seamless looping
const doubledLogos = [...logos, ...logos];

const TrustedBy = () => {
    const [paused, setPaused] = useState(false);

    return (
        <section className="py-20 bg-slate-900 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                {/* Overline */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={SPRING.default}
                    className="text-center tracking-widest text-slate-400 text-sm uppercase font-bold mb-14"
                >
                    Trusted by innovative SMEs
                </motion.p>
            </div>

            {/* Marquee container with gradient edge mask */}
            <div
                className="relative"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        x: {
                            duration: 30,
                            repeat: Infinity,
                            ease: 'linear',
                            repeatType: 'loop',
                        },
                    }}
                    style={{ animationPlayState: paused ? 'paused' : 'running' }}
                    className="flex items-center gap-16 w-max"
                    whileHover={{ animationPlayState: 'paused' }}
                >
                    {doubledLogos.map((logo, i) => (
                        <div
                            key={`${logo.name}-${i}`}
                            className="flex-shrink-0 text-slate-500 opacity-50 grayscale brightness-75 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110 hover:text-primary cursor-default px-4"
                        >
                            {logo.svg}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustedBy;
