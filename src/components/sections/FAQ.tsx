import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { RevealText, SPRING, VIEWPORT, staggerContainer, fadeSlideUp } from '../ui/MotionKit';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { q: 'What is workflow automation?', a: 'Workflow automation is the use of software and technology to perform repetitive tasks and handle complex business processes with minimal human intervention, increasing speed and reducing errors.' },
        { q: 'What types of processes can be automated?', a: 'Almost any repetitive, rules-based process: invoice processing, employee onboarding, data entry, lead management, customer support ticket routing, and financial reporting are the most common.' },
        { q: 'Is my business too small for automation?', a: 'Never. In fact, SMEs often see the highest relative ROI because automation allows a small team to perform like a massive corporation without increasing headcount.' },
        { q: 'How long does a typical implementation take?', a: 'A single process (Starter package) typically takes 2-4 weeks. Enterprise-wide transformations can take 3-6 months depending on complexity and legacy system integrations.' },
    ];

    return (
        <section className="py-24 bg-background-light overflow-hidden">
            <div className="mx-auto max-w-3xl px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={SPRING.gentle}
                    className="text-center mb-12"
                >
                    <RevealText className="inline-block">
                        <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
                    </RevealText>
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={staggerContainer(0.08)}
                    className="space-y-4"
                >
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            variants={fadeSlideUp}
                            className="rounded-xl bg-white border border-slate-100 overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-sky-500/30 hover:shadow-md"
                        >
                            <button
                                className="flex w-full items-center justify-between p-6 font-bold text-left"
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            >
                                <span>{faq.q}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={SPRING.snappy}
                                >
                                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                                </motion.div>
                            </button>
                            <AnimatePresence initial={false}>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ ...SPRING.default, opacity: { duration: 0.2 } }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 text-slate-500 text-sm">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
