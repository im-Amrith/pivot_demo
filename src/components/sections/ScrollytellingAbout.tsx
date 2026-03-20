import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type AboutTab = {
    id: 'problem' | 'pivot' | 'future';
    label: string;
    overline: string;
    headline: string;
    body: string;
    visualTitle: string;
    visualStat: string;
};

const aboutTabs: AboutTab[] = [
    {
        id: 'problem',
        label: 'The Problem',
        overline: '01 - The Problem',
        headline: 'Manual operations quietly drain growth.',
        body: 'Teams lose momentum to repetitive handoffs, spreadsheet workarounds, and delayed approvals. As process debt compounds, opportunities slow down and margins shrink.',
        visualTitle: 'Operational Friction',
        visualStat: '60% time lost to repeat tasks',
    },
    {
        id: 'pivot',
        label: 'Our Pivot',
        overline: '02 - Our Pivot',
        headline: 'We design AI-native systems, not patchwork automation.',
        body: 'Pivot maps your workflows end-to-end and deploys purpose-built agents that remove bottlenecks, enforce quality, and keep humans focused on high-value decisions.',
        visualTitle: 'Intelligent Core',
        visualStat: '3x faster execution velocity',
    },
    {
        id: 'future',
        label: 'The Future',
        overline: '03 - The Future',
        headline: 'From reactive operations to autonomous momentum.',
        body: 'Imagine invoices, approvals, and meeting follow-through running continuously with auditable precision. Your team gains speed, clarity, and room to innovate.',
        visualTitle: 'Autonomous Flow',
        visualStat: '24/7 governed automation',
    },
];

const ScrollytellingAbout = () => {
    const [activeTab, setActiveTab] = useState<AboutTab['id']>('problem');
    const activeContent = aboutTabs.find((tab) => tab.id === activeTab) ?? aboutTabs[0];

    return (
        <section id="about" className="relative bg-[#0f172a] py-20 md:py-24">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-700/10 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-10 lg:gap-12">
                    <div className="lg:col-span-3">
                        <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-sky-300/70">
                            About Pivot
                        </p>
                        <div className="space-y-3">
                            {aboutTabs.map((tab) => {
                                const isActive = tab.id === activeTab;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`group flex w-full items-center border-l-2 px-4 py-4 text-left transition-all duration-300 ${
                                            isActive
                                                ? 'border-sky-400 bg-white/[0.04] text-slate-100 shadow-[0_0_30px_rgba(56,189,248,0.16)]'
                                                : 'border-white/10 text-slate-400 hover:border-sky-300/60 hover:text-slate-200'
                                        }`}
                                    >
                                        <span className="text-sm font-semibold tracking-wide">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeContent.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -14 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    className="grid min-h-[430px] grid-cols-1 gap-8 lg:grid-cols-8"
                                >
                                    <div className="lg:col-span-5">
                                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-300/70">
                                            {activeContent.overline}
                                        </p>
                                        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl md:leading-[1.05]">
                                            {activeContent.headline}
                                        </h2>
                                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                                            {activeContent.body}
                                        </p>
                                    </div>

                                    <div className="lg:col-span-3">
                                        <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950/40 via-slate-900/30 to-sky-900/20 p-5">
                                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-400/20 blur-2xl" />
                                            <div className="absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />
                                            <div className="relative flex h-full flex-col justify-between">
                                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300/80">{activeContent.visualTitle}</p>
                                                <div>
                                                    <p className="mb-2 text-sm text-slate-300">Live Outcome</p>
                                                    <p className="text-2xl font-black leading-tight text-white">{activeContent.visualStat}</p>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <div className="h-2 rounded-full bg-sky-400/70" />
                                                    <div className="h-2 rounded-full bg-slate-300/50" />
                                                    <div className="h-2 rounded-full bg-slate-300/30" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScrollytellingAbout;
