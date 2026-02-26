import { motion } from 'motion/react';
import {
    Target,
    Cpu,
    Handshake,
    ShieldCheck,
    CheckCircle2 as Verified
} from 'lucide-react';
import { RevealText, SPRING, VIEWPORT, staggerContainer } from '../ui/MotionKit';
import MagneticButton from '../ui/MagneticButton';

const PIVOT_SPRING = { type: 'spring' as const, mass: 1, stiffness: 100, damping: 15 };

const bentoFadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: PIVOT_SPRING },
};

const WhyUs = () => (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        {/* ── Ambient volumetric glow ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* ── Left Column: Bento Grid ── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={staggerContainer(0.15)}
                    className="grid grid-cols-2 gap-5"
                >
                    {[
                        { icon: <Target size={28} />, title: 'Strategic Implementation', desc: "We don't just plug in software; we re-architect your workflows for maximum efficiency.", mt: false },
                        { icon: <Cpu size={28} />, title: 'SME Centric', desc: 'Solutions scaled and priced for small and medium enterprises, not just tech giants.', mt: true },
                        { icon: <Handshake size={28} />, title: 'Long-term Partnership', desc: 'Continuous optimization and support as your business scales and technologies evolve.', mt: false },
                        { icon: <ShieldCheck size={28} />, title: 'Secure & Compliant', desc: 'Bank-grade security protocols for all your automated data pipelines.', mt: true },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={bentoFadeUp}
                            whileHover={{
                                y: -8,
                                borderColor: 'rgba(56,189,248,0.5)',
                                transition: PIVOT_SPRING,
                            }}
                            className={`group bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-[border-color] duration-300 cursor-default ${item.mt ? 'lg:mt-10' : ''}`}
                        >
                            {/* Icon in glowing container */}
                            <motion.div
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                transition={PIVOT_SPRING}
                                className="mb-5 inline-flex items-center justify-center bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 text-primary transition-all duration-300 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 group-hover:shadow-lg group-hover:shadow-blue-500/10"
                            >
                                {item.icon}
                            </motion.div>
                            <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Right Column: Headline & CTA (Sticky) ── */}
                <div className="lg:sticky lg:top-32">
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={VIEWPORT}
                        transition={PIVOT_SPRING}
                    >
                        <RevealText>
                            <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">Why companies pivot with us.</h2>
                        </RevealText>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...PIVOT_SPRING, delay: 0.15 }}
                            className="text-slate-400 text-lg mb-10 leading-relaxed"
                        >
                            Most automation attempts fail because they lack a strategic foundation. We provide the architecture, the technology, and the ongoing support to ensure your digital transformation sticks.
                        </motion.p>
                        <MagneticButton className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-lg shadow-xl shadow-primary/20 transition-all flex items-center gap-2">
                            Get Your Free Audit
                            <Verified size={20} />
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
);

export default WhyUs;
