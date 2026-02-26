import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { RevealText, SPRING, VIEWPORT, staggerContainer, fadeSlideUp } from '../ui/MotionKit';

/* ─── Floating UI Pill 1: Chat / Approval Node ─── */
const ChatPill = () => (
    <div className="w-full max-w-72 rounded-2xl backdrop-blur-md bg-white/70 border border-gray-200 shadow-xl shadow-slate-200/50 p-5">
        <div className="flex items-center gap-3 mb-4">
            <div className="size-9 rounded-full bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary/30">
                AI
            </div>
            <div>
                <p className="text-sm font-bold text-slate-800">Pivot Agent</p>
                <p className="text-[10px] text-green-500 font-medium">● Online</p>
            </div>
            <div className="ml-auto px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-[10px] font-bold text-green-600 uppercase tracking-wider">
                Approved
            </div>
        </div>
        <div className="space-y-2">
            <div className="h-2.5 w-full rounded-full bg-slate-100" />
            <div className="h-2.5 w-4/5 rounded-full bg-slate-100" />
            <div className="h-2.5 w-3/5 rounded-full bg-primary/15" />
        </div>
        <div className="mt-4 flex gap-2">
            <div className="flex-1 py-2 rounded-lg bg-primary/10 text-center text-[10px] font-bold text-primary">
                View Details
            </div>
            <div className="flex-1 py-2 rounded-lg bg-primary text-center text-[10px] font-bold text-white shadow-md shadow-primary/25">
                Accept
            </div>
        </div>
    </div>
);

/* ─── Floating UI Pill 2: Data-Sync Progress ─── */
const SyncPill = () => (
    <div className="w-full max-w-64 rounded-2xl backdrop-blur-md bg-white/70 border border-gray-200 shadow-xl shadow-slate-200/50 p-5">
        <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-800 tracking-wide">System Sync</p>
            <span className="text-[10px] font-bold text-primary">87%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden mb-4">
            <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-500"
                initial={{ width: '0%' }}
                whileInView={{ width: '87%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1], delay: 0.5 }}
            />
        </div>
        <div className="space-y-2.5">
            {[
                { label: 'CRM Pipeline', status: 'Synced', color: 'text-green-500', dot: 'bg-green-400' },
                { label: 'Invoice Queue', status: 'Processing', color: 'text-amber-500', dot: 'bg-amber-400' },
                { label: 'HR Onboarding', status: 'Synced', color: 'text-green-500', dot: 'bg-green-400' },
            ].map((row, i) => (
                <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`size-1.5 rounded-full ${row.dot}`} />
                        <span className="text-[11px] text-slate-600">{row.label}</span>
                    </div>
                    <span className={`text-[10px] font-bold ${row.color}`}>{row.status}</span>
                </div>
            ))}
        </div>
    </div>
);

const Partnership = () => {
    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* ── Left Column: Content & Cards ── */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        variants={staggerContainer(0.15)}
                        className="lg:w-1/2"
                    >
                        <motion.div variants={fadeSlideUp}>
                            <RevealText>
                                <h2 className="text-4xl font-black text-slate-900 mb-6">The Human-AI Partnership</h2>
                            </RevealText>
                        </motion.div>
                        <motion.p
                            variants={fadeSlideUp}
                            className="text-slate-600 text-lg mb-8 leading-relaxed"
                        >
                            We don't replace your team; we augment them. Our intelligent agents work side-by-side with your experts, handling the mundane so your people can focus on the meaningful. This synergy is the core of the Pivot Evolution.
                        </motion.p>
                        <motion.div
                            variants={staggerContainer(0.12)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {[
                                { title: 'Augmented Intelligence', desc: 'AI that learns from your best performers to scale expertise across the organization.' },
                                { title: 'Seamless Integration', desc: 'Agents that live in your existing tools like Slack, Teams, and custom ERPs.' },
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeSlideUp}
                                    whileHover={{ y: -8, transition: SPRING.snappy }}
                                    className="group relative p-6 rounded-xl bg-white transition-all duration-300 ease-out border border-transparent hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 hover:bg-blue-50/30"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-bold text-primary">{card.title}</h4>
                                            <ArrowRight
                                                size={16}
                                                className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 text-blue-500"
                                            />
                                        </div>
                                        <p className="text-sm text-slate-500">{card.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── Right Column: Floating Parallax UI Pills ── */}
                    <div className="relative w-full lg:w-1/2 flex flex-col sm:flex-row lg:block gap-6 justify-center items-center min-h-[300px] lg:min-h-[450px]">
                        {/* Decorative blurred backdrop circle */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-80 h-80 rounded-full bg-primary/8 blur-3xl" />
                        </div>

                        {/* Pill 1: Chat / Approval — stacks on mobile, overlaps top-right on desktop */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{
                                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                            }}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={VIEWPORT}
                            className="relative w-full max-w-sm z-20 lg:absolute lg:top-0 lg:right-0 lg:w-[400px]"
                        >
                            <ChatPill />
                        </motion.div>

                        {/* Pill 2: Data Sync — stacks on mobile, overlaps bottom-left on desktop */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{
                                y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
                            }}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={VIEWPORT}
                            className="relative w-full max-w-sm z-10 lg:absolute lg:bottom-10 lg:-left-10 lg:w-[350px] lg:z-20"
                        >
                            <SyncPill />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partnership;
