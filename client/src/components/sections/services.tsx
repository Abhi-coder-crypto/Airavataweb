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
    "Web Development": {
      overview: "Build scalable, high-performance web applications using cutting-edge technologies and industry best practices.",
      process: ["Discovery & Planning", "Architecture Design", "Development & Testing", "Deployment & Optimization"],
      technologies: ["React/Next.js", "Node.js", "TypeScript", "GraphQL", "AWS/Azure"],
      timeline: "4-12 weeks",
      deliverables: ["Responsive Web Application", "Source Code", "Documentation", "Deployment Guide"]
    },
    "Mobile Apps": {
      overview: "Create native and cross-platform mobile applications with exceptional user experience and performance.",
      process: ["UX Research", "Prototype Development", "Native Development", "App Store Deployment"],
      technologies: ["React Native", "Flutter", "iOS SDK", "Android SDK", "Firebase"],
      timeline: "6-16 weeks",
      deliverables: ["Mobile Application", "App Store Listing", "Analytics Setup", "Maintenance Plan"]
    },
    "Cloud Solutions": {
      overview: "Design and implement scalable cloud infrastructure with automated deployment and monitoring.",
      process: ["Infrastructure Assessment", "Architecture Planning", "Migration Strategy", "Optimization"],
      technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
      timeline: "2-8 weeks",
      deliverables: ["Cloud Infrastructure", "Migration Plan", "Monitoring Setup", "Cost Optimization"]
    },
    "AI & Automation": {
      overview: "Implement intelligent automation and machine learning solutions to optimize business processes.",
      process: ["Process Analysis", "AI Model Development", "Integration", "Training & Support"],
      technologies: ["Python", "TensorFlow", "OpenAI API", "Azure AI", "Automation Tools"],
      timeline: "8-20 weeks",
      deliverables: ["AI Model", "Automation Scripts", "Integration Guide", "Training Materials"]
    },
    "Cybersecurity": {
      overview: "Comprehensive security assessment and implementation of robust protection measures.",
      process: ["Security Audit", "Vulnerability Assessment", "Solution Implementation", "Ongoing Monitoring"],
      technologies: ["Penetration Testing", "SIEM", "Encryption", "Zero Trust", "Compliance"],
      timeline: "3-10 weeks",
      deliverables: ["Security Report", "Implementation Plan", "Security Policies", "Monitoring Dashboard"]
    },
    "UI/UX Design": {
      overview: "Create user-centered designs that drive engagement and conversion through research-backed solutions.",
      process: ["User Research", "Wireframing", "Visual Design", "Prototype Testing"],
      technologies: ["Figma", "Adobe Creative Suite", "Principle", "InVision", "Miro"],
      timeline: "4-8 weeks",
      deliverables: ["Design System", "Prototypes", "Style Guide", "Handoff Documentation"]
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
      title: "Web Development",
      description: "Enterprise-grade web applications built with modern frameworks, optimized for performance, scalability, and user experience.",
      gradient: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&auto=format",
      features: ["React & Next.js", "Performance Optimized", "Scalable Architecture"],
      delay: 0
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile solutions delivering exceptional user experiences across iOS and Android platforms.",
      gradient: "from-cyan-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&auto=format",
      features: ["Cross-Platform", "Native Performance", "App Store Ready"],
      delay: 0.1
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure design and implementation with automated deployment and comprehensive monitoring.",
      gradient: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&auto=format",
      features: ["AWS & Azure", "Auto Scaling", "High Availability"],
      delay: 0.2
    },
    {
      icon: Bot,
      title: "AI & Automation",
      description: "Intelligent automation solutions and machine learning implementations to optimize operations and drive efficiency.",
      gradient: "from-cyan-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&auto=format",
      features: ["Machine Learning", "Process Automation", "Intelligent Analytics"],
      delay: 0.3
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security assessments and implementations to protect digital assets and ensure regulatory compliance.",
      gradient: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&auto=format",
      features: ["Security Audits", "Compliance", "Threat Protection"],
      delay: 0.4
    },
    {
      icon: Paintbrush,
      title: "UI/UX Design",
      description: "User-centered design solutions backed by research and testing to maximize engagement and conversion rates.",
      gradient: "from-cyan-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop&auto=format",
      features: ["User Research", "Design Systems", "Conversion Optimization"],
      delay: 0.5
    },
    {
      icon: Lightbulb,
      title: "Consulting",
      description: "Strategic technology consulting and digital transformation guidance to accelerate business growth and innovation.",
      gradient: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&auto=format",
      features: ["Digital Strategy", "Technology Roadmap", "Innovation Planning"],
      delay: 0.6
    },
    {
      icon: Settings,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies and campaigns to boost online presence and drive measurable business growth.",
      gradient: "from-cyan-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format",
      features: ["SEO & SEM", "Social Media Marketing", "Analytics & ROI Tracking"],
      delay: 0.7
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
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Professional
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive technology solutions engineered to accelerate your digital transformation 
              with enterprise-grade quality and proven methodologies.
            </p>
          </motion.div>

          {/* Enhanced Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  {/* Enhanced Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-blue-500/10 group-hover:from-blue-900/30"></div>
                    
                    {/* Enhanced Icon */}
                    <motion.div 
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className={`absolute top-4 right-4 w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/40 transform transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/50`}
                    >
                      <service.icon className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Enhanced Features */}
                    <div className="mb-6 space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3 flex-shrink-0 group-hover:shadow-md group-hover:shadow-blue-500/50 transition-all duration-300"></div>
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
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-all duration-500"></div>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Enhanced Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"></div>
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
              .bg-grid-blue-100 {
                background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(59 130 246 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
              }
            `}</style>
    </>
  );
}
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Code, 
//   Smartphone, 
//   Cloud, 
//   Bot, 
//   Shield, 
//   Paintbrush, 
//   Lightbulb, 
//   Settings,
//   ArrowRight,
//   X,
//   CheckCircle,
//   Clock
// } from "lucide-react";

// // Professional Glass Card Component with Blue-Cyan Theme
// const GlassCard = ({ children, className = "" }) => (
//   <div className={`backdrop-blur-sm bg-white/80 border border-blue-200/40 shadow-xl shadow-blue-500/10 ${className}`}>
//     {children}
//   </div>
// );

// // Modal Component for Service Details
// const ServiceModal = ({ service, isOpen, onClose }) => {
//   if (!service) return null;

//   const serviceDetails = {
//     "Web Development": {
//       overview: "Build scalable, high-performance web applications using cutting-edge technologies and industry best practices.",
//       process: ["Discovery & Planning", "Architecture Design", "Development & Testing", "Deployment & Optimization"],
//       technologies: ["React/Next.js", "Node.js", "TypeScript", "GraphQL", "AWS/Azure"],
//       timeline: "4-12 weeks",
//       deliverables: ["Responsive Web Application", "Source Code", "Documentation", "Deployment Guide"]
//     },
//     "Mobile Apps": {
//       overview: "Create native and cross-platform mobile solutions delivering exceptional user experiences across iOS and Android platforms.",
//       process: ["UX Research", "Prototype Development", "Native Development", "App Store Deployment"],
//       technologies: ["React Native", "Flutter", "iOS SDK", "Android SDK", "Firebase"],
//       timeline: "6-16 weeks",
//       deliverables: ["Mobile Application", "App Store Listing", "Analytics Setup", "Maintenance Plan"]
//     },
//     "Cloud Solutions": {
//       overview: "Design and implement scalable cloud infrastructure with automated deployment and monitoring.",
//       process: ["Infrastructure Assessment", "Architecture Planning", "Migration Strategy", "Optimization"],
//       technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
//       timeline: "2-8 weeks",
//       deliverables: ["Cloud Infrastructure", "Migration Plan", "Monitoring Setup", "Cost Optimization"]
//     },
//     "AI & Automation": {
//       overview: "Implement intelligent automation and machine learning solutions to optimize business processes.",
//       process: ["Process Analysis", "AI Model Development", "Integration", "Training & Support"],
//       technologies: ["Python", "TensorFlow", "OpenAI API", "Azure AI", "Automation Tools"],
//       timeline: "8-20 weeks",
//       deliverables: ["AI Model", "Automation Scripts", "Integration Guide", "Training Materials"]
//     },
//     "Cybersecurity": {
//       overview: "Comprehensive security assessment and implementation of robust protection measures.",
//       process: ["Security Audit", "Vulnerability Assessment", "Solution Implementation", "Ongoing Monitoring"],
//       technologies: ["Penetration Testing", "SIEM", "Encryption", "Zero Trust", "Compliance"],
//       timeline: "3-10 weeks",
//       deliverables: ["Security Report", "Implementation Plan", "Security Policies", "Monitoring Dashboard"]
//     },
//     "UI/UX Design": {
//       overview: "Create user-centered designs that drive engagement and conversion through research-backed solutions.",
//       process: ["User Research", "Wireframing", "Visual Design", "Prototype Testing"],
//       technologies: ["Figma", "Adobe Creative Suite", "Principle", "InVision", "Miro"],
//       timeline: "4-8 weeks",
//       deliverables: ["Design System", "Prototypes", "Style Guide", "Handoff Documentation"]
//     },
//     "Consulting": {
//       overview: "Strategic technology consulting to guide digital transformation and innovation initiatives.",
//       process: ["Business Analysis", "Technology Assessment", "Strategy Development", "Implementation Roadmap"],
//       technologies: ["Enterprise Architecture", "Digital Strategy", "Innovation Framework", "Change Management"],
//       timeline: "2-6 weeks",
//       deliverables: ["Strategic Report", "Technology Roadmap", "Implementation Plan", "ROI Analysis"]
//     },
//     "Digital Marketing": {
//       overview: "Comprehensive digital marketing strategies designed to increase brand visibility, generate qualified leads, and drive measurable business growth through data-driven campaigns and multi-channel approaches.",
//       process: ["Market Research & Competitor Analysis", "Target Audience & Persona Development", "Multi-Channel Strategy Development", "Campaign Implementation & Optimization"],
//       technologies: ["Google Analytics 4", "Google Ads & Facebook Ads", "HubSpot CRM", "Mailchimp & Klaviyo", "SEMrush & Ahrefs"],
//       timeline: "2-6 weeks",
//       deliverables: ["Digital Marketing Strategy", "Campaign Setup & Launch", "Analytics Dashboard", "Monthly Performance Reports"]
//     }
//   };

//   const details = serviceDetails[service.title] || {};

//   const handleRequestQuote = () => {
//     onClose();
//     // Scroll to contact section after a small delay to allow modal to close
//     setTimeout(() => {
//       const contactSection = document.getElementById('contact');
//       if (contactSection) {
//         contactSection.scrollIntoView({ behavior: 'smooth' });
//       }
//     }, 100);
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.4, ease: "easeOut" }}
//           className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.8, opacity: 0, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             className="bg-white rounded-3xl shadow-2xl shadow-blue-500/20 max-w-4xl w-full max-h-[90vh] overflow-auto border border-blue-100"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-8">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center">
//                   <div className={`w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/30`}>
//                     <service.icon className="w-7 h-7 text-white" />
//                   </div>
//                   <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{service.title}</h2>
//                 </div>
//                 <button 
//                   onClick={onClose}
//                   className="p-3 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
//                 >
//                   <X className="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
//                 </button>
//               </div>

//               <div className="grid md:grid-cols-2 gap-8">
//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-800 mb-4">Overview</h3>
//                   <p className="text-gray-600 mb-6 leading-relaxed">{details.overview}</p>

//                   <h3 className="text-xl font-semibold text-blue-800 mb-4">Our Process</h3>
//                   <div className="space-y-3">
//                     {details.process?.map((step, index) => (
//                       <motion.div 
//                         key={index} 
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="flex items-center"
//                       >
//                         <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 shadow-md">
//                           {index + 1}
//                         </div>
//                         <span className="text-gray-700">{step}</span>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-800 mb-4">Technologies</h3>
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {details.technologies?.map((tech, index) => (
//                       <motion.span 
//                         key={index} 
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: index * 0.05 }}
//                         className="px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-sm border border-blue-200 hover:shadow-md hover:from-blue-100 hover:to-cyan-100 transition-all duration-300"
//                       >
//                         {tech}
//                       </motion.span>
//                     ))}
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
//                       <Clock className="w-5 h-5 text-blue-500 mr-3" />
//                       <div>
//                         <div className="font-medium text-blue-800">Timeline</div>
//                         <div className="text-blue-600 text-sm">{details.timeline}</div>
//                       </div>
//                     </div>

//                     <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
//                       <h4 className="font-medium text-green-800 mb-2 flex items-center">
//                         <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
//                         Deliverables
//                       </h4>
//                       <div className="space-y-1">
//                         {details.deliverables?.map((item, index) => (
//                           <div key={index} className="text-green-700 text-sm ml-7">• {item}</div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8 pt-6 border-t border-blue-100 flex justify-center">
//                 <button
//                   onClick={handleRequestQuote}
//                   className="w-full max-w-md bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-500 relative overflow-hidden group flex items-center justify-center"
//                 >
//                   <span className="relative z-10">Request Quote</span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default function Services() {
//   const [selectedService, setSelectedService] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const services = [
//     {
//       icon: Code,
//       title: "Web Development",
//       description: "Enterprise-grade web applications built with modern frameworks, optimized for performance, scalability, and user experience.",
//       gradient: "from-blue-500 to-cyan-500",
//       image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&auto=format",
//       features: ["React & Next.js", "Performance Optimized", "Scalable Architecture"],
//       delay: 0
//     },
//     {
//       icon: Smartphone,
//       title: "Mobile Apps",
//       description: "Native and cross-platform mobile solutions delivering exceptional user experiences across iOS and Android platforms.",
//       gradient: "from-cyan-500 to-blue-500",
//       image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&auto=format",
//       features: ["Cross-Platform", "Native Performance", "App Store Ready"],
//       delay: 0.1
//     },
//     {
//       icon: Cloud,
//       title: "Cloud Solutions",
//       description: "Scalable cloud infrastructure design and implementation with automated deployment and comprehensive monitoring.",
//       gradient: "from-blue-500 to-cyan-500",
//       image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&auto=format",
//       features: ["AWS & Azure", "Auto Scaling", "High Availability"],
//       delay: 0.2
//     },
//     {
//       icon: Bot,
//       title: "AI & Automation",
//       description: "Intelligent automation solutions and machine learning implementations to optimize operations and drive efficiency.",
//       gradient: "from-cyan-500 to-blue-500",
//       image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&auto=format",
//       features: ["Machine Learning", "Process Automation", "Intelligent Analytics"],
//       delay: 0.3
//     },
//     {
//       icon: Shield,
//       title: "Cybersecurity",
//       description: "Comprehensive security assessments and implementations to protect digital assets and ensure regulatory compliance.",
//       gradient: "from-blue-500 to-cyan-500",
//       image: "https://images.unsplash.com/contact-1555949963-aa79dcee981c?w=400&h=250&fit=crop&auto=format",
//       features: ["Security Audits", "Compliance", "Threat Protection"],
//       delay: 0.4
//     },
//     {
//       icon: Paintbrush,
//       title: "UI/UX Design",
//       description: "User-centered design solutions backed by research and testing to maximize engagement and conversion rates.",
//       gradient: "from-cyan-500 to-blue-500",
//       image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop&auto=format",
//       features: ["User Research", "Design Systems", "Conversion Optimization"],
//       delay: 0.5
//     },
//     {
//       icon: Lightbulb,
//       title: "Consulting",
//       description: "Strategic technology consulting and digital transformation guidance to accelerate business growth and innovation.",
//       gradient: "from-blue-500 to-cyan-500",
//       image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&auto=format",
//       features: ["Digital Strategy", "Technology Roadmap", "Innovation Planning"],
//       delay: 0.6
//     },
//     {
//       icon: Settings,
//       title: "Digital Marketing",
//       description: "Data-driven marketing strategies and campaigns to boost online presence and drive measurable business growth.",
//       gradient: "from-cyan-500 to-blue-500",
//       image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format",
//       features: ["SEO & SEM", "Social Media Marketing", "Analytics & ROI Tracking"],
//       delay: 0.7
//     }
//   ];

//   const handleLearnMore = (service) => {
//     setSelectedService(service);
//     setModalOpen(true);
//   };

//   const handleRequestQuote = () => {
//     const contactSection = document.getElementById('contact');
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <>
//       <section id="services" className="py-24 bg-gradient-to-br from-blue-50 via-cyan-50/50 to-blue-50 relative overflow-hidden">
//         {/* Enhanced Background Elements */}
//         <div className="absolute inset-0 bg-grid-blue-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.4))] -z-0"></div>
//         <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-delayed"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full filter blur-3xl opacity-30"></div>
        
//         <div className="container mx-auto px-6 relative z-10">
//           {/* Enhanced Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             viewport={{ once: true }}
//             className="text-center mb-20"
//           >
//             <motion.div
//               initial={{ scale: 0, opacity: 0 }}
//               whileInView={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.2, type: "spring", damping: 15 }}
//               viewport={{ once: true }}
//               className="inline-block mb-4"
//             >
//               <span className="text-blue-600 font-semibold text-lg tracking-wide uppercase bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 rounded-full border border-blue-200">Our Expertise</span>
//             </motion.div>
            
//             <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//               Professional
//               <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Services</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//               Comprehensive technology solutions engineered to accelerate your digital transformation 
//               with enterprise-grade quality and proven methodologies.
//             </p>
//           </motion.div>

//           {/* Enhanced Services Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {services.map((service, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: service.delay, ease: "easeOut" }}
//                 viewport={{ once: true }}
//                 className="group cursor-pointer"
//               >
//                 <GlassCard className="rounded-3xl overflow-hidden h-full hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 transform group-hover:scale-[1.03] group-hover:-translate-y-2 relative border-2 hover:border-blue-300/50">
//                   {/* Enhanced Image */}
//                   <div className="relative overflow-hidden">
//                     <img 
//                       src={service.image} 
//                       alt={service.title}
//                       className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-blue-500/10 group-hover:from-blue-900/30"></div>
                    
//                     {/* Enhanced Icon */}
//                     <motion.div 
//                       whileHover={{ rotate: 5, scale: 1.1 }}
//                       transition={{ type: "spring", damping: 15 }}
//                       className={`absolute top-4 right-4 w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/40 transform transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/50`}
//                     >
//                       <service.icon className="w-7 h-7 text-white" />
//                     </motion.div>
//                   </div>

//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
//                       {service.title}
//                     </h3>
                    
//                     <p className="text-gray-600 leading-relaxed mb-4 text-sm group-hover:text-gray-700 transition-colors duration-300">
//                       {service.description}
//                     </p>

//                     {/* Enhanced Features */}
//                     <div className="mb-6 space-y-2">
//                       {service.features.map((feature, featureIndex) => (
//                         <motion.div 
//                           key={featureIndex} 
//                           initial={{ opacity: 0, x: -10 }}
//                           whileInView={{ opacity: 1, x: 0 }}
//                           transition={{ delay: featureIndex * 0.1 }}
//                           className="flex items-center text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
//                         >
//                           <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3 flex-shrink-0 group-hover:shadow-md group-hover:shadow-blue-500/50 transition-all duration-300"></div>
//                           {feature}
//                         </motion.div>
//                       ))}
//                     </div>

//                     {/* Enhanced Learn More Button */}
//                     <div className="transform transition-all duration-500">
//                       <motion.button 
//                         onClick={() => handleLearnMore(service)}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className={`w-full bg-gradient-to-r ${service.gradient} text-white font-semibold py-4 px-4 rounded-2xl transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center group/btn relative overflow-hidden border-2 border-transparent hover:border-white/20`}
//                       >
//                         <span className="relative z-10 flex items-center transition-all duration-300">
//                           Learn More 
//                           <ArrowRight className="w-4 h-4 ml-2 transition-all duration-500 group-hover/btn:translate-x-2 group-hover/btn:scale-110" />
//                         </span>
//                         <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-all duration-500"></div>
//                         <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//                       </motion.button>
//                     </div>
//                   </div>

//                   {/* Enhanced Hover Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"></div>
//                 </GlassCard>
//               </motion.div>
//             ))}
//           </div>

//           {/* Enhanced CTA */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="text-center mt-20"
//           >
//             <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-500/30 border border-blue-400/20">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
//               <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full filter blur-3xl opacity-50"></div>
//               <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl opacity-50"></div>
//               <div className="relative z-10">
//                 <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
//                 <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
//                   Partner with our expert team to accelerate your digital transformation and achieve measurable results.
//                 </p>
//                 <div className="flex justify-center">
//                   <button
//                     onClick={handleRequestQuote}
//                     className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-2xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-500 border-2 border-transparent hover:border-blue-200"
//                   >
//                     Request Quote
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Service Details Modal */}
//       <ServiceModal 
//         service={selectedService} 
//         isOpen={modalOpen} 
//         onClose={() => setModalOpen(false)} 
//       />

//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
//           33% { transform: translate(30px, -30px) scale(1.05) rotate(1deg); }
//           66% { transform: translate(-20px, 20px) scale(0.95) rotate(-1deg); }
//         }
//         @keyframes float-delayed {
//           0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
//           33% { transform: translate(-30px, 30px) scale(1.05) rotate(-1deg); }
//           66% { transform: translate(20px, -20px) scale(0.95) rotate(1deg); }
//         }
//         .animate-float {
//           animation: float 15s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float-delayed 15s ease-in-out infinite;
//           animation-delay: 5s;
//         }
//         .bg-grid-blue-100 {
//           background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(59 130 246 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
//         }
//       `}</style>
//     </>
//   );
// }