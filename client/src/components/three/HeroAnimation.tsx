import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';

function AnimatedSphere() {
  const meshRef = useRef<any>();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial
        color="#FFD700"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function FallbackAnimation() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
  );
}

export default function HeroAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 -z-10 opacity-70"
    >
      <Suspense fallback={<FallbackAnimation />}>
        <ErrorBoundary fallback={<FallbackAnimation />}>
          {typeof window !== 'undefined' && <ThreeScene />}
        </ErrorBoundary>
      </Suspense>
    </motion.div>
  );
}

function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <AnimatedSphere />
    </Canvas>
  );
}