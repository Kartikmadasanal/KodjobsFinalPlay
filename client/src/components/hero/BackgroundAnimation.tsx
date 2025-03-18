import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/30 to-primary/10"
        animate={{
          scale: [1, 1.2, 1],
          x: [-100, 100, -100],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          top: '10%',
          left: '20%',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-l from-primary/20 to-primary/5"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [100, -100, 100],
          y: [50, -50, 50],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          top: '60%',
          right: '20%',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
