import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Configuration ─── */
const GRID = 100;          // 100×100 = 10,000 particles
const SPACING = 0.18;      // distance between particles
const WAVE_SPEED = 0.35;   // ripple speed
const WAVE_AMP = 0.25;     // ripple amplitude
const MOUSE_RADIUS = 2.5;  // repulsion radius (world units)
const MOUSE_STRENGTH = 0.8;// repulsion height boost
const LERP_SPEED = 0.04;   // smooth interpolation speed

/* ─── Particle Field Inner Component ─── */
const ParticleField = () => {
    const pointsRef = useRef<THREE.Points>(null!);
    const { size, viewport } = useThree();

    // Normalized mouse position mapped to world coordinates
    const mouse = useRef(new THREE.Vector2(9999, 9999));

    // Generate initial positions centered on origin
    const { positions, basePositions, count } = useMemo(() => {
        const cnt = GRID * GRID;
        const pos = new Float32Array(cnt * 3);
        const base = new Float32Array(cnt * 3);
        const halfExtent = (GRID * SPACING) / 2;

        for (let ix = 0; ix < GRID; ix++) {
            for (let iy = 0; iy < GRID; iy++) {
                const idx = (ix * GRID + iy) * 3;
                const x = ix * SPACING - halfExtent;
                const y = iy * SPACING - halfExtent;
                pos[idx] = x;
                pos[idx + 1] = y;
                pos[idx + 2] = 0;
                base[idx] = x;
                base[idx + 1] = y;
                base[idx + 2] = 0;
            }
        }
        return { positions: pos, basePositions: base, count: cnt };
    }, []);

    // Color array for per-particle tinting
    const colors = useMemo(() => {
        const c = new Float32Array(count * 3);
        const baseColor = new THREE.Color('#1e3a5f'); // deep blue
        for (let i = 0; i < count; i++) {
            c[i * 3] = baseColor.r;
            c[i * 3 + 1] = baseColor.g;
            c[i * 3 + 2] = baseColor.b;
        }
        return c;
    }, [count]);

    // Track mouse in world coords
    const handlePointerMove = useCallback(
        (e: THREE.Event & { clientX: number; clientY: number }) => {
            // Map screen coords to world-space XY at z=0
            const x = ((e.clientX / size.width) * 2 - 1) * (viewport.width / 2);
            const y = (-(e.clientY / size.height) * 2 + 1) * (viewport.height / 2);
            mouse.current.set(x, y);
        },
        [size, viewport]
    );

    const handlePointerLeave = useCallback(() => {
        mouse.current.set(9999, 9999);
    }, []);

    // Target colors for lerping
    const brandCyan = useMemo(() => new THREE.Color('#38bdf8'), []);
    const deepBlue = useMemo(() => new THREE.Color('#1e3a5f'), []);
    const tempColor = useMemo(() => new THREE.Color(), []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const geometry = pointsRef.current.geometry;
        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        const colAttr = geometry.attributes.color as THREE.BufferAttribute;
        const t = state.clock.elapsedTime;

        const mx = mouse.current.x;
        const my = mouse.current.y;

        for (let i = 0; i < count; i++) {
            const bx = basePositions[i * 3];
            const by = basePositions[i * 3 + 1];

            // Wave — combined sine/cosine for organic ripple
            const wave =
                Math.sin(bx * 1.2 + t * WAVE_SPEED) * WAVE_AMP * 0.6 +
                Math.cos(by * 1.4 + t * WAVE_SPEED * 0.7) * WAVE_AMP * 0.4 +
                Math.sin((bx + by) * 0.8 + t * WAVE_SPEED * 0.5) * WAVE_AMP * 0.3;

            // Mouse repulsion
            const dx = bx - mx;
            const dy = by - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - dist / MOUSE_RADIUS);
            const mouseBoost = influence * influence * MOUSE_STRENGTH; // quadratic falloff

            // Lerp Z for smooth transition
            const targetZ = wave + mouseBoost;
            const currentZ = posAttr.getZ(i);
            posAttr.setZ(i, currentZ + (targetZ - currentZ) * LERP_SPEED);

            // Lerp color toward cyan near mouse, back to deep blue away
            if (influence > 0.01) {
                tempColor.lerpColors(deepBlue, brandCyan, influence);
            } else {
                tempColor.copy(deepBlue);
            }
            const cr = colAttr.getX(i);
            const cg = colAttr.getY(i);
            const cb = colAttr.getZ(i);
            colAttr.setXYZ(
                i,
                cr + (tempColor.r - cr) * LERP_SPEED * 2,
                cg + (tempColor.g - cg) * LERP_SPEED * 2,
                cb + (tempColor.b - cb) * LERP_SPEED * 2
            );
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
    });

    return (
        <points
            ref={pointsRef}
            rotation={[-Math.PI / 3, 0, Math.PI / 6]}
            position={[0, -1, 0]}
            onPointerMove={handlePointerMove as any}
            onPointerLeave={handlePointerLeave}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.025}
                vertexColors
                transparent
                opacity={0.85}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

/* ─── Ambient Fog Spheres (volumetric depth) ─── */
const FogSpheres = () => {
    const ref = useRef<THREE.Group>(null!);
    useFrame((state) => {
        ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    });
    return (
        <group ref={ref}>
            <mesh position={[-4, 0, -5]}>
                <sphereGeometry args={[3, 16, 16]} />
                <meshBasicMaterial color="#38bdf8" transparent opacity={0.015} />
            </mesh>
            <mesh position={[5, 2, -7]}>
                <sphereGeometry args={[4, 16, 16]} />
                <meshBasicMaterial color="#6366f1" transparent opacity={0.01} />
            </mesh>
        </group>
    );
};

/* ─── Exported Wrapper ─── */
const WebGLBackground = () => (
    <div className="absolute inset-0 -z-10 bg-[#050B14]">
        <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 3, 7], fov: 55 }}
            gl={{ alpha: false, antialias: false, powerPreference: 'high-performance' }}
            style={{ position: 'absolute', inset: 0 }}
            eventSource={typeof document !== 'undefined' ? document.documentElement : undefined}
        >
            <color attach="background" args={['#050B14']} />
            <fog attach="fog" args={['#050B14', 8, 20]} />
            <ParticleField />
            <FogSpheres />
        </Canvas>
        {/* Film grain overlay */}
        <div className="absolute inset-0 bg-grain mix-blend-overlay pointer-events-none" />
    </div>
);

export default WebGLBackground;
