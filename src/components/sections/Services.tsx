import { useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import {
    Settings,
    BrainCircuit,
    FileText,
    Wallet,
    BadgeCheck,
    Headset,
    ArrowRight,
} from 'lucide-react';
import { RevealText, SPRING, VIEWPORT } from '../ui/MotionKit';

const BENTO_SPRING = { type: 'spring' as const, stiffness: 100, damping: 20 };

const bentoFadeUp = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: BENTO_SPRING },
};

const bentoContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
    { icon: <Settings size={28} />, title: 'Custom BPA', desc: 'Tailored business process architecture designed specifically for your unique operational model.', span: 'md:col-span-2 md:row-span-1' },
    { icon: <BrainCircuit size={28} />, title: 'AI Consulting', desc: 'Strategic advisory on implementing GenAI and Machine Learning models to augment human labor.', span: 'md:row-span-2' },
    { icon: <FileText size={28} />, title: 'IDP', desc: 'Intelligent Document Processing using OCR to digitize invoices, contracts, and IDs instantly.', span: '' },
    { icon: <Wallet size={28} />, title: 'Financial Automation', desc: 'Automate accounts payable, receivable, and reconciliation to eliminate month-end stress.', span: '' },
    { icon: <BadgeCheck size={28} />, title: 'HR Automation', desc: 'Streamline the employee lifecycle from onboarding to payroll and performance management.', span: 'md:col-span-2' },
    { icon: <Headset size={28} />, title: 'Customer Service', desc: 'Deploy 24/7 intelligent agents that resolve tickets and handle inquiries autonomously.', span: '' },
];

const Services = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!gridRef.current || !spotlightRef.current) return;
        const { left, top } = gridRef.current.getBoundingClientRect();
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.background = `radial-gradient(500px circle at ${e.clientX - left}px ${e.clientY - top}px, rgba(56,189,248,0.07), transparent 60%)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
    }, []);

    return (
        <section className="bg-background-light py-24" id="services">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={SPRING.gentle}
                    className="mb-16"
                >
                    <RevealText>
                        <h2 className="text-4xl font-black text-slate-900">Our Services</h2>
                    </RevealText>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ ...SPRING.default, delay: 0.2 }}
                        className="mt-4 h-1.5 w-24 bg-primary rounded-full origin-left"
                    />
                </motion.div>

                <motion.div
                    ref={gridRef}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={bentoContainer}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto"
                >
                    {/* ── Cursor-tracking spotlight glow ── */}
                    <div
                        ref={spotlightRef}
                        className="pointer-events-none absolute -inset-4 z-0 transition-opacity duration-300 opacity-0 will-change-[background]"
                    />

                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            variants={bentoFadeUp}
                            className={`group relative z-10 rounded-2xl bg-gradient-to-br from-white/80 to-white/30 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 transition-all duration-300 ease-out hover:border-blue-200 hover:shadow-[0_8px_30px_rgba(56,189,248,0.08)] will-change-transform ${service.span}`}
                        >
                            {/* Squircle icon container */}
                            <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-[14px] bg-primary/8 text-primary shadow-inner border border-primary/10 transition-all duration-300 group-hover:bg-primary/15 group-hover:border-primary/25 group-hover:shadow-[inset_0_2px_4px_rgba(56,189,248,0.2)]">
                                {service.icon}
                            </div>

                            {/* Title with animated arrow */}
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                                <ArrowRight
                                    size={16}
                                    className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary"
                                />
                            </div>

                            <p className="text-slate-500 leading-relaxed">{service.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
