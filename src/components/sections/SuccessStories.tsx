import { motion } from 'motion/react';
import { RevealText, SPRING, VIEWPORT, staggerContainer } from '../ui/MotionKit';

const caseStudies = [
    {
        slug: 'encon',
        title: 'Encon: Legacy Data Digitization',
        agent: 'IDP Agent',
        summary:
            'Deployed an autonomous IDP agent for Encon to ingest over three decades of legacy offer letters (1990–present). Overcoming challenges like deteriorating scan quality and constantly shifting document layouts, the system seamlessly extracted 83 highly variable data fields—including customer names, contact numbers, and specific sales personnel. By digitizing and structuring 2,300+ complex files in a single month with zero manual data entry, we unlocked decades of historical data for instant searchability and analytics.',
    },
    {
        slug: 'invoice-extraction',
        title: 'Autonomous Invoice Extraction',
        agent: 'Financial Automation AI',
        summary:
            'Integrated an AI-driven financial pipeline that automatically captures line-item details, vendor IDs, and complex tax codes from unstructured, multi-page PDF invoices. Unlike legacy OCR, this agent requires no template training and adapts instantly to varying vendor formats. It autonomously cross-references extracted data with the client\'s existing ERP for instant reconciliation, identifying discrepancies and entirely eliminating manual month-end bottlenecks while reducing human error to zero.',
    },
    {
        slug: 'autonomous-outreach',
        title: 'Hyper-Personalized Sales Workflows',
        agent: 'Autonomous Outreach Agent',
        summary:
            'Deployed a customized outbound agent to orchestrate multi-channel messaging at scale. The AI analyzes prospect backgrounds, recent company news, and firmographics to dynamically draft context-aware, hyper-personalized outreach sequences. It autonomously handles multi-step follow-ups based on prospect sentiment and intent, filling the sales pipeline and scheduling meetings directly on the calendar while human reps focus exclusively on closing warm leads.',
    },
];

const SuccessStories = () => (
    <section className="relative overflow-hidden bg-[#0a0f1c] py-24" id="success">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[480px] w-[820px] rounded-full bg-blue-900/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={SPRING.gentle}
                className="mb-16 text-center"
            >
                <RevealText className="inline-block">
                    <h2 className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-black tracking-tight text-transparent">
                        Case Studies
                    </h2>
                </RevealText>
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...SPRING.default, delay: 0.12 }}
                    className="mx-auto mt-4 max-w-xl text-slate-400"
                >
                    Three flagship deployments that showcase AI automation built for measurable operational impact.
                </motion.p>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={staggerContainer(0.14)}
                className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
                {caseStudies.map((study) => (
                    <motion.article
                        key={study.slug}
                        whileHover={{ y: -8, borderColor: 'rgba(56, 189, 248, 0.4)' }}
                        transition={SPRING.default}
                        className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-shadow duration-300 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(56,189,248,0.12)]"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">
                            {study.agent}
                        </div>
                        <h3 className="mb-3 text-2xl font-black tracking-tight text-white">{study.title}</h3>
                        <p className="text-sm leading-relaxed text-slate-300">{study.summary}</p>
                    </motion.article>
                ))}
            </motion.div>
        </div>
    </section>
);

export default SuccessStories;
