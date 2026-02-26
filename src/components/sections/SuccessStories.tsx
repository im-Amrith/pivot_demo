import { useState } from 'react';
import { motion } from 'motion/react';
import { RevealText, SPRING, VIEWPORT, staggerContainer } from '../ui/MotionKit';

const CASE_SPRING = { type: 'spring' as const, stiffness: 120, damping: 18 };

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
            className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl p-8 transition-colors duration-300 cursor-default ${expanded ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : 'border-white/10'
                }`}
        >
            {/* Agent badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-5">
                <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{study.agent}</span>
            </div>

            {/* Metric */}
            <p className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">{study.metric}</p>

            {/* Title */}
            <h3 className="text-lg font-bold text-slate-300 mb-2">{study.title}</h3>

            {/* Expandable description */}
            <motion.div
                initial={false}
                animate={{
                    height: expanded ? 'auto' : 0,
                    opacity: expanded ? 1 : 0,
                }}
                transition={CASE_SPRING}
                className="overflow-hidden"
            >
                <p className="text-sm text-slate-400 leading-relaxed pt-3 border-t border-white/5">
                    {study.description}
                </p>
            </motion.div>

            {/* Hover hint */}
            <motion.p
                animate={{ opacity: expanded ? 0 : 0.4 }}
                className="text-[10px] text-slate-500 mt-4 uppercase tracking-widest font-bold"
            >
                Hover to read more →
            </motion.p>
        </motion.div>
    );
};

const SuccessStories = () => (
    <section className="py-24 bg-slate-900 overflow-hidden" id="success">
        <div className="mx-auto max-w-7xl px-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={SPRING.gentle}
                className="mb-16 text-center"
            >
                <RevealText className="inline-block">
                    <h2 className="text-4xl font-black tracking-tight text-white">Case Studies</h2>
                </RevealText>
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...SPRING.default, delay: 0.12 }}
                    className="mt-4 text-slate-400 max-w-xl mx-auto"
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
