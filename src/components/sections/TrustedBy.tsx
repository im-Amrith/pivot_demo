const logos = [
    {
        name: 'Encon',
        mark: (
            <span className="flex items-center gap-3">
                <img src={new URL('../ui/encon.png', import.meta.url).href} alt="Encon" className="h-9 w-auto" />
                <span className="text-[24px] font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Encon</span>
            </span>
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
