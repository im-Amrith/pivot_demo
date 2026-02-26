import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { RevealText, SPRING, VIEWPORT, staggerContainer, fadeSlideUp } from '../ui/MotionKit';
import MagneticButton from '../ui/MagneticButton';

const Contact = () => (
    <section className="py-24 overflow-hidden" id="contact">
        <div className="mx-auto max-w-7xl px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={SPRING.gentle}
                className="rounded-2xl bg-slate-900 overflow-hidden shadow-2xl lg:flex"
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer(0.1)}
                    className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-between"
                >
                    <div>
                        <RevealText>
                            <h2 className="text-4xl font-black text-white">Let's build your <br /><span className="text-primary">future engine.</span></h2>
                        </RevealText>
                        <motion.p
                            variants={fadeSlideUp}
                            className="mt-6 text-slate-400"
                        >
                            Our team in Mumbai is ready to audit your processes and provide a strategic roadmap for transformation.
                        </motion.p>
                    </div>
                    <motion.div
                        variants={staggerContainer(0.08)}
                        className="mt-12 space-y-8"
                    >
                        {[
                            { icon: <MapPin size={24} />, label: 'Office', value: 'Maker Maxity, BKC, Mumbai 400051' },
                            { icon: <Phone size={24} />, label: 'Call Us', value: '+91 22 4500 8900' },
                            { icon: <Mail size={24} />, label: 'Email Us', value: 'evolve@pivotautomations.com' },
                        ].map((contact, i) => (
                            <motion.div
                                key={i}
                                variants={fadeSlideUp}
                                className="flex items-center gap-6"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={SPRING.snappy}
                                    className="size-12 rounded bg-white/5 flex items-center justify-center text-primary border border-white/10 transition-[border-color] duration-300 hover:border-sky-500/40"
                                >
                                    {contact.icon}
                                </motion.div>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase tracking-widest">{contact.label}</p>
                                    <p className="text-slate-400">{contact.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={SPRING.gentle}
                    className="bg-white p-8 lg:p-12 lg:w-1/2"
                >
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">First Name</label>
                                <input className="w-full rounded border-slate-200 bg-slate-50 p-3 focus:border-primary focus:ring-primary outline-none transition-colors"  type="text" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Last Name</label>
                                <input className="w-full rounded border-slate-200 bg-slate-50 p-3 focus:border-primary focus:ring-primary outline-none transition-colors" type="text" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Company Email</label>
                            <input className="w-full rounded border-slate-200 bg-slate-50 p-3 focus:border-primary focus:ring-primary outline-none transition-colors"  type="email" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Project Type</label>
                            <select className="w-full rounded border-slate-200 bg-slate-50 p-3 focus:border-primary focus:ring-primary outline-none transition-colors">
                                <option>Custom BPA</option>
                                <option>AI Consulting</option>
                                <option>Financial Automation</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                            <textarea className="w-full rounded border-slate-200 bg-slate-50 p-3 focus:border-primary focus:ring-primary outline-none transition-colors" placeholder="Tell us about your manual bottlenecks..." rows={4}></textarea>
                        </div>
                        <MagneticButton className="w-full rounded bg-primary py-4 font-black text-white shadow-xl shadow-primary/25 hover:bg-primary/90 transition-all">
                            Submit Inquiry
                        </MagneticButton>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    </section>
);

export default Contact;
