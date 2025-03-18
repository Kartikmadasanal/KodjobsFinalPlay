import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { Suspense } from "react";

function AnimatedSphere() {
  return (
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial
        color="#7c3aed"
        wireframe
        transparent
        opacity={0.2}
      />
    </Sphere>
  );
}

export default function AboutBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/30 to-primary/10"
        animate={{
          scale: [1, 1.2, 1],
          x: [-150, 150, -150],
          y: [-100, 100, -100],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          top: '5%',
          left: '15%',
          filter: 'blur(100px)',
        }}
      />
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[400px]">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={1}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}