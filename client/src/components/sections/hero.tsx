import { motion } from "framer-motion";
import logoImg from "@assets/AIRAVATA_TECHNOLOGIES_LOGO_1768368815595.png";

export default function Hero() {
  return (
    <section id="home" className="min-h-[50vh] sm:min-h-[70vh] relative flex items-center justify-center overflow-hidden pt-8 sm:pt-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Company Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 flex justify-center"
          >
            <img 
              src={logoImg} 
              alt="Airavata Technologies Logo" 
              className="h-32 sm:h-48 md:h-56 lg:h-64 w-auto object-contain"
            />
          </motion.div>

          {/* Main Heading - Made Sleek and Mobile Responsive */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 leading-tight tracking-wide"
          >
            <span className="text-black tracking-wide sm:tracking-wider md:tracking-widest">
              AIRAVATA TECHNOLOGIES
            </span>

            <br />
            <span className="text-black text-sm xs:text-base sm:text-lg md:text-xl lg:text-4xl">
              We Create | Innovate | Elevate
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-black/90 mb-4 sm:mb-12 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed font-light tracking-wide px-2 sm:px-0"
          >
            Transforming businesses through cutting-edge technology solutions, AI-powered innovation, and digital excellence.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
