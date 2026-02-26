import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import AgentProp from './AgentProps';
import type { AgentType } from './AgentProps';

interface AIAgentCoreProps {
    color?: string;
    type?: AgentType;
}

const AIAgentCore = ({ color = '#38bdf8', type = 'bpa' }: AIAgentCoreProps) => {
    const group = useRef<THREE.Group>(null!);
    const shellRef = useRef<THREE.Mesh>(null!);
    const innerRef = useRef<THREE.Mesh>(null!);
    const ledRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Idle float
        group.current.position.y = Math.sin(t) * 0.1;
        group.current.rotation.y = Math.sin(t * 0.5) * 0.15;

        // Inner core emissive pulse
        const mat = innerRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = hovered ? 5 : 2.5 + Math.sin(t * 3) * 0.8;

        // LED strip pulse
        const ledMat = ledRef.current.material as THREE.MeshStandardMaterial;
        ledMat.emissiveIntensity = hovered ? 4 : 2 + Math.sin(t * 2.5) * 0.6;

        // Shell hover shine
        const shellMat = shellRef.current.material as THREE.MeshPhysicalMaterial;
        shellMat.roughness = THREE.MathUtils.lerp(shellMat.roughness, hovered ? 0.02 : 0.08, 0.1);

        // Subtle tilt toward camera on hover
        if (hovered) {
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.1, 0.05);
        } else {
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.05);
        }
    });

    return (
        <group
            ref={group}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* ── Outer Glass Shell (Capsule) ── */}
            <mesh ref={shellRef}>
                <capsuleGeometry args={[0.28, 0.35, 16, 32]} />
                <meshPhysicalMaterial
                    color="#e8eff8"
                    transmission={0.92}
                    roughness={0.08}
                    clearcoat={1}
                    clearcoatRoughness={0.05}
                    ior={1.5}
                    thickness={0.5}
                    transparent
                    opacity={0.35}
                    envMapIntensity={1.5}
                    side={THREE.FrontSide}
                />
            </mesh>

            {/* ── Inner Emissive Orb ── */}
            <mesh ref={innerRef} scale={0.18}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={2.5}
                    toneMapped={false}
                />
            </mesh>

            {/* ── LED Equator Ring ── */}
            <mesh ref={ledRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.29, 0.012, 16, 64]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>

            {/* ── Secondary Decorative Rings ── */}
            <mesh rotation={[Math.PI / 3, 0.4, 0]}>
                <torusGeometry args={[0.33, 0.005, 8, 64]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1.2}
                    transparent
                    opacity={0.4}
                    toneMapped={false}
                />
            </mesh>
            <mesh rotation={[Math.PI / 2.5, -0.3, 0.5]}>
                <torusGeometry args={[0.36, 0.004, 8, 64]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1}
                    transparent
                    opacity={0.3}
                    toneMapped={false}
                />
            </mesh>

            {/* ── Core Light ── */}
            <pointLight color={color} intensity={3} distance={2} />

            {/* ── Type-Specific Holographic Prop ── */}
            <AgentProp type={type} color={color} />
        </group>
    );
};

export default AIAgentCore;
