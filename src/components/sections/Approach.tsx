import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import {
    Database,
    PenTool as DrawAuto,
    LayoutGrid,
    CheckCircle2 as Verified,
    FileOutput as ExportNotes,
    BarChart3 as Monitoring,
} from 'lucide-react';
import { RevealText, SPRING, VIEWPORT } from '../ui/MotionKit';

const TIMELINE_SPRING = { type: 'spring' as const, stiffness: 100, damping: 20 };

const steps = [
    { icon: <Database size={22} />, title: 'Data Capture', desc: 'Aggregating fragmented data points from every channel into a single pipeline.' },
    { icon: <DrawAuto size={22} />, title: 'Extract', desc: 'Intelligent information retrieval using AI-powered document parsing.' },
    { icon: <LayoutGrid size={22} />, title: 'Classify', desc: 'Automated categorization with context-aware machine learning models.' },
    { icon: <Verified size={22} />, title: 'Validate', desc: 'Ensuring 100% accuracy through multi-layer verification checks.' },
    { icon: <ExportNotes size={22} />, title: 'Export', desc: 'Seamless system integration with your existing ERP and CRM.' },
    { icon: <Monitoring size={22} />, title: 'Analyze', desc: 'Deep performance insights with real-time dashboards and alerts.' },
];

/* ─── Single Timeline Step ─── */
const TimelineStep = ({
    step,
    index,
}: {
    step: (typeof steps)[0];
    index: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const isLeft = index % 2 === 0;

    return (
        <div
            ref={ref}
            className="relative grid grid-cols-1 md:grid-cols-[1fr_60px_1fr] gap-4 md:gap-0"
        >
            {/* ── Card (left or right) ── */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={TIMELINE_SPRING}
                className={`group relative rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl shadow-blue-900/5 p-8 transition-all duration-300 hover:border-blue-400 hover:shadow-blue-500/10 ${isLeft ? 'md:col-start-1' : 'md:col-start-3'
                    } md:row-start-1`}
            >
                {/* Icon floats on hover */}
                <motion.div
                    animate={isInView ? { y: [0, -4, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                    className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-[12px] bg-primary/10 text-primary border border-primary/15 shadow-inner transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:shadow-[inset_0_2px_6px_rgba(56,189,248,0.25)]"
                >
                    {step.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </motion.div>

            {/* ── Center Node ── */}
            <div className="hidden md:flex md:col-start-2 md:row-start-1 items-center justify-center relative z-20">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ ...TIMELINE_SPRING, delay: 0.15 }}
                    className="relative"
                >
                    {/* Pulse ring */}
                    {isInView && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0.6 }}
                            animate={{ scale: 1.6, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                            className="absolute inset-0 rounded-full bg-primary/30"
                        />
                    )}
                    <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-primary/30 border-[3px] border-white">
                        {index + 1}
                    </div>
                </motion.div>
            </div>

            {/* ── Empty column (opposite side of card) ── */}
            <div className={`hidden md:block ${isLeft ? 'md:col-start-3' : 'md:col-start-1'} md:row-start-1`} />

            {/* ── Mobile node (shown only on small screens) ── */}
            <div className="flex md:hidden items-center gap-3 -mt-2 mb-2 order-first">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center text-white text-xs font-black shadow-md shadow-primary/25 border-2 border-white shrink-0">
                    {index + 1}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            </div>
        </div>
    );
};

/* ─── Main Approach Section ─── */
const Approach = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 80%', 'end 60%'],
    });

    // The glowing pipeline line grows as user scrolls
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

    return (
        <section ref={sectionRef} className="py-24 overflow-hidden relative" id="approach">
            <div className="mx-auto max-w-5xl px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={SPRING.gentle}
                    className="mb-20 text-center"
                >
                    <RevealText className="inline-block">
                        <h2 className="text-4xl font-black tracking-tight text-slate-900">Our Approach</h2>
                    </RevealText>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ ...SPRING.default, delay: 0.15 }}
                        className="mx-auto mt-4 max-w-2xl text-slate-600"
                    >
                        The 6-Step Evolution Engine designed to scale your operations seamlessly, ensuring 100% data fidelity and process transparency.
                    </motion.p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* ── Central SVG pipeline (desktop only) ── */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px]">
                        {/* Background track */}
                        <div className="absolute inset-0 rounded-full bg-slate-200" />
                        {/* Animated glowing fill */}
                        <motion.div
                            style={{ height: lineHeight, opacity: lineOpacity }}
                            className="absolute top-0 left-0 right-0 rounded-full bg-gradient-to-b from-primary via-sky-400 to-primary shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                        />
                    </div>

                    {/* ── Steps ── */}
                    <div className="flex flex-col gap-12 md:gap-16">
                        {steps.map((step, i) => (
                            <TimelineStep key={i} step={step} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Approach;
