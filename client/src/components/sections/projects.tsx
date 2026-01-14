import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Play, Github, Globe } from "lucide-react";
import { Button } from "../ui/button";

// Enhanced ProjectCard component with video support
function ProjectCard({ title, description, image, tags, videoUrl, onViewDetails }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative group">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover object-top cursor-pointer"
          onClick={() => onViewDetails()}
        />
        {videoUrl && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-12 h-12 text-white drop-shadow-lg" />
          </div>
        )}
      </div>

      <div className="p-6 h-64 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-sm rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={onViewDetails}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center mt-auto"
        >
          View Details
          <ExternalLink className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}

// Image Zoom Modal
function ImageZoomModal({ imageSrc, alt, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-[90vw] max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageSrc}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Project Details Modal
function ProjectDetailsModal({ project, isOpen, onClose }) {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);

  if (!project) return null;

  const handleImageClick = (imageSrc, alt) => {
    setZoomedImage({ src: imageSrc, alt });
    setIsImageZoomOpen(true);
  };

  const handleCloseImageZoom = () => {
    setIsImageZoomOpen(false);
    setZoomedImage(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{project.title}</h2>
              <button
                onClick={onClose}
                className="border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Video Section */}
              {project.videoUrl && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Project Demo</h3>
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={project.videoUrl}
                      title={`${project.title} Demo`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Project Images Gallery */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Project Gallery</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.images.map((img, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                      onClick={() => handleImageClick(img, `${project.title} screenshot ${index + 1}`)}
                    >
                      <img
                        src={img}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-48 object-cover object-top hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Brief Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">About This Project</h3>
                <p className="text-gray-600 leading-relaxed">{project.briefDescription}</p>
              </div>

              {/* Technologies Used */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project Links */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg flex items-center hover:shadow-lg transition-all">
                      <Globe className="w-4 h-4 mr-2" />
                      Live Demo
                    </button>
                  )}
                  {project.githubUrl && (
                    <button className="border border-gray-300 px-6 py-2 rounded-lg flex items-center hover:bg-gray-100 transition-colors">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Image Zoom Modal */}
          <ImageZoomModal
            imageSrc={zoomedImage?.src}
            alt={zoomedImage?.alt}
            isOpen={isImageZoomOpen}
            onClose={handleCloseImageZoom}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'ai', label: 'AI' }
  ];

  const projects = [
    {
      id: 1,
      title: "Mauli Car World - Automobile CRM System",
      description: "Complete Automobile CRM for Customer, Inventory, and Staff Management",
      briefDescription: "Mauli Car World is a comprehensive automobile dealership CRM system designed to streamline customer management, inventory tracking, and staff operations. The platform provides role-based access for different stakeholders including Admin, Manager, Inventory Manager, Sales Executive, HR Manager, and Service Staff. It features real-time analytics, customer relationship tracking, inventory management, and business insights through comprehensive dashboards.",
      image: "/images/mauli_thumbnail.jpg",
      images: [
        "/images/gallery1.jpg",
        "/images/gallery2.jpg",
        "/images/gallery3.jpg",
        "/images/gallery4.jpg"
      ],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS", "CRM"],
      categories: ["web"],
      videoUrl: "",
      features: [
        "Multi-Role Access Control - Admin, Manager, Inventory Manager, Sales Executive, HR Manager, Service Staff",
        "Secure Authentication - Email and OTP verification system for secure login",
        "Customer Management - Register, track, and manage customer information and purchase history",
        "Inventory Management - Real-time inventory tracking, stock levels, and product categories",
        "Staff Management - Employee profiles, attendance, tasks, leaves, and performance tracking",
        "Analytics & Reports - Comprehensive dashboards with sales trends, customer growth, service status, and revenue metrics",
        "Branch Management - Support for multiple dealership locations",
        "Multi-Department Coordination - Sales, Service, HR, and management workflows"
      ],
      liveUrl: "https://example.com"
    },
    {
      id: 2,
      title: "Professional Restaurant Website Design Prototype",
      description: "Enhancing Online Presence and Customer Engagement for Restaurants",
      briefDescription: "This project is a modern, fully responsive restaurant website prototype developed using React.js, aimed at enhancing the online presence of restaurants, cafés, and food businesses. The design emphasizes clean aesthetics, intuitive navigation, and mobile-first responsiveness. It provides a solid foundation for real-world deployment by combining engaging visuals with a modular, scalable code structure.",
      image: "/images/2.1.png",
      images: [
        "/images/2.1.png",
        "/images/2.2.png",
        "/images/2.3.png",
        "/images/2.4.png"
      ],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      categories: ["web"],
      videoUrl: "https://www.youtube.com/embed/9hA-mSbXZh4",
      features: [
        "Home Page with full-screen banner and sticky navigation with smooth scrolling",
        "Menu Section with categorized items and reusable React components for dynamic rendering",
        "About Us Section with story-driven content and chef profiles with photos",
        "Contact & Reservation Section with responsive forms and embedded Google Map",
        "Mobile-first responsive design optimized for all devices",
        "Future-ready architecture for eCommerce integration and CMS"
      ],
      liveUrl: "https://example.com"
    },
    {
      id: 3,
      title: "Digital QR Menu",
      description: "A QR-based digital menu system where users can scan a QR code to instantly view the restaurant's menu on their devices",
      briefDescription: "Digital QR Menu is an innovative QR-code-based restaurant menu system that eliminates the need for physical menus. Customers simply scan a QR code at their table to access a digital menu on their smartphone. The system streamlines the dining experience, reduces contact surfaces, and provides restaurants with real-time menu management and customer analytics capabilities.",
      image: "/images/qr_menu_thumbnail.jpg",
      images: [
        "/images/qr_menu_thumbnail.jpg",
        "/images/qr_menu_thumbnail.jpg",
        "/images/qr_menu_thumbnail.jpg",
        "/images/qr_menu_thumbnail.jpg"
      ],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      categories: ["web"],
      videoUrl: "",
      features: [
        "QR Code Scanning - Customers scan table QR codes to access digital menu instantly",
        "Digital Menu Display - Beautiful, interactive menu with food images, descriptions, and pricing",
        "Real-time Menu Updates - Restaurant staff can update menu items, prices, and availability instantly",
        "Order Management - Seamless integration for customers to place orders directly from menu",
        "Restaurant Analytics - Track popular dishes, customer preferences, and sales data",
        "Multi-Language Support - Support for multiple languages to serve diverse customer base",
        "Mobile-Responsive Design - Optimized for all devices and screen sizes",
        "Restaurant Dashboard - Complete management interface for menu, orders, and analytics"
      ],
      liveUrl: "https://example.com"
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.categories.includes(activeFilter));

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing our latest innovations and successful client partnerships.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-white/70 backdrop-blur-sm hover:bg-white/90 border border-gray-200'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              layout
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                videoUrl={project.videoUrl}
                onViewDetails={() => handleViewDetails(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}