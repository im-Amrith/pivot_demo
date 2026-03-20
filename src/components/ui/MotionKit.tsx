import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * Shared mobile detection hook — screens < 768px.
 * Re-evaluates on resize for responsiveness.
 */
export const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
    );

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener('resize', check, { passive: true });
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);

    return isMobile;
};

/**
 * Premium spring configs — low stiffness, high damping for
 * a heavy, deliberate, "expensive" feel.
 */
export const SPRING = {
    /** Default premium spring */
    default: { type: 'spring' as const, stiffness: 80, damping: 20 },
    /** Gentle, slow spring for large reveals */
    gentle: { type: 'spring' as const, stiffness: 50, damping: 25 },
    /** Snappy for micro-interactions */
    snappy: { type: 'spring' as const, stiffness: 200, damping: 25 },
};

/**
 * Standard stagger container variants.
 */
export const staggerContainer = (stagger = 0.1) => ({
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
});

/**
 * Fade + slide-up child variant using spring physics.
 */
export const fadeSlideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: SPRING.default },
};

/**
 * Scale-in variant for images / heavy content.
 */
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: SPRING.gentle },
};

/**
 * SpotlightCard — glassmorphism card with mouse-tracking radial glow.
 * Pass children, plus optional className overrides.
 */
export const SpotlightCard = ({
    children,
    className = '',
    as = 'div',
}: {
    children: React.ReactNode;
    className?: string;
    as?: 'div' | 'article';
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const isMobile = useIsMobile();

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current || isMobile) return;
        const { left, top } = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    }, [isMobile, mouseX, mouseY]);

    const Tag = motion[as] as typeof motion.div;

    return (
        <Tag
            ref={ref}
            onMouseMove={isMobile ? undefined : handleMouseMove}
            onMouseEnter={isMobile ? undefined : () => setHovering(true)}
            onMouseLeave={isMobile ? undefined : () => setHovering(false)}
            variants={fadeSlideUp}
            className={`group relative overflow-hidden rounded-xl max-md:backdrop-blur-sm backdrop-blur-md border border-white/10 transition-[border-color] duration-300 hover:border-sky-500/50 ${className}`}
        >
            {/* Live spotlight via CSS custom property trick — desktop only */}
            {!isMobile && (
                <div
                    className="pointer-events-none absolute -inset-px z-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ref={(el) => {
                        if (!el) return;
                        const update = () => {
                            el.style.background = `radial-gradient(350px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(56,189,248,0.12), transparent 60%)`;
                            if (hovering) requestAnimationFrame(update);
                        };
                        if (hovering) requestAnimationFrame(update);
                    }}
                />
            )}
            <div className="relative z-10">{children}</div>
        </Tag>
    );
};

/**
 * RevealText — masked clip-path wipe from bottom to top.
 */
export const RevealText = ({
    children,
    className = '',
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) => (
    <div className="overflow-hidden">
        <motion.div
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ ...SPRING.default, delay }}
            className={className}
        >
            {children}
        </motion.div>
    </div>
);

/**
 * Standard viewport trigger shorthand.
 */
export const VIEWPORT = { once: true, margin: '-100px' as const };
