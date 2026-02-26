import { useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type AgentType = 'bpa' | 'consulting' | 'idp' | 'finance' | 'hr' | 'customer_service';

/* ─── BPA: Interlocking gear system (two torus rings on different axes) ─── */
const BpaProp = ({ color }: { color: string }) => {
    const group = useRef<THREE.Group>(null!);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        group.current.position.x = 0.5 + Math.sin(t * 0.8) * 0.04;
        group.current.position.y = 0.15 + Math.sin(t * 1.2) * 0.06;
        group.current.children[0].rotation.z = t * 0.6;
        group.current.children[1].rotation.x = t * -0.5;
    });
    return (
        <group ref={group}>
            {/* Gear 1 */}
            <mesh>
                <torusGeometry args={[0.16, 0.025, 12, 24]} />
                <meshStandardMaterial
                    color={color} emissive={color} emissiveIntensity={2.5}
                    transparent opacity={0.8} toneMapped={false}
                />
            </mesh>
            {/* Gear 2 — perpendicular intersection */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.12, 0, 0]}>
                <torusGeometry args={[0.12, 0.02, 12, 24]} />
                <meshStandardMaterial
                    color={color} emissive={color} emissiveIntensity={2}
                    transparent opacity={0.7} toneMapped={false}
                />
            </mesh>
            <pointLight position={[0, 0, 0.1]} color={color} intensity={2} distance={0.8} />
        </group>
    );
};

/* ─── Consulting: Neural node (icosahedron + satellite spheres) ─── */
const ConsultingProp = ({ color }: { color: string }) => {
    const group = useRef<THREE.Group>(null!);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        group.current.position.x = 0.5 + Math.sin(t * 1.1) * 0.05;
        group.current.position.y = 0.2 + Math.sin(t * 1.5) * 0.06;
        group.current.rotation.y = t * 0.4;
    });

    const satellites = [
        [0.22, 0.08, 0], [-0.18, 0.12, 0.1], [0.05, -0.2, 0.12],
        [-0.1, 0.05, -0.2], [0.15, -0.1, -0.15],
    ];

    return (
        <group ref={group}>
            {/* Central node */}
            <mesh>
                <icosahedronGeometry args={[0.1, 1]} />
                <meshStandardMaterial
                    color={color} emissive={color} emissiveIntensity={3}
                    transparent opacity={0.85} toneMapped={false}
                />
            </mesh>
            {/* Satellite spheres */}
            {satellites.map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]}>
                    <sphereGeometry args={[0.03, 12, 12]} />
                    <meshStandardMaterial
                        color={color} emissive={color} emissiveIntensity={2}
                        transparent opacity={0.6} toneMapped={false}
                    />
                </mesh>
            ))}
            <pointLight position={[0, 0, 0.1]} color={color} intensity={2} distance={0.8} />
        </group>
    );
};

/* ─── IDP: Scanning document (plane + sweeping scanner line) ─── */
const IdpProp = ({ color }: { color: string }) => {
    const group = useRef<THREE.Group>(null!);
    const scanRef = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        group.current.position.x = 0.5 + Math.sin(t * 0.9) * 0.05;
        group.current.position.y = 0.12 + Math.sin(t * 1.3) * 0.05;
        // Scanner sweep up/down
        scanRef.current.position.y = Math.sin(t * 2) * 0.12;
    });
    return (
        <group ref={group}>
            {/* Document surface */}
            <mesh rotation={[0, 0.2, 0]}>
                <planeGeometry args={[0.28, 0.36]} />
                <meshPhysicalMaterial
                    color={color} transparent opacity={0.15}
                    roughness={0.2} side={THREE.DoubleSide}
                />
            </mesh>
            {/* Text lines (decorative) */}
            {[-0.1, -0.02, 0.06].map((y, i) => (
                <mesh key={i} position={[0, y, 0.005]} rotation={[0, 0.2, 0]}>
                    <planeGeometry args={[0.2 - i * 0.04, 0.015]} />
                    <meshStandardMaterial
                        color={color} emissive={color} emissiveIntensity={1.5}
                        transparent opacity={0.5} side={THREE.DoubleSide} toneMapped={false}
                    />
                </mesh>
            ))}
            {/* Scanner line */}
            <mesh ref={scanRef} position={[0, 0, 0.01]} rotation={[0, 0.2, 0]}>
                <planeGeometry args={[0.3, 0.008]} />
                <meshStandardMaterial
                    color="#ffffff" emissive={color} emissiveIntensity={5}
                    transparent opacity={0.9} side={THREE.DoubleSide} toneMapped={false}
                />
            </mesh>
            <pointLight position={[0, 0, 0.15]} color={color} intensity={1.5} distance={0.8} />
        </group>
    );
};

/* ─── Finance: Holographic bar chart (3 pillars) ─── */
const FinanceProp = ({ color }: { color: string }) => {
    const group = useRef<THREE.Group>(null!);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        group.current.position.x = 0.5 + Math.sin(t * 0.8) * 0.04;
        group.current.position.y = 0.1 + Math.sin(t * 1.4) * 0.05;
        group.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    });

    const bars = [
        { h: 0.18, x: -0.1, c: '#38bdf8' },
        { h: 0.28, x: 0, c: color },
        { h: 0.22, x: 0.1, c: '#34d399' },
    ];

    return (
        <group ref={group}>
            {/* Base platform */}
            <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.35, 0.15]} />
                <meshPhysicalMaterial
                    color={color} transparent opacity={0.1}
                    roughness={0.2} side={THREE.DoubleSide}
                />
            </mesh>
            {bars.map((bar, i) => (
                <mesh key={i} position={[bar.x, bar.h / 2, 0]}>
                    <boxGeometry args={[0.06, bar.h, 0.06]} />
                    <meshStandardMaterial
                        color={bar.c} emissive={bar.c} emissiveIntensity={2}
                        transparent opacity={0.75} toneMapped={false}
                    />
                </mesh>
            ))}
            <pointLight position={[0, 0.15, 0.1]} color={color} intensity={1.5} distance={0.8} />
        </group>
    );
};

/* ─── HR: Network of floating capsule silhouettes ─── */
const HrProp = ({ color }: { color: string }) => {
    const group = useRef<THREE.Group>(null!);
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        group.current.position.x = 0.5 + Math.sin(t * 1.0) * 0.04;
        group.current.position.y = 0.15 + Math.sin(t * 1.6) * 0.05;
        group.current.rotation.y = t * 0.3;
    });

    const figures = [
        { x: 0, y: 0.05, z: 0 },
        { x: -0.15, y: -0.02, z: 0.05 },
        { x: 0.15, y: -0.02, z: -0.05 },
    ];

    return (
        <group ref={group}>
            {figures.map((pos, i) => (
                <group key={i} position={[pos.x, pos.y, pos.z]}>
                    {/* Head */}
                    <mesh position={[0, 0.1, 0]}>
                        <sphereGeometry args={[0.035, 12, 12]} />
                        <meshStandardMaterial
                            color={color} emissive={color} emissiveIntensity={2}
                            transparent opacity={0.7} toneMapped={false}
                        />
                    </mesh>
                    {/* Body capsule */}
                    <mesh position={[0, 0, 0]}>
                        <capsuleGeometry args={[0.03, 0.08, 8, 16]} />
                        <meshStandardMaterial
                            color={color} emissive={color} emissiveIntensity={1.5}
                            transparent opacity={0.6} toneMapped={false}
                        />
                    </mesh>
                </group>
            ))}
            {/* Connection lines between figures */}
            <pointLight position={[0, 0.05, 0.1]} color={color} intensity={1.5} distance={0.8} />
        </group>
    );
};

/* ─── Customer Service: Holographic headset ring ─── */
const CustomerServiceProp = ({ color }: { color: string }) => {
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
                    color={color} emissive={color} emissiveIntensity={3}
                    transparent opacity={0.8} toneMapped={false}
                />
            </mesh>
            {/* Mic boom */}
            <mesh position={[0.22, 0.35, 0.15]} rotation={[0, 0, -0.6]}>
                <cylinderGeometry args={[0.01, 0.01, 0.18, 8]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
            </mesh>
            <pointLight position={[0, 0.5, 0]} color={color} intensity={2} distance={1} />
        </group>
    );
};

/* ─── Selector ─── */
const AgentProp = ({ type, color }: { type: AgentType; color: string }) => {
    switch (type) {
        case 'bpa':
            return <BpaProp color={color} />;
        case 'consulting':
            return <ConsultingProp color={color} />;
        case 'idp':
            return <IdpProp color={color} />;
        case 'finance':
            return <FinanceProp color={color} />;
        case 'hr':
            return <HrProp color={color} />;
        case 'customer_service':
            return <CustomerServiceProp color={color} />;
        default:
            return null;
    }
};

export type { AgentType };
export default AgentProp;
