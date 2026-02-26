import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import PivotLogo from '../ui/PivotLogo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-slate-900/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                    <PivotLogo className="h-10 w-10" />
                    <span className="text-xl font-bold tracking-tight text-white">
                        Pivot <span className="text-primary">Automations</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#approach">Approach</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#services">Services</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors" href="#success">Success Stories</a>
                    <a className="rounded bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all" href="#contact">Get Started</a>
                </div>

                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-white border-b border-slate-100 p-6 flex flex-col gap-4"
                >
                    <a className="text-sm font-medium hover:text-primary" href="#approach" onClick={() => setIsOpen(false)}>Approach</a>
                    <a className="text-sm font-medium hover:text-primary" href="#services" onClick={() => setIsOpen(false)}>Services</a>
                    <a className="text-sm font-medium hover:text-primary" href="#success" onClick={() => setIsOpen(false)}>Success Stories</a>
                    <a className="rounded bg-primary px-5 py-2.5 text-sm font-bold text-white text-center" href="#contact" onClick={() => setIsOpen(false)}>Get Started</a>
                </motion.div>
            )}
        </header>
    );
};

export default Navbar;
