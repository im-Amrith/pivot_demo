import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import image1 from './image1.png';
import image2 from './image2.png';

const ProductCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const slides = [
        {
            title: "BPA Dashboard",
            image: image1,
            desc: "Real-time process monitoring and analytics."
        },
        {
            title: "Workflow Builder",
            image: image2,
            desc: "Drag-and-drop automation designer."
        }
    ];

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isHovered, slides.length]);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <motion.div
            className="relative w-full max-w-4xl mx-auto group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -4 }}
        >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl transition-all group-hover:shadow-primary/20 group-hover:shadow-[0_20px_50px_rgba(56,189,248,0.2)]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={slides[currentIndex].image}
                            alt={slides[currentIndex].title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                        <div className="absolute bottom-16 left-8 right-8">
                            <h3 className="text-xl font-bold text-white">{slides[currentIndex].title}</h3>
                            <p className="text-sm text-slate-300">{slides[currentIndex].desc}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-black/20 backdrop-blur-sm border-t border-white/5">
                    <div className="flex gap-2 flex-1 px-4">
                        {slides.map((_, i) => (
                            <div key={i} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                {i === currentIndex && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        key={currentIndex}
                                        transition={{ duration: 5, ease: "linear" }}
                                        className="h-full bg-primary"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={prevSlide} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={nextSlide} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

        </motion.div>
    );
};

export default ProductCarousel;
