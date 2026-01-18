import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars, Float } from '@react-three/drei';

const StarField = (props) => {
    const ref = useRef();

    const sphere = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 5000; i++) {
            const x = (Math.random() - 0.5) * 3;
            const y = (Math.random() - 0.5) * 3;
            const z = (Math.random() - 0.5) * 3;
            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const Planet = ({ position, color, size }) => {
    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={position}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
            </mesh>
            {/* Atmosphere glow */}
            <mesh position={position} scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.1} />
            </mesh>
        </Float>
    );
};

const Satellite = () => {
    const meshRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * 0.2;
        // Orbit logic
        if (meshRef.current) {
            meshRef.current.position.x = Math.sin(t) * 3;
            meshRef.current.position.z = Math.cos(t) * 3;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} position={[3, 0, 0]}>
            <boxGeometry args={[0.05, 0.05, 0.2]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
            <group position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <mesh position={[0.1, 0, 0]}>
                    <boxGeometry args={[0.2, 0.1, 0.01]} />
                    <meshStandardMaterial color="#222" roughness={0.2} metalness={0.8} />
                </mesh>
                <mesh position={[-0.1, 0, 0]}>
                    <boxGeometry args={[0.2, 0.1, 0.01]} />
                    <meshStandardMaterial color="#222" roughness={0.2} metalness={0.8} />
                </mesh>
            </group>
        </mesh>
    );
};

export const CosmicScene = () => {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.1} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <StarField />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <fog attach="fog" args={['black', 5, 15]} />

                {/* Distant Planet */}
                <Planet position={[-2, -1, -5]} color="#111111" size={1} />

                {/* Orbiting Satellite */}
                <Satellite />
            </Canvas>

            {/* Cinematic Grain Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
        </div>
    );
};
