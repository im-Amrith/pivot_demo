import { useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type AgentType = 'writer' | 'mom' | 'helpdesk' | 'interviewer';

/* ─── Writer: glowing neon stylus ─── */
const WriterProp = ({ color }: { color: string }) => {
    const group = useRef<THREE.Group>(null!);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        group.current.position.x = 0.55 + Math.sin(t * 1.2) * 0.05;
        group.current.position.y = 0.15 + Math.sin(t * 1.8) * 0.08;
        group.current.rotation.z = -0.5 + Math.sin(t * 0.8) * 0.1;
    });
    return (
        <group ref={group} rotation={[0, 0, -0.5]}>
            {/* Shaft */}
            <mesh>
                <cylinderGeometry args={[0.018, 0.022, 0.45, 8]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={2.5}
                    transparent
                    opacity={0.85}
                />
            </mesh>
            {/* Nib */}
            <mesh position={[0, -0.27, 0]}>
                <coneGeometry args={[0.025, 0.1, 8]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive={color}
                    emissiveIntensity={4}
                    transparent
                    opacity={0.9}
                />
            </mesh>
            {/* Glow tip point light */}
            <pointLight position={[0, -0.32, 0]} color={color} intensity={2} distance={0.8} />
        </group>
    );
};

/* ─── Minutes of Meeting: floating data-node grid ─── */
const MomProp = ({ color }: { color: string }) => {
    const group = useRef<THREE.Group>(null!);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        group.current.position.x = 0.5 + Math.sin(t * 0.9) * 0.06;
        group.current.position.y = 0.1 + Math.sin(t * 1.4) * 0.06;
        group.current.rotation.y = t * 0.3;
    });

    const nodes: ReactNode[] = [];
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            nodes.push(
                <mesh key={`${r}-${c}`} position={[(c - 1) * 0.09, (1 - r) * 0.09, 0]}>
                    <boxGeometry args={[0.06, 0.06, 0.015]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={1.5 + ((r + c) % 2) * 1.5}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            );
        }
    }

    return (
        <group ref={group}>
            {/* Clipboard backing */}
            <mesh position={[0, 0, -0.015]}>
                <planeGeometry args={[0.35, 0.35]} />
                <meshPhysicalMaterial
                    color={color}
                    transparent
                    opacity={0.12}
                    roughness={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {nodes}
            <pointLight position={[0, 0, 0.1]} color={color} intensity={1.5} distance={0.8} />
        </group>
    );
};

/* ─── Helpdesk: holographic headset ring ─── */
const HelpdeskProp = ({ color }: { color: string }) => {
    const ring = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        ring.current.position.y = 0.45 + Math.sin(t * 1.6) * 0.04;
        ring.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.7) * 0.15;
        ring.current.rotation.z = t * 0.4;
    });
    return (
        <group>
            <mesh ref={ring} position={[0, 0.45, 0]}>
                <torusGeometry args={[0.3, 0.025, 16, 48]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={3}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            {/* Mic boom */}
            <mesh position={[0.22, 0.35, 0.15]} rotation={[0, 0, -0.6]}>
                <cylinderGeometry args={[0.01, 0.01, 0.18, 8]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>
            <pointLight position={[0, 0.5, 0]} color={color} intensity={2} distance={1} />
        </group>
    );
};

/* ─── Interviewer: scanning lens with pulse ─── */
const InterviewerProp = ({ color }: { color: string }) => {
    const group = useRef<THREE.Group>(null!);
    const innerRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        group.current.position.x = 0.5 + Math.sin(t * 1.1) * 0.05;
        group.current.position.y = 0.2 + Math.sin(t * 1.5) * 0.06;
        group.current.rotation.y = t * 0.5;
        // Scanning pulse
        const scale = 1 + Math.sin(t * 3) * 0.15;
        innerRef.current.scale.set(scale, scale, 1);
    });

    return (
        <group ref={group}>
            {/* Outer ring */}
            <mesh>
                <ringGeometry args={[0.12, 0.16, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={3}
                    transparent
                    opacity={0.85}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Inner lens */}
            <mesh ref={innerRef} position={[0, 0, 0.005]}>
                <circleGeometry args={[0.1, 32]} />
                <meshPhysicalMaterial
                    color={color}
                    transmission={0.8}
                    roughness={0.1}
                    transparent
                    opacity={0.4}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Cross-hairs */}
            {[0, Math.PI / 2].map((rot, i) => (
                <mesh key={i} rotation={[0, 0, rot]}>
                    <planeGeometry args={[0.28, 0.008]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={2}
                        transparent
                        opacity={0.5}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
            <pointLight position={[0, 0, 0.15]} color={color} intensity={2} distance={0.8} />
        </group>
    );
};

/* ─── Selector ─── */
const AgentProp = ({ type, color }: { type: AgentType; color: string }) => {
    switch (type) {
        case 'writer':
            return <WriterProp color={color} />;
        case 'mom':
            return <MomProp color={color} />;
        case 'helpdesk':
            return <HelpdeskProp color={color} />;
        case 'interviewer':
            return <InterviewerProp color={color} />;
        default:
            return null;
    }
};

export type { AgentType };
export default AgentProp;
