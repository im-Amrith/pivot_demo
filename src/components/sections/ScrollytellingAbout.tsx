import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/* ─── Three narrative phases ─── */
const narratives = [
    {
        overline: '01 — The Problem',
        headline: 'Manual processes are killing your margins.',
        body: 'Your team spends 60% of their day on repetitive data entry, document chasing, and approval bottlenecks. Every hour wasted is revenue lost to competitors who already automated.',
    },
    {
        overline: '02 — Our Pivot',
        headline: 'We architect intelligence into your workflows.',
        body: "Pivot doesn't bolt on software—we redesign your operational DNA. Our AI-powered agents learn your processes, eliminate friction, and scale your team's output without adding headcount.",
    },
    {
        overline: '03 — The Future',
        headline: 'From manual to autonomous in 90 days.',
        body: 'Imagine a business where invoices process themselves, meetings generate their own action items, and your helpdesk never sleeps. That future starts with a single pivot.',
    },
];

const ScrollytellingAbout = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    /* ── Text block transforms (3 phases: 0→0.33, 0.33→0.66, 0.66→1) ── */
    // Block 1: visible at 0–0.3, fades out 0.3–0.4
    const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.28, 0.38], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.05, 0.28, 0.38], [40, 0, 0, -40]);

    // Block 2: fades in 0.3–0.4, visible 0.4–0.6, fades out 0.6–0.7
    const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.58, 0.68], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.3, 0.4, 0.58, 0.68], [40, 0, 0, -40]);

    // Block 3: fades in 0.6–0.7, stays visible
    const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.95, 1], [0, 1, 1, 0.8]);
    const y3 = useTransform(scrollYProgress, [0.6, 0.7, 0.95, 1], [40, 0, 0, 0]);

    const textTransforms = [
        { opacity: opacity1, y: y1 },
        { opacity: opacity2, y: y2 },
        { opacity: opacity3, y: y3 },
    ];

    /* ── Visual (orb) transforms ── */
    const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1.6]);
    const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const orbBorderRadius = useTransform(scrollYProgress, [0, 0.5, 1], ['30%', '40%', '50%']);

    // Color shifts via hue rotation
    const orbHue = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [200, 220, 260, 300]);

    // Ring animations
    const ring1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 1.8]);
    const ring1Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.15, 0.05]);
    const ring2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.6, 2.2]);
    const ring2Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.1, 0.03]);

    // Progress indicator
    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-[#0f172a]">
            {/* Sticky viewport trap */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden will-change-transform">
                {/* Ambient background gradients */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-900/15 blur-3xl" />
                </div>

                {/* Progress bar at top */}
                <motion.div
                    style={{ width: progressWidth }}
                    className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary via-sky-400 to-indigo-400 z-50"
                />

                <div className="relative mx-auto max-w-7xl px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* ── Left Column: The Narrative ── */}
                    <div className="relative h-[280px] md:h-[320px]">
                        {narratives.map((block, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    opacity: textTransforms[i].opacity,
                                    y: textTransforms[i].y,
                                }}
                                className="absolute inset-0 flex flex-col justify-center"
                            >
                                <span className="text-primary/70 text-sm font-bold uppercase tracking-widest mb-4">
                                    {block.overline}
                                </span>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6">
                                    {block.headline}
                                </h2>
                                <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-lg">
                                    {block.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* ── Right Column: The Morphing Visual ── */}
                    <div className="hidden lg:flex items-center justify-center relative">
                        {/* Outer expanding rings */}
                        <motion.div
                            style={{ scale: ring2Scale, opacity: ring2Opacity }}
                            className="absolute w-72 h-72 rounded-full border border-primary/20"
                        />
                        <motion.div
                            style={{ scale: ring1Scale, opacity: ring1Opacity }}
                            className="absolute w-72 h-72 rounded-full border border-primary/30"
                        />

                        {/* The morphing orb */}
                        <motion.div
                            style={{
                                scale: orbScale,
                                rotate: orbRotate,
                                borderRadius: orbBorderRadius,
                                filter: useTransform(orbHue, (h) => `hue-rotate(${h - 200}deg)`),
                            }}
                            className="relative w-72 h-72"
                        >
                            {/* Gradient layers */}
                            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-primary/60 via-sky-500/40 to-indigo-600/50 blur-sm" />
                            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-tr from-primary/30 via-transparent to-violet-500/20" />

                            {/* Glass inner core */}
                            <div className="absolute inset-8 rounded-[inherit] bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                                <motion.div
                                    style={{
                                        opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.8, 1]),
                                    }}
                                    className="text-center"
                                >
                                    <div className="text-5xl font-black text-white/90 mb-1">
                                        <motion.span style={{
                                            opacity: useTransform(scrollYProgress, [0, 0.33], [1, 0]),
                                        }}>⚡</motion.span>
                                        <motion.span
                                            style={{
                                                opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]),
                                            }}
                                            className="absolute inset-8 flex items-center justify-center text-5xl"
                                        >⚙️</motion.span>
                                        <motion.span
                                            style={{
                                                opacity: useTransform(scrollYProgress, [0.65, 0.75], [0, 1]),
                                            }}
                                            className="absolute inset-8 flex items-center justify-center text-5xl"
                                        >🚀</motion.span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute -inset-4 rounded-[inherit] bg-gradient-to-br from-primary/20 to-indigo-500/10 blur-2xl -z-10" />
                        </motion.div>

                        {/* Floating data points */}
                        {[
                            { x: '-20%', y: '-30%', delay: 0, label: '40% faster' },
                            { x: '25%', y: '35%', delay: 0.3, label: 'Zero errors' },
                            { x: '-35%', y: '25%', delay: 0.6, label: '24/7 uptime' },
                        ].map((point, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    opacity: useTransform(scrollYProgress, [0.2 + i * 0.15, 0.3 + i * 0.15], [0, 1]),
                                    x: point.x,
                                    y: point.y,
                                }}
                                animate={{ y: [point.y, `calc(${point.y} - 8px)`, point.y] }}
                                transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[11px] font-bold text-primary/80"
                            >
                                {point.label}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Phase indicators (bottom) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            style={{
                                opacity: useTransform(
                                    scrollYProgress,
                                    [i * 0.33, i * 0.33 + 0.05, (i + 1) * 0.33 - 0.05, (i + 1) * 0.33],
                                    [0.3, 1, 1, 0.3]
                                ),
                                scaleX: useTransform(
                                    scrollYProgress,
                                    [i * 0.33, i * 0.33 + 0.05, (i + 1) * 0.33 - 0.05, (i + 1) * 0.33],
                                    [1, 2.5, 2.5, 1]
                                ),
                            }}
                            className="h-1 w-6 rounded-full bg-primary origin-center"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollytellingAbout;
