import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Home, Truck } from 'lucide-react';
import { RevealText, SPRING, VIEWPORT, staggerContainer, scaleIn } from '../ui/MotionKit';
import MagneticButton from '../ui/MagneticButton';

const SuccessStories = () => (
    <section className="py-24 overflow-hidden" id="success">
        <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={SPRING.gentle}
                >
                    <RevealText>
                        <h2 className="text-4xl font-black text-slate-900">Success Stories</h2>
                    </RevealText>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ ...SPRING.default, delay: 0.12 }}
                        className="mt-4 text-slate-600"
                    >
                        Real-world results for our partners.
                    </motion.p>
                </motion.div>
                <div className="flex gap-4">
                    <MagneticButton className="size-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                        <ChevronLeft size={24} />
                    </MagneticButton>
                    <MagneticButton className="size-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors">
                        <ChevronRight size={24} />
                    </MagneticButton>
                </div>
            </div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={staggerContainer(0.2)}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            >
                {[
                    { tag: 'FINTECH', title: 'Digital Mortgage Processing', desc: 'Automated document verification for a leading housing finance firm.', stat: '80%', statDesc: 'Reduction in TAT', icon: <Home size={48} />, color: 'bg-primary/10', textColor: 'text-primary', image: 'input_file_0.png' },
                    { tag: 'SUPPLY CHAIN', title: 'Supply Chain Sync', desc: 'Real-time inventory automation across 12 distribution centers.', stat: '60%', statDesc: 'Cost Savings', icon: <Truck size={48} />, color: 'bg-orange-500/10', textColor: 'text-orange-500', image: 'input_file_1.png' },
                ].map((story, i) => (
                    <motion.div
                        key={i}
                        variants={scaleIn}
                        whileHover={{ y: -8, transition: SPRING.snappy }}
                        className="group cursor-pointer overflow-hidden rounded-xl border border-white/20 bg-white/40 backdrop-blur-md shadow-sm transition-[border-color,box-shadow] duration-300 hover:shadow-2xl hover:border-sky-500/40"
                    >
                        <div className="aspect-video w-full bg-slate-200 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10" />
                            <motion.img
                                src={story.image}
                                alt={story.title}
                                className="h-full w-full object-cover"
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <div className="p-8 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                                <div className={`mb-4 inline-block rounded-full ${story.color} px-3 py-1 text-xs font-bold ${story.textColor}`}>{story.tag}</div>
                                <h3 className="text-2xl font-black text-slate-900">{story.title}</h3>
                                <p className="mt-4 text-slate-500">{story.desc}</p>
                                <div className={`mt-6 flex items-center gap-2 font-black ${story.textColor}`}>
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ ...SPRING.snappy, delay: i * 0.2 + 0.3 }}
                                        className="text-3xl"
                                    >
                                        {story.stat}
                                    </motion.span>
                                    <span className="text-sm font-medium text-slate-500">{story.statDesc}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={staggerContainer(0.08)}
                className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100"
            >
                
            </motion.div>
        </div>
    </section>
);

export default SuccessStories;
