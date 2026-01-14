import { motion } from "framer-motion";

export default function FloatingParticles() {
  const particles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 6,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
