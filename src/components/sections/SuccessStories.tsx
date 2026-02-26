import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RevealText, SPRING, VIEWPORT, staggerContainer } from '../ui/MotionKit';

const CASE_SPRING = { type: 'spring' as const, stiffness: 100, damping: 20 };

const caseStudies = [
    {
        agent: 'AI Interviewer Agent',
        metric: '80% Reduction in Screening Time',
        title: 'Vantage: Autonomous Tech Recruitment',
        description: 'Deployed the AI Interviewer to conduct tier-1 technical screenings, providing standardized scoring and honest feedback to candidates instantly.',
    },
    {
        agent: 'Custom BPA Agent',
        metric: '40% Faster Engineering Cycles',
        title: 'Velocitas: Dual-Mode AI Workflow',
        description: 'Integrated a custom dual-mode AI workflow system directly into the engineering team\'s pipeline, automating routine pull-request checks and deployment staging.',
    },
    {
        agent: 'Minutes of Meeting AI',
        metric: '100% Action Item Capture',
        title: 'TeamSync: Intelligent Workflow Extension',
        description: 'Utilized the silent ninja agent to listen, note, and recap cross-department syncs, instantly routing action items to Jira and Slack without manual input.',
    },
];

const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: CASE_SPRING },
};

const CaseCard = ({ study }: { study: (typeof caseStudies)[0] }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            layout
            variants={cardVariant}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            whileHover={{ y: -8, borderColor: 'rgba(56, 189, 248, 0.4)' }}
            transition={CASE_SPRING}
            className="relative bg-white/[0.02] max-md:backdrop-blur-md backdrop-blur-2xl border rounded-3xl p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-shadow duration-300 cursor-default will-change-transform hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(56,189,248,0.08)]"
        >
            {/* Agent badge */}
            <div className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-bold mb-6">
                <div className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
                {study.agent}
            </div>

            {/* Metric — metallic gradient text */}
            <p className="text-3xl md:text-4xl font-black tracking-tight mb-3 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                {study.metric}
            </p>

            {/* Title */}
            <h3 className="text-lg font-bold text-slate-300 mb-4">{study.title}</h3>

            {/* Expandable section */}
            <AnimatePresence mode="wait">
                {expanded ? (
                    <motion.p
                        key="desc"
                        initial={{ opacity: 0, height: 0, y: 8 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 8 }}
                        transition={CASE_SPRING}
                        className="text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4 overflow-hidden"
                    >
                        {study.description}
                    </motion.p>
                ) : (
                    <motion.p
                        key="hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.35 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-[10px] text-slate-500 uppercase tracking-widest font-bold"
                    >
                        Hover to read more →
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const SuccessStories = () => (
    <section className="relative py-24 bg-[#0a0f1c] overflow-hidden" id="success">
        {/* Volumetric spotlight */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[800px] h-[500px] rounded-full bg-blue-900/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={SPRING.gentle}
                className="mb-16 text-center"
            >
                <RevealText className="inline-block">
                    <h2 className="text-4xl font-black tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                        Case Studies
                    </h2>
                </RevealText>
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...SPRING.default, delay: 0.12 }}
                    className="mt-4 text-slate-500 max-w-xl mx-auto"
                >
                    Real results from real deployments. See how our AI agents transformed operations for businesses like yours.
                </motion.p>
            </motion.div>

            {/* Expanding grid */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={staggerContainer(0.2)}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
            >
                {caseStudies.map((study, i) => (
                    <CaseCard key={i} study={study} />
                ))}
            </motion.div>
        </div>
    </section>
);

export default SuccessStories;
