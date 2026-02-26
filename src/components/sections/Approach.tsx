import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Database,
    PenTool as DrawAuto,
    LayoutGrid,
    CheckCircle2 as Verified,
    FileOutput as ExportNotes,
    BarChart3 as Monitoring,
} from 'lucide-react';
import { RevealText, SPRING, VIEWPORT } from '../ui/MotionKit';

const TAB_SPRING = { type: 'spring' as const, stiffness: 200, damping: 25 };
const CONTENT_TRANSITION = { type: 'spring' as const, stiffness: 100, damping: 20 };

const steps = [
    {
        icon: Database, title: 'Data Capture',
        desc: 'Aggregating fragmented data points from email, PDFs, APIs, and legacy databases into a single unified pipeline. Our agents connect to 50+ data sources out of the box.',
        visual: 'progress', progress: 92, accent: 'from-sky-400 to-blue-500',
        nodes: ['CRM', 'ERP', 'Email', 'Drive'],
    },
    {
        icon: DrawAuto, title: 'Extract',
        desc: 'Intelligent information retrieval using AI-powered OCR and NLP parsing. Every field, table, and signature is captured with sub-second latency and 99.2% accuracy.',
        visual: 'nodes', progress: 78, accent: 'from-blue-400 to-indigo-500',
        nodes: ['Name', 'Date', 'Amount', 'Status'],
    },
    {
        icon: LayoutGrid, title: 'Classify',
        desc: 'Context-aware machine learning models automatically categorize documents, tickets, and transactions. No manual tagging—ever again.',
        visual: 'grid', progress: 85, accent: 'from-indigo-400 to-violet-500',
        nodes: ['Invoice', 'Receipt', 'Contract', 'Report'],
    },
    {
        icon: Verified, title: 'Validate',
        desc: 'Multi-layer verification ensures 100% data accuracy. Cross-references against your master data, flags anomalies, and routes exceptions to humans only when needed.',
        visual: 'checks', progress: 100, accent: 'from-emerald-400 to-green-500',
        nodes: ['Format ✓', 'Range ✓', 'Cross-ref ✓', 'Approved ✓'],
    },
    {
        icon: ExportNotes, title: 'Export',
        desc: 'Seamless one-click integration with your existing ERP, CRM, and accounting software. Data flows bi-directionally with full audit trails and version control.',
        visual: 'progress', progress: 67, accent: 'from-amber-400 to-orange-500',
        nodes: ['SAP', 'Salesforce', 'Tally', 'Sheets'],
    },
    {
        icon: Monitoring, title: 'Analyze',
        desc: 'Real-time dashboards, predictive analytics, and AI-generated insights. Know what happened, why it happened, and what will happen next—before your competitors do.',
        visual: 'bars', progress: 88, accent: 'from-rose-400 to-pink-500',
        nodes: ['Revenue', 'Errors', 'Latency', 'Growth'],
    },
];

/* ─── Mini-visual renderers for the Viewer ─── */
const StepVisual = ({ step }: { step: (typeof steps)[0] }) => (
    <div className="mt-8 space-y-4">
        {/* Mock progress bar */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1">
            <span>Processing</span>
            <span className="text-white">{step.progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${step.progress}%` }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className={`h-full rounded-full bg-gradient-to-r ${step.accent}`}
            />
        </div>

        {/* Floating data node array */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {step.nodes.map((node, i) => (
                <motion.div
                    key={node}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ ...CONTENT_TRANSITION, delay: i * 0.08 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2.5 text-center text-xs font-bold text-slate-300 hover:border-blue-400/40 hover:text-white transition-all duration-200"
                >
                    {node}
                </motion.div>
            ))}
        </div>
    </div>
);

const Approach = () => {
    const [activeStep, setActiveStep] = useState(0);
    const active = steps[activeStep];
    const ActiveIcon = active.icon;

    return (
        <section className="relative py-24 bg-slate-900 overflow-hidden" id="approach">
            {/* Ambient hue-shifting background */}
            <motion.div
                animate={{
                    background: `radial-gradient(ellipse 80% 60% at 70% 50%, ${['rgba(56,189,248,0.08)', 'rgba(99,102,241,0.08)', 'rgba(139,92,246,0.08)',
                        'rgba(16,185,129,0.08)', 'rgba(245,158,11,0.08)', 'rgba(244,63,94,0.08)'][activeStep]
                        }, transparent)`,
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 pointer-events-none"
            />

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={SPRING.gentle}
                    className="mb-16"
                >
                    <RevealText>
                        <h2 className="text-4xl font-black tracking-tight text-white">Our Approach</h2>
                    </RevealText>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ ...SPRING.default, delay: 0.12 }}
                        className="mt-4 text-slate-400 max-w-xl"
                    >
                        The 6-Step Evolution Engine. Click each phase to explore how we transform your operations.
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* ── Left: Controller Tabs ── */}
                    {/* Mobile: horizontal scroll row */}
                    <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 snap-x scrollbar-hide">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            const isActive = activeStep === i;
                            return (
                                <button
                                    key={i}
                                    onClick={() => setActiveStep(i)}
                                    className={`relative flex-shrink-0 snap-start flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${isActive
                                        ? 'text-white bg-blue-500/10 border border-blue-400/40'
                                        : 'text-slate-500 border border-transparent hover:text-slate-300'
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span className="whitespace-nowrap">{step.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Desktop: vertical tab list */}
                    <div className="hidden lg:flex lg:w-[38%] flex-col gap-1 relative">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            const isActive = activeStep === i;
                            return (
                                <button
                                    key={i}
                                    onClick={() => setActiveStep(i)}
                                    className={`relative flex items-center gap-4 px-6 py-5 rounded-xl text-left transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                >
                                    {/* Sliding active background */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabBg"
                                            transition={TAB_SPRING}
                                            className="absolute inset-0 bg-blue-500/10 border-l-2 border-blue-400 rounded-xl"
                                        />
                                    )}
                                    <div className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${isActive
                                        ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10'
                                        : 'bg-white/5 text-slate-500'
                                        }`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="relative z-10 flex-1">
                                        <p className="font-bold text-sm">{step.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 hidden xl:block">Step {i + 1} of 6</p>
                                    </div>
                                    <span className={`relative z-10 text-xs font-bold transition-opacity duration-200 ${isActive ? 'opacity-100 text-blue-400' : 'opacity-0'
                                        }`}>
                                        →
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* ── Right: Viewer Card ── */}
                    <div className="lg:w-[62%]">
                        <div className="bg-white/5 max-md:backdrop-blur-md backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 min-h-[380px] relative overflow-hidden will-change-transform">
                            {/* Subtle corner glow */}
                            <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${active.accent} opacity-10 blur-3xl pointer-events-none transition-all duration-500`} />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={CONTENT_TRANSITION}
                                >
                                    {/* Step indicator */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${active.accent} flex items-center justify-center text-white shadow-lg`}>
                                            <ActiveIcon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Step {activeStep + 1} / 6</p>
                                            <h3 className="text-2xl font-black text-white">{active.title}</h3>
                                        </div>
                                    </div>

                                    <p className="text-slate-400 leading-relaxed">{active.desc}</p>

                                    <StepVisual step={active} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Approach;
