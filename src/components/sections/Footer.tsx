import { motion } from 'motion/react';
import {
    LayoutDashboard,
    Share2,
    Globe,
    MessageSquare,
    Phone,
    Mail,
    MapPin
} from 'lucide-react';
import { SPRING, VIEWPORT, staggerContainer, fadeSlideUp } from '../ui/MotionKit';
import MagneticButton from '../ui/MagneticButton';

const Footer = () => (
    <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-white/5 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                variants={staggerContainer(0.1)}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
            >
                <motion.div variants={fadeSlideUp}>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                            <LayoutDashboard size={16} />
                        </div>
                        <span className="text-lg font-bold tracking-tight">Pivot <span className="text-primary">Automations</span></span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">Empowering SMEs with enterprise-grade automation architecture. Transformation is just a pivot away.</p>
                    <div className="flex gap-4">
                        {[Share2, Globe, MessageSquare].map((Icon, i) => (
                            <motion.a
                                key={i}
                                whileHover={{ y: -3, scale: 1.1 }}
                                transition={SPRING.snappy}
                                className="size-10 rounded bg-white/5 flex items-center justify-center hover:bg-primary transition-colors border border-white/10 hover:border-primary/50"
                                href="#"
                            >
                                <Icon size={18} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
                <motion.div variants={fadeSlideUp}>
                    <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        {['About Our Engine', 'Success Stories', 'Free Process Audit'].map((link, i) => (
                            <motion.li
                                key={i}
                                whileHover={{ x: 4 }}
                                transition={SPRING.snappy}
                            >
                                <a className="hover:text-primary transition-colors" href="#">{link}</a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
                <motion.div variants={fadeSlideUp}>
                    <h4 className="font-bold text-lg mb-6">Newsletter</h4>
                    <p className="text-slate-400 text-sm mb-4">Get bi-weekly insights on AI and automation trends.</p>
                    <div className="flex">
                        <input className="w-full rounded-l bg-white/5 border border-white/10 text-white px-4 py-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="Email" type="email" />
                        <MagneticButton className="bg-primary rounded-r px-4 font-bold hover:bg-primary/90 transition-all">
                            Join
                        </MagneticButton>
                    </div>
                </motion.div>
                <motion.div variants={fadeSlideUp}>
                    <h4 className="font-bold text-lg mb-6">Contact</h4>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li className="flex gap-3"><Phone size={16} className="text-primary shrink-0" /> +91 22 4500 8900</li>
                        <li className="flex gap-3"><Mail size={16} className="text-primary shrink-0" /> evolve@pivot.ai</li>
                        <li className="flex gap-3"><MapPin size={16} className="text-primary shrink-0" /> BKC, Mumbai, IN</li>
                    </ul>
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ ...SPRING.gentle, delay: 0.3 }}
                className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6"
            >
                <p className="text-slate-500 text-xs">© 2024 Pivot Automations Pvt Ltd. All rights reserved.</p>
                <div className="flex gap-8 text-slate-500 text-xs">
                    {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((text, i) => (
                        <motion.a
                            key={i}
                            whileHover={{ color: '#ffffff' }}
                            transition={{ duration: 0.2 }}
                            href="#"
                        >
                            {text}
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
    </footer>
);

export default Footer;
