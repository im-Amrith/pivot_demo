const logos = [
    {
        name: 'AetherBank',
        mark: (
            <svg viewBox="0 0 220 56" className="h-9 w-auto" aria-hidden="true">
                <rect x="2" y="10" width="34" height="34" rx="8" className="fill-current" />
                <path d="M11 34 L19 20 L27 34" stroke="currentColor" strokeWidth="2.5" className="fill-none" />
                <text x="48" y="36" className="fill-current text-[24px] font-semibold" fontFamily="Inter, system-ui, sans-serif">AetherBank</text>
            </svg>
        ),
    },
    {
        name: 'KineticForge',
        mark: (
            <svg viewBox="0 0 250 56" className="h-9 w-auto" aria-hidden="true">
                <circle cx="20" cy="28" r="16" className="fill-none stroke-current" strokeWidth="3" />
                <path d="M12 28 H28" stroke="currentColor" strokeWidth="3" />
                <text x="48" y="36" className="fill-current text-[24px] font-semibold" fontFamily="Inter, system-ui, sans-serif">KineticForge</text>
            </svg>
        ),
    },
    {
        name: 'NexaLedger',
        mark: (
            <svg viewBox="0 0 220 56" className="h-9 w-auto" aria-hidden="true">
                <path d="M2 12 H34 V44 H2 Z" className="fill-none stroke-current" strokeWidth="3" />
                <path d="M10 18 L26 38" stroke="currentColor" strokeWidth="3" />
                <text x="48" y="36" className="fill-current text-[24px] font-semibold" fontFamily="Inter, system-ui, sans-serif">NexaLedger</text>
            </svg>
        ),
    },
];

const TrustedBy = () => {
    return (
        <section className="bg-slate-900">
            <div className="flex flex-col items-center justify-center gap-8 py-12">
                <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                    TRUSTED BY INNOVATIVE SMES
                </p>

                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
                    {logos.map((logo) => (
                        <div
                            key={logo.name}
                            className="cursor-default text-slate-400 opacity-50 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                            role="img"
                            aria-label={logo.name}
                        >
                            {logo.mark}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
