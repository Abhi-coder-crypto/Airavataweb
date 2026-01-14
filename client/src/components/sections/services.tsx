import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, 
  Smartphone, 
  Cloud, 
  Bot, 
  Shield, 
  Paintbrush, 
  Lightbulb, 
  Settings,
  ArrowRight,
  X,
  CheckCircle,
  Clock,
  Users
} from "lucide-react";

// Professional Glass Card Component with Blue-Cyan Theme
const GlassCard = ({ children, className = "" }) => (
  <div className={`backdrop-blur-sm bg-white/80 border border-blue-200/40 shadow-xl shadow-blue-500/10 ${className}`}>
    {children}
  </div>
);

// Modal Component for Service Details
const ServiceModal = ({ service, isOpen, onClose }) => {
  if (!service) return null;

  const serviceDetails = {
    "Website Development": {
      overview: "Build scalable, high-performance web applications using cutting-edge technologies and industry best practices.",
      process: ["Discovery & Planning", "Architecture Design", "Development & Testing", "Deployment & Optimization"],
      technologies: ["React/Next.js", "Node.js", "TypeScript", "GraphQL", "AWS/Azure"],
      timeline: "4-12 weeks",
      deliverables: ["Responsive Web Application", "Source Code", "Documentation", "Deployment Guide"]
    },
    "Mobile Application": {
      overview: "Create native and cross-platform mobile applications with exceptional user experience and performance.",
      process: ["UX Research", "Prototype Development", "Native Development", "App Store Deployment"],
      technologies: ["React Native", "Flutter", "iOS SDK", "Android SDK", "Firebase"],
      timeline: "6-16 weeks",
      deliverables: ["Mobile Application", "App Store Listing", "Analytics Setup", "Maintenance Plan"]
    },
    "Software Development": {
      overview: "Custom software solutions engineered to solve complex business challenges with reliability and scalability.",
      process: ["Requirements Gathering", "System Architecture", "Agile Development", "Quality Assurance"],
      technologies: ["Java", "Python", ".NET", "PostgreSQL", "Microservices"],
      timeline: "8-24 weeks",
      deliverables: ["Custom Software", "Source Code", "System Architecture Documentation", "User Training"]
    },
    "AI & Automation": {
      overview: "Implement intelligent automation and machine learning solutions to optimize business processes.",
      process: ["Process Analysis", "AI Model Development", "Integration", "Training & Support"],
      technologies: ["Python", "TensorFlow", "OpenAI API", "Azure AI", "Automation Tools"],
      timeline: "8-20 weeks",
      deliverables: ["AI Model", "Automation Scripts", "Integration Guide", "Training Materials"]
    },
    "Consulting": {
      overview: "Strategic technology consulting to guide digital transformation and innovation initiatives.",
      process: ["Business Analysis", "Technology Assessment", "Strategy Development", "Implementation Roadmap"],
      technologies: ["Enterprise Architecture", "Digital Strategy", "Innovation Framework", "Change Management"],
      timeline: "2-6 weeks",
      deliverables: ["Strategic Report", "Technology Roadmap", "Implementation Plan", "ROI Analysis"]
    },
    "Digital Marketing": {
      overview: "Comprehensive digital marketing strategies designed to increase brand visibility, generate qualified leads, and drive measurable business growth through data-driven campaigns and multi-channel approaches.",
      process: ["Market Research & Competitor Analysis", "Target Audience & Persona Development", "Multi-Channel Strategy Development", "Campaign Implementation & Optimization"],
      technologies: ["Google Analytics 4", "Google Ads & Facebook Ads", "HubSpot CRM", "Mailchimp & Klaviyo", "SEMrush & Ahrefs"],
      timeline: "2-6 weeks",
      deliverables: ["Digital Marketing Strategy", "Campaign Setup & Launch", "Analytics Dashboard", "Monthly Performance Reports"]
    }
  };

  const details = serviceDetails[service.title] || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl shadow-blue-500/20 max-w-4xl w-full max-h-[90vh] overflow-auto border border-blue-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className={`w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/30`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{service.title}</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
                >
                  <X className="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Overview</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{details.overview}</p>

                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Our Process</h3>
                  <div className="space-y-3">
                    {details.process?.map((step, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 shadow-md">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {details.technologies?.map((tech, index) => (
                      <motion.span 
                        key={index} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-sm border border-blue-200 hover:shadow-md hover:from-blue-100 hover:to-cyan-100 transition-all duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                      <Clock className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <div className="font-medium text-blue-800">Timeline</div>
                        <div className="text-blue-600 text-sm">{details.timeline}</div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                      <h4 className="font-medium text-green-800 mb-2 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Deliverables
                      </h4>
                      <div className="space-y-1">
                        {details.deliverables?.map((item, index) => (
                          <div key={index} className="text-green-700 text-sm ml-7">• {item}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-blue-100 flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-500 relative overflow-hidden group"
                >
                  <span className="relative z-10">Start Project Discussion</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border-2 border-blue-300 text-blue-700 font-semibold py-4 px-6 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:shadow-lg transition-all duration-500"
                >
                  Request Quote
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [, navigate] = useLocation();

  const services = [
    {
      icon: Code,
      title: "Website Development",
      description: "Enterprise-grade web applications built with modern frameworks, optimized for performance, scalability, and user experience.",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      features: ["React & Next.js", "Performance Optimized", "Scalable Architecture"],
      delay: 0
    },
    {
      icon: Smartphone,
      title: "Mobile Application",
      description: "Native and cross-platform mobile solutions delivering exceptional user experiences across iOS and Android platforms.",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      features: ["Cross-Platform", "Native Performance", "App Store Ready"],
      delay: 0.1
    },
    {
      icon: Settings,
      title: "Software Development",
      description: "Custom software solutions engineered to solve complex business challenges with reliability and scalability.",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      features: ["Custom Solutions", "Enterprise Architecture", "Legacy Integration"],
      delay: 0.2
    },
    {
      icon: Bot,
      title: "AI & Automation",
      description: "Intelligent automation solutions and machine learning implementations to optimize operations and drive efficiency.",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      features: ["Machine Learning", "Process Automation", "Intelligent Analytics"],
      delay: 0.3
    },
    {
      icon: Lightbulb,
      title: "Consulting",
      description: "Strategic technology consulting and digital transformation guidance to accelerate business growth and innovation.",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      features: ["Digital Strategy", "Technology Roadmap", "Innovation Planning"],
      delay: 0.4
    },
    {
      icon: Paintbrush,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies and campaigns to boost online presence and drive measurable business growth.",
      gradient: "from-[#3480cb] to-[#52b9fd]",
      features: ["SEO & SEM", "Social Media Marketing", "Analytics & ROI Tracking"],
      delay: 0.5
    }
  ];

  const handleLearnMore = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <>
      <section id="services" className="py-24 bg-gradient-to-br from-blue-50 via-cyan-50/50 to-blue-50 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-grid-blue-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.4))] -z-0"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full filter blur-3xl opacity-30"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", damping: 15 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="text-blue-600 font-semibold text-lg tracking-wide uppercase bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 rounded-full border border-blue-200">Our Expertise</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Professional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive technology solutions engineered to accelerate your digital transformation 
              with enterprise-grade quality and proven methodologies.
            </p>
          </motion.div>

          {/* Enhanced Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: service.delay, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <GlassCard className="rounded-3xl overflow-hidden h-full hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 transform group-hover:scale-[1.03] group-hover:-translate-y-2 relative border-2 hover:border-blue-300/50">
                  <div className={`h-2 w-full bg-gradient-to-r ${service.gradient}`}></div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", damping: 15 }}
                        className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/40 transform transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/50`}
                      >
                        <service.icon className="w-7 h-7 text-white" />
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 text-base group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Enhanced Features */}
                    <div className="mb-8 space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                        >
                          <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 flex-shrink-0 group-hover:shadow-md group-hover:shadow-blue-500/50 transition-all duration-300`}></div>
                          {feature}
                        </motion.div>
                      ))}
                    </div>

                    {/* Enhanced Learn More Button */}
                    <div className="transform transition-all duration-500">
                      <motion.button 
                        onClick={() => handleLearnMore(service)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-gradient-to-r ${service.gradient} text-white font-semibold py-4 px-4 rounded-2xl transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center group/btn relative overflow-hidden border-2 border-transparent hover:border-white/20`}
                      >
                        <span className="relative z-10 flex items-center transition-all duration-300">
                          Learn More 
                          <ArrowRight className="w-4 h-4 ml-2 transition-all duration-500 group-hover/btn:translate-x-2 group-hover/btn:scale-110" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#3480cb] to-[#52b9fd] brightness-90 opacity-0 group-hover/btn:opacity-100 transition-all duration-500"></div>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </motion.button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-500/30 border border-blue-400/20">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full filter blur-3xl opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                  Partner with our expert team to accelerate your digital transformation and achieve measurable results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button 
                    onClick={() => navigate("/#contact")}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-2xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-500 border-2 border-transparent hover:border-blue-200"
                  >
                    Schedule Consultation
                  </motion.button>
                  <motion.button 
                    onClick={() => navigate("/portfolio")}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white/80 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/10 hover:shadow-xl transition-all duration-500 backdrop-blur-sm"
                  >
                    View Portfolio
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Details Modal */}
      <ServiceModal 
        service={selectedService} 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />

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
