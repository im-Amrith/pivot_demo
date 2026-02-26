import { motion } from 'motion/react';
import { RevealText, SPRING, VIEWPORT, staggerContainer, fadeSlideUp, SpotlightCard } from '../ui/MotionKit';

const Stats = () => (
    <section className="bg-slate-900 py-20 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={SPRING.gentle}
                    className="lg:w-1/3"
                >
                    <RevealText>
                        <h2 className="text-3xl font-black lg:text-4xl">Efficiency Gains Delivered</h2>
                    </RevealText>
                    <p className="mt-4 text-slate-400">Our intelligent automation layer provides measurable ROI within the first 90 days of implementation.</p>
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={staggerContainer(0.12)}
                    className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3"
                >
                    {[
                        { label: 'Productivity', value: '40%', desc: 'Overall throughput increase across automated departments.', color: 'text-primary' },
                        { label: 'Cost Reduction', value: '30%', desc: 'Lower operational overhead by eliminating repetitive labor.', color: 'text-orange-500' },
                        { label: 'Accuracy', value: '95%', desc: 'Reduction in manual data entry errors and rework costs.', color: 'text-green-500' },
                    ].map((stat, i) => (
                        <SpotlightCard
                            key={i}
                            className="bg-white/5 p-8"
                        >
                            <p className={`text-sm font-bold uppercase tracking-widest ${stat.color}`}>{stat.label}</p>
                            <motion.p
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ ...SPRING.snappy, delay: i * 0.1 + 0.2 }}
                                className="mt-2 text-5xl font-black"
                            >
                                {stat.value}
                            </motion.p>
                            <p className="mt-2 text-slate-400">{stat.desc}</p>
                        </SpotlightCard>
                    ))}
                </motion.div>
            </div>
        </div>
    </section>
);

export default Stats;
