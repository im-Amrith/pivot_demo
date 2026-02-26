import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import WebGLBackground from '../3d/WebGLBackground';
import MagneticButton from '../ui/MagneticButton';
import PivotLogo from '../ui/PivotLogo';
import ShimmerText from '../ui/ShimmerText';
import ProductCarousel from '../ui/ProductCarousel';

const Hero = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleEvolutionClick = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000);
    };

    return (
        <section className="relative overflow-hidden py-20 lg:py-32 min-h-[80vh] flex items-center">
            {/* Ambient Logo Background */}
            <div className="absolute inset-0 -z-20 flex items-center justify-center pointer-events-none overflow-hidden">
                <img
                    src="input_file_2.png"
                    alt="Ambient Logo"
                    className="w-[120%] h-[120%] object-contain opacity-20 desaturate blur-3xl"
                    referrerPolicy="no-referrer"
                />
            </div>

            <WebGLBackground />

            <div className="mx-auto max-w-7xl px-6 w-full">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-8"
                    >
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                            </span>
                            Intelligent BPA for SMEs
                        </div>
                        <ShimmerText text="Transformation not just Automation" />
                        <p className="max-w-xl text-lg text-slate-600">
                            Unlock your business potential with high-performance intelligent process automation tailored for SMEs. We evolve your workflows from manual to autonomous.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row items-center">
                            <MagneticButton
                                onClick={handleEvolutionClick}
                                className="flex items-center justify-center gap-2 rounded border-2 border-primary/50 bg-primary px-8 py-4 font-bold text-white shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all w-full sm:w-auto overflow-hidden relative"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <PivotLogo className="h-6 w-6" isLoader={true} />
                                        <span>Evolving...</span>
                                    </div>
                                ) : (
                                    <>
                                        <span>Start Your Evolution</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </MagneticButton>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative hidden lg:block"
                    >
                        <ProductCarousel />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
