import React from "react";
import { motion } from "framer-motion";

// Professional Glass Card Component with Blue-Cyan Theme
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`backdrop-blur-sm bg-white/80 border border-blue-200/40 shadow-none ${className}`}>
    {children}
  </div>
);

export default function Services() {
  const services = [
    {
      title: "Website Development",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      delay: 0
    },
    {
      title: "Mobile Application",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      delay: 0.1
    },
    {
      title: "Software Development",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      delay: 0.2
    },
    {
      title: "AI & Automation",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      delay: 0.3
    },
    {
      title: "Business Consulting",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      delay: 0.4
    },
    {
      title: "Digital Marketing",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      delay: 0.5
    }
  ];

  return (
    <>
      <section id="services" className="py-2 md:py-12 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-delayed"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-4xl lg:text-7xl font-extralight text-gray-900 mb-8 tracking-tight leading-tight"
            >
              Innovative Technology Services
              <br />
              <span className="font-light bg-gradient-to-r from-blue-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                for Business Growth
              </span>
            </motion.h1>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: service.delay, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group"
              >
                <GlassCard className="rounded-3xl overflow-hidden h-full hover:shadow-none transition-all duration-700 transform group-hover:scale-[1.03] group-hover:-translate-y-2 relative border-2 hover:border-blue-300/50 flex flex-col">
                  <div className={`h-2 w-full bg-gradient-to-r ${service.gradient}`}></div>
                  <div className="p-8 text-center flex-1 flex flex-col items-center justify-center min-h-[160px]">
                    <h3 className="text-3xl md:text-4xl font-light text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 leading-tight tracking-tight whitespace-nowrap">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm font-light text-blue-500/80 group-hover:text-blue-600 transition-colors duration-300 uppercase tracking-widest">
                      Click to know more
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
              @keyframes float {
                0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
                33% { transform: translate(30px, -30px) scale(1.05) rotate(1deg); }
                66% { transform: translate(-20px, 20px) scale(0.95) rotate(-1deg); }
              }
              @keyframes float-delayed {
                0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
                33% { transform: translate(-30px, 30px) scale(1.05) rotate(-1deg); }
                66% { transform: translate(20px, -20px) scale(0.95) rotate(1deg); }
              }
              .animate-float {
                animation: float 15s ease-in-out infinite;
              }
              .animate-float-delayed {
                animation: float-delayed 15s ease-in-out infinite;
                animation-delay: 5s;
              }
      `}</style>
    </>
  );
}
