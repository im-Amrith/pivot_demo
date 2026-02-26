import { useState } from 'react';
import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, BakeShadows } from '@react-three/drei';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import AIAgentCore from '../3d/AIAgentCore';
import type { AgentType } from '../3d/AgentProps';

interface ServiceAgent {
    id: number;
    name: string;
    desc: string;
    color: string;
    tags: string[];
    type: AgentType;
}

const agents: ServiceAgent[] = [
    { id: 1, name: 'Custom BPA', desc: 'Tailored business process architecture designed specifically for your unique operational model.', color: '#6366f1', tags: ['Workflow', 'Architecture'], type: 'bpa' },
    { id: 2, name: 'AI Consulting', desc: 'Strategic advisory on implementing GenAI and Machine Learning models to augment human labor.', color: '#0ea5e9', tags: ['GenAI', 'Strategy'], type: 'consulting' },
    { id: 3, name: 'IDP', desc: 'Intelligent Document Processing using OCR to digitize invoices, contracts, and IDs instantly.', color: '#f59e0b', tags: ['OCR', 'Digitization'], type: 'idp' },
    { id: 4, name: 'Financial Automation', desc: 'Automate accounts payable, receivable, and reconciliation to eliminate month-end stress.', color: '#34d399', tags: ['Payables', 'Reconciliation'], type: 'finance' },
    { id: 5, name: 'HR Automation', desc: 'Streamline the employee lifecycle from onboarding to payroll and performance management.', color: '#f43f5e', tags: ['Onboarding', 'Payroll'], type: 'hr' },
    { id: 6, name: 'Customer Service', desc: 'Deploy 24/7 intelligent agents that resolve tickets and handle inquiries autonomously.', color: '#f97316', tags: ['24/7 Agents', 'Ticketing'], type: 'customer_service' },
];

const RobotCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % agents.length);
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + agents.length) % agents.length);

    return (
        <section className="py-24 bg-slate-100 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 text-center mb-16">
                <h2 className="text-4xl font-black text-slate-900">Meet Your AI Workforce</h2>
                <p className="mt-4 text-slate-600">Specialized agents ready to integrate into your existing workflows.</p>
            </div>

            <div className="relative h-[600px] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-between px-4 md:px-20 z-20 pointer-events-none">
                    <button
                        onClick={handlePrev}
                        className="size-14 rounded-full bg-white/80 backdrop-blur shadow-xl flex items-center justify-center hover:bg-white transition-all pointer-events-auto"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="size-14 rounded-full bg-white/80 backdrop-blur shadow-xl flex items-center justify-center hover:bg-white transition-all pointer-events-auto"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>

                <div className="flex items-center justify-center w-full max-w-5xl relative h-full">
                    {agents.map((agent, index) => {
                        const offset = index - activeIndex;
                        const isActive = index === activeIndex;

                        let displayOffset = offset;
                        if (offset > agents.length / 2) displayOffset -= agents.length;
                        if (offset < -agents.length / 2) displayOffset += agents.length;
                        const absDisplayOffset = Math.abs(displayOffset);

                        return (
                            <motion.div
                                key={agent.id}
                                initial={false}
                                animate={{
                                    x: displayOffset * 280,
                                    scale: isActive ? 1.1 : 0.8,
                                    zIndex: 10 - absDisplayOffset,
                                    opacity: absDisplayOffset > 2 ? 0 : 1 - absDisplayOffset * 0.3,
                                    rotateY: displayOffset * -15,
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="absolute w-[320px] h-[480px] rounded-3xl shadow-2xl overflow-hidden flex flex-col will-change-transform"
                                style={{ backgroundColor: agent.color }}
                            >
                                <div className="absolute top-4 right-4 text-white/50">
                                    <Info size={20} />
                                </div>

                                <div className="h-1/2 relative">
                                    <Canvas
                                        shadows
                                        dpr={[1, 1.5]}
                                        camera={{ position: [0, 0.5, 3.2], fov: 35 }}
                                        gl={{ alpha: true, antialias: true }}
                                        style={{ background: 'transparent' }}
                                    >
                                        <ambientLight intensity={0.4} />
                                        <directionalLight
                                            position={[5, 5, 5]}
                                            intensity={1.2}
                                            castShadow
                                            shadow-mapSize-width={512}
                                            shadow-mapSize-height={512}
                                        />
                                        <pointLight position={[-3, 2, 4]} intensity={0.6} color="#ffffff" />
                                        <pointLight position={[2, -1, 3]} intensity={0.4} color={agent.color} />

                                        <Environment preset="city" />

                                        <AIAgentCore
                                            color={agent.color === '#f43f5e' ? '#ff6b8a' : agent.color}
                                            type={agent.type}
                                        />

                                        <ContactShadows
                                            position={[0, -0.6, 0]}
                                            opacity={0.35}
                                            scale={3}
                                            blur={2.5}
                                            far={1.5}
                                        />
                                        <BakeShadows />
                                    </Canvas>
                                </div>

                                <div className="p-8 flex-1 flex flex-col text-white text-center">
                                    <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
                                    <p className="text-sm text-white/80 mb-6">{agent.desc}</p>

                                    <div className="flex flex-wrap justify-center gap-2 mb-auto">
                                        {agent.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full bg-black/20 text-[10px] font-bold uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <button className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all font-bold text-sm mt-4">
                                        Explore {agent.name}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default RobotCarousel;
