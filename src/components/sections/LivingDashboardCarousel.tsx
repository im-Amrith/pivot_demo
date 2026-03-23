import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RevealText, SPRING, VIEWPORT } from '../ui/MotionKit';

type ServiceCard = {
    id: string;
    name: string;
    agent: string;
    description: string;
    tags: string[];
};

const services: ServiceCard[] = [
    {
        id: 'custom-bpa',
        name: 'Custom BPA',
        agent: 'Autonomous Workflow Agent',
        description:
            'Designs and orchestrates multi-step business flows, routing tasks and decisions across systems with zero manual handoffs.',
        tags: ['Workflow Orchestration', 'Autonomous Routing', 'Ops Intelligence'],
    },
    {
        id: 'idp',
        name: 'IDP',
        agent: 'Intelligent Document Processing Agent',
        description:
            'Extracts structure from unstructured files, validates fields, and syncs approved records into your operational stack in seconds.',
        tags: ['OCR', 'Validation', 'Data Sync'],
    },
    {
        id: 'hr-automation',
        name: 'HR Automation',
        agent: 'Candidate Pipeline Agent',
        description:
            'Moves candidate profiles through screening pipelines automatically, surfacing top-fit applicants with contextual scoring.',
        tags: ['Talent Ops', 'Screening', 'Automated Handovers'],
    },
    {
        id: 'customer-service',
        name: 'Customer Service',
        agent: 'Conversational Support Agent',
        description:
            'Handles customer requests with fast, contextual replies and instant escalation logic when advanced intervention is required.',
        tags: ['24/7 Response', 'Intent Resolution', 'Escalation Logic'],
    },
    {
        id: 'financial-automation',
        name: 'Financial Automation',
        agent: 'Reconciliation Intelligence Agent',
        description:
            'Continuously reconciles transactions and highlights anomalies through live ledger-matching signals and dynamic variance checks.',
        tags: ['Ledger Matching', 'Real-time Signals', 'Anomaly Detection'],
    },
];

const cycleIndex = (index: number, length: number) => (index + length) % length;

const BPAFlowDashboard = ({ speedFactor, isActive }: { speedFactor: number; isActive: boolean }) => (
    <div className="relative h-full min-h-55 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 220" fill="none" preserveAspectRatio="none">
            <motion.path
                d="M60 44 C120 44 120 44 170 44"
                stroke="rgba(56,189,248,0.55)"
                strokeWidth="2"
                strokeDasharray="100"
                animate={{ strokeDashoffset: [100, 0] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 1.8 * speedFactor }}
            />
            <motion.path
                d="M190 44 C250 44 250 98 300 98"
                stroke="rgba(56,189,248,0.55)"
                strokeWidth="2"
                strokeDasharray="120"
                animate={{ strokeDashoffset: [120, 0] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 2.2 * speedFactor }}
            />
            <motion.path
                d="M190 44 C250 44 250 170 300 170"
                stroke="rgba(56,189,248,0.55)"
                strokeWidth="2"
                strokeDasharray="140"
                animate={{ strokeDashoffset: [140, 0] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 2.4 * speedFactor }}
            />
        </svg>

        <motion.div
            className="absolute size-2 rounded-full bg-sky-300 shadow-[0_0_14px_rgba(56,189,248,0.9)]"
            animate={{
                x: [56, 170, 300, 170, 300, 56],
                y: [44, 44, 98, 44, 170, 44],
                opacity: [1, 1, 1, 1, 1, 0.85],
            }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 4.8 * speedFactor }}
        />

        <div className="relative z-10 grid h-full grid-cols-3 grid-rows-3 gap-3">
            <div className="col-span-1 row-span-1 rounded-xl border border-sky-300/30 bg-slate-800/80" />
            <div className="col-span-1 row-span-1 rounded-xl border border-sky-300/20 bg-slate-800/70" />
            <div className="col-span-1 row-span-1 rounded-xl border border-sky-300/25 bg-slate-800/80" />
            <div className="col-span-1 row-span-1 rounded-xl border border-sky-300/20 bg-slate-800/70" />
        </div>

        {!isActive && <div className="absolute inset-0 bg-slate-950/35" />}
    </div>
);

const IDPDashboard = ({ speedFactor, isActive }: { speedFactor: number; isActive: boolean }) => (
    <div className="relative h-full min-h-55 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <div className="relative mx-auto h-full w-[85%] rounded-lg bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 rounded bg-slate-200 ${i % 3 === 0 ? 'w-[55%]' : i % 2 === 0 ? 'w-[90%]' : 'w-[75%]'}`}
                    />
                ))}
            </div>
            <motion.div
                className="absolute left-2 right-2 h-1.5 rounded-full bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.9)]"
                animate={{ y: ['0%', '100%', '0%'] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 2 * speedFactor }}
            />
        </div>

        {!isActive && <div className="absolute inset-0 bg-slate-950/35" />}
    </div>
);

const HRDashboard = ({ speedFactor, isActive }: { speedFactor: number; isActive: boolean }) => (
    <div className="relative h-full min-h-55 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <div className="grid h-full grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Screening</p>
                <div className="h-[72%] rounded-lg border border-dashed border-slate-700" />
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Approved</p>
                <div className="h-[72%] rounded-lg border border-dashed border-slate-700" />
            </div>
        </div>

        <motion.div
            className="absolute top-[38%] w-[40%] rounded-lg border border-sky-300/40 bg-slate-800/95 p-2 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            animate={{ x: ['8%', '135%', '135%', '8%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 3.6 * speedFactor }}
        >
            <div className="mb-1 h-2 w-2/3 rounded bg-slate-300/70" />
            <div className="h-1.5 w-1/2 rounded bg-slate-500/70" />
        </motion.div>

        {!isActive && <div className="absolute inset-0 bg-slate-950/35" />}
    </div>
);

const CustomerServiceDashboard = ({ speedFactor, isActive }: { speedFactor: number; isActive: boolean }) => (
    <div className="relative h-full min-h-55 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <div className="relative h-full rounded-xl border border-white/10 bg-slate-900/70 p-3">
            <motion.div
                className="absolute bottom-16 left-3 max-w-[68%] rounded-xl rounded-bl-sm bg-slate-700/90 px-3 py-2"
                animate={{ y: [20, 0, 0], opacity: [0, 1, 1] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 2.8 * speedFactor }}
            />
            <motion.div
                className="absolute bottom-9 right-3 max-w-[68%] rounded-xl rounded-br-sm bg-sky-500/80 px-3 py-2"
                animate={{ y: [22, 0, 0], opacity: [0, 1, 1] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 2.8 * speedFactor, delay: 0.8 * speedFactor }}
            />
            <motion.div
                className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1.5"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 1.2 * speedFactor }}
            >
                {[0, 1, 2].map((dot) => (
                    <motion.span
                        key={dot}
                        className="size-1.5 rounded-full bg-sky-300"
                        animate={{ y: [0, -2, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 0.9 * speedFactor, delay: dot * 0.2 * speedFactor }}
                    />
                ))}
            </motion.div>
        </div>

        {!isActive && <div className="absolute inset-0 bg-slate-950/35" />}
    </div>
);

const FinancialDashboard = ({ speedFactor, isActive }: { speedFactor: number; isActive: boolean }) => (
    <div className="relative h-full min-h-55 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <div className="flex h-full items-end gap-3 rounded-xl border border-white/10 bg-slate-900/70 p-4">
            {[0, 1, 2, 3, 4].map((bar) => (
                <motion.div
                    key={bar}
                    className="w-full rounded-t-md bg-linear-to-t from-cyan-500/70 to-sky-300/90"
                    animate={{ height: ['30%', '80%', '50%'] }}
                    transition={{ repeat: Infinity, ease: 'linear', duration: 2.4 * speedFactor, delay: bar * 0.18 * speedFactor }}
                />
            ))}
        </div>

        {!isActive && <div className="absolute inset-0 bg-slate-950/35" />}
    </div>
);

const DashboardView = ({ id, isActive }: { id: ServiceCard['id']; isActive: boolean }) => {
    const speedFactor = isActive ? 1 : 3.8;

    if (id === 'custom-bpa') return <BPAFlowDashboard speedFactor={speedFactor} isActive={isActive} />;
    if (id === 'idp') return <IDPDashboard speedFactor={speedFactor} isActive={isActive} />;
    if (id === 'hr-automation') return <HRDashboard speedFactor={speedFactor} isActive={isActive} />;
    if (id === 'customer-service') return <CustomerServiceDashboard speedFactor={speedFactor} isActive={isActive} />;

    return <FinancialDashboard speedFactor={speedFactor} isActive={isActive} />;
};

const LivingDashboardCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = useMemo(() => services, []);

    const handleNext = () => setActiveIndex((prev) => cycleIndex(prev + 1, slides.length));
    const handlePrev = () => setActiveIndex((prev) => cycleIndex(prev - 1, slides.length));

    return (
        <section className="overflow-hidden bg-[#0a1120] py-24" id="agent-dashboard">
            <div className="mx-auto mb-14 max-w-7xl px-6 text-center">
                <RevealText className="inline-block">
                    <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">The Living Dashboard</h2>
                </RevealText>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ ...SPRING.default, delay: 0.08 }}
                    className="mx-auto mt-4 max-w-2xl text-slate-300"
                >
                    Swipe or click through autonomous agents and watch each system execute in real time.
                </motion.p>
            </div>

            <div className="relative mx-auto h-145 w-full max-w-7xl px-4 md:px-6">
                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-1 md:px-3">
                    <button
                        type="button"
                        onClick={handlePrev}
                        className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-slate-100 backdrop-blur-md transition-colors hover:bg-slate-800"
                        aria-label="Previous service"
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-slate-100 backdrop-blur-md transition-colors hover:bg-slate-800"
                        aria-label="Next service"
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                        if (info.offset.x < -70) handleNext();
                        if (info.offset.x > 70) handlePrev();
                    }}
                    className="relative flex h-full w-full items-center justify-center"
                >
                    {slides.map((service, index) => {
                        const rawOffset = index - activeIndex;
                        let displayOffset = rawOffset;
                        if (rawOffset > slides.length / 2) displayOffset -= slides.length;
                        if (rawOffset < -slides.length / 2) displayOffset += slides.length;

                        const absOffset = Math.abs(displayOffset);
                        const isActive = index === activeIndex;

                        return (
                            <motion.article
                                key={service.id}
                                onClick={() => setActiveIndex(index)}
                                initial={false}
                                animate={{
                                    x: displayOffset * 370,
                                    scale: isActive ? 1 : 0.88,
                                    opacity: isActive ? 1 : 0.4,
                                    zIndex: 20 - absOffset,
                                    rotateY: displayOffset * -11,
                                }}
                                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                                className="absolute h-125 w-[min(90vw,860px)] cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl backdrop-blur-xl"
                            >
                                <div className="grid h-full grid-cols-1 gap-5 p-5 md:grid-cols-12 md:gap-6 md:p-7">
                                    <div className="flex flex-col md:col-span-5 md:pr-3">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Service Agent</p>
                                        <h3
                                            className={`mt-3 text-3xl font-black leading-[1.05] md:text-[2.05rem] ${
                                                isActive
                                                    ? 'text-sky-300 drop-shadow-[0_0_18px_rgba(56,189,248,0.55)]'
                                                    : 'text-slate-300'
                                            }`}
                                        >
                                            {service.name}
                                        </h3>
                                        <p className="mt-2 text-sm font-semibold text-slate-200">{service.agent}</p>
                                        <p className="mt-4 text-sm leading-relaxed text-slate-300">{service.description}</p>
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {service.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="md:col-span-7 md:pl-2">
                                        <DashboardView id={service.id} isActive={isActive} />
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default LivingDashboardCarousel;
