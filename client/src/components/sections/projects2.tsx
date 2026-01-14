import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Play, Github, Globe } from "lucide-react";

// Button component (since we can't import from shadcn)
function Button({ children, onClick, variant = "default", size = "default", className = "", ...props }) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Enhanced ProjectCard component with video support and fixed height
function ProjectCard({ title, description, image, tags, videoUrl, onViewDetails }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
      <div className="relative group">
        <div className="h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top cursor-pointer transition-transform duration-300 group-hover:scale-105"
            onClick={() => onViewDetails()}
          />
        </div>
        {videoUrl && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-12 h-12 text-white drop-shadow-lg" />
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-3 h-14 flex items-center leading-tight">{title}</h3>
        <p className="text-gray-600 mb-3 flex-1 line-clamp-3 leading-relaxed text-sm">{description}</p>

        <div className="flex flex-wrap gap-2 mb-3 min-h-[60px]">
          {tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-[#578ACB]/20 to-[#74B7F4]/20 text-[#578ACB] text-sm rounded-lg font-medium border border-[#578ACB]/30"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
              +{tags.length - 4} more
            </span>
          )}
        </div>

        <button
          onClick={onViewDetails}
          className="w-full bg-gradient-to-r from-[#578ACB] to-[#74B7F4] text-white font-semibold py-2.5 rounded-lg hover:shadow-lg hover:from-[#4A7BB8] hover:to-[#65A8E8] transition-all duration-300 flex items-center justify-center mt-auto"
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
            <div className="sticky top-0 bg-gradient-to-r from-[#578ACB] to-[#74B7F4] p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              <button
                onClick={onClose}
                className="bg-white/20 border border-white/30 rounded-full p-2 hover:bg-white/30 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Video Section */}
              {project.videoUrl && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-[#578ACB]">Project Demo</h3>
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg border-2 border-[#578ACB]/20">
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
                <h3 className="text-lg font-semibold mb-4 text-[#578ACB]">Project Gallery</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.images.map((img, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow border-2 border-[#578ACB]/10 hover:border-[#578ACB]/30"
                      onClick={() => handleImageClick(img, `${project.title} screenshot ${index + 1}`)}
                    >
                      <img
                        src={img}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-64 object-cover object-top hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Brief Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-[#578ACB]">About This Project</h3>
                <p className="text-gray-600 leading-relaxed">{project.briefDescription}</p>
              </div>

              {/* Technologies Used */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-[#578ACB]">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-[#578ACB]/20 to-[#74B7F4]/20 text-[#578ACB] rounded-lg font-medium border border-[#578ACB]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-[#578ACB]">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-gradient-to-r from-[#578ACB] to-[#74B7F4] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project Links */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-[#578ACB] to-[#74B7F4] text-white px-6 py-2 rounded-lg flex items-center hover:shadow-lg hover:from-[#4A7BB8] hover:to-[#65A8E8] transition-all duration-300"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Live Deployment
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-[#578ACB]/30 text-[#578ACB] px-6 py-2 rounded-lg flex items-center hover:bg-[#578ACB]/5 hover:border-[#578ACB]/50 transition-all duration-300"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
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
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'ai', label: 'AI' }
  ];

  const projects = [
    {
      id: 10,
      title: "Prototype for Real-Time Hospital-Blood Bank Coordination Platform",
      description: "A Smart System for Efficient Blood Request Management and Rapid Emergency Response",
      briefDescription: "This web-based healthcare logistics platform bridges the gap between hospitals and blood banks by providing a real-time blood request, delivery, and coordination system. The system ensures swift and transparent communication from blood request initiation to final delivery or return, improving emergency response and patient care outcomes.",
      image: "images/1.1.png",
      images: [
        "images/1.1.png",
        "images/1.2.png",
        "images/1.3.png",
        "images/1.4.png"
      ],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      categories: ["web"],
      videoUrl: "https://www.youtube.com/embed/cfXZBSW-RSI",
      features: [
        "Role-Based Dashboards - Custom interfaces for Hospitals, Blood Banks, Drivers, and Admins",
        "Secure login and real-time dashboard updates based on role",
        "Hospital Panel Features: Initiate Blood Request with blood group, quantity, urgency level",
        "Blood Bank management system with inventory tracking",
        "Real-time delivery tracking and status updates",
        "Emergency response prioritization system"
      ],
      liveUrl: "https://example.com"
    },
    {
      id: 5,
      title: "Professional Restaurant Website Design Prototype",
      description: "Enhancing Online Presence and Customer Engagement for Restaurants",
      briefDescription: "This project is a modern, fully responsive restaurant website prototype developed using React.js, aimed at enhancing the online presence of restaurants, cafés, and food businesses. The design emphasizes clean aesthetics, intuitive navigation, and mobile-first responsiveness. It provides a solid foundation for real-world deployment by combining engaging visuals with a modular, scalable code structure.",
      image: "images/2.1.png",
      images: [
        "images/2.1.png",
        "images/2.2.png",
        "images/2.3.png",
        "images/2.4.png"
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
      liveUrl: "https://restaurant-website-deploy-7emo.vercel.app"
    },
    {
      id: 11,
      title: "Smart QR-Based Restaurant Menu and Management App",
      description: "Digitizing Dining Experiences with Contactless Menus and Streamlined Management",
      briefDescription: "This application is a digital restaurant menu system that streamlines the dining experience for customers and simplifies menu and restaurant management for owners. It supports two primary user roles: Customers and Restaurant Owners, with a third Admin/Product Owner Panel for overseeing multiple restaurants across the platform.",
      image: "images/3.1.png",
      images: [
        "images/3.1.png",
        "images/3.2.png",
        "images/3.3.png",
        "images/3.4.png"
      ],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      categories: ["web"],
      videoUrl: "https://www.youtube.com/embed/DzWkxU0Y1SY",
      features: [
        "Customer arrives and sits at table with QR code scanning capability",
        "Digital menu viewing and seamless order placement system",
        "Real-time order display on Owner Dashboard and Kitchen Display",
        "Customer service features: waiter calling and bill request functionality",
        "Owner analytics dashboard with daily orders, revenue, and popular dishes tracking",
        "Multi-restaurant management through Admin/Product Owner Panel"
      ],
      liveUrl: "https://example.com"
    },
    {
      id: 1,
      title: "eclean.live",
      description: "AI based SaaS platform for hygeine and cleaning",
      briefDescription: "We developed eClean.live for Nityam Singapore Pte. Ltd — a next-generation, AI-powered SaaS platform that transforms facility management for corporate offices, hospitals, government bodies, large industrial plants, and more. The platform delivers real-time monitoring, predictive analytics, and workflow automation, enabling clients to maintain the highest hygiene standards, optimize resources, and ensure compliance across multiple locations with complete transparency and efficiency.",
      image: "images/4.1.png",
      images: [
        "images/4.2.png",
        "images/4.3.png",
        "images/4.4.png",
        "images/4.5.png"
      ],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      categories: ["web", "ai"],
      videoUrl: "",
      features: [
        "AI-powered facility management for optimized hygiene and cleaning operations",
        "Real-time monitoring of cleanliness status and task completion",
        "Predictive maintenance and scheduling based on data insights",
        "Workflow automation to streamline cleaning and inspection processes",
        "Multi-location management with centralized control",
        "Comprehensive analytics dashboard for performance and compliance tracking",
        "Seamless integration with existing enterprise systems",
        "Cloud-based access for anytime, anywhere management"
      ],
      liveUrl: "https://eclean.live"
    },
    {
      id: 2,
      title: "Nikzone Fashion",
      description: "Premium men's fashion eCommerce platform",
      briefDescription: "Nikzone Fashion is an online store dedicated to the modern gentleman, offering premium-quality clothing that blends style, comfort, and sophistication. From timeless classics to trendy designs, our curated collections cater to every occasion with exceptional craftsmanship and attention to detail.",
      image: "images/5.1.png",
      images: [
        "images/5.2.png",
        "images/5.3.png",
        "images/5.4.png",
        "images/5.5.png"
      ],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      categories: ["web"],
      videoUrl: "",
      features: [
        "Modern and minimalistic UI with smooth navigation",
        "Category-wise product browsing for shirts, t-shirts, jackets, bottoms, and accessories",
        "Responsive design optimized for mobile and desktop",
        "Search functionality to quickly find products",
        "Detailed product pages with high-quality images",
        "Secure checkout process",
        "Fast-loading pages hosted on Vercel",
        "Curated fashion collection for men, kids, and seasonal arrivals"
      ],
      liveUrl: "https://nikzone-clothing.vercel.app"
    },
    {
      id: 3,
      title: "Vora",
      description: "Electrical and energy solutions provider",
      briefDescription: "Vora delivers future-ready electrical and energy solutions with a focus on integrity, innovation, and legacy. Specializing in turnkey projects, emergency support, and energy cost reduction, Vora ensures reliable, efficient, and sustainable solutions for clients across industries.",
      image: "images/6.1.png",
      images: [
        "images/6.2.png",
        "images/6.3.png",
        "images/6.4.png",
        "images/6.5.png"
      ],
      tags: ["React", "Node.js", "Tailwind CSS", "Express JS", "MongoDB"],
      categories: ["web"],
      videoUrl: "",
      features: [
        "Turnkey electrical and energy solutions",
        "24/7 emergency support services",
        "Energy cost reduction strategies",
        "Modern, responsive website design",
        "Clear service categorization for easy navigation",
        "Strong brand emphasis on integrity, innovation, and legacy",
        "User-friendly contact and inquiry system",
        "Optimized performance for fast loading"
      ],
      liveUrl: "https://voraweb.netlify.app"
    },
    {
      id: 7,
      title: "HOC Cafe",
      description: "Healthy, fast, and fresh dining experience",
      briefDescription: "HOC Cafe blends nutritious ingredients with quick service, offering a perfect fusion of health and convenience. With over 50 fresh recipes, minimal wait times, and a customer rating of 4.9/5, we make every meal both delicious and wholesome for health-conscious diners.",
      image: "images/7.1.png",
      images: [
        "images/7.2.png",
        "images/7.3.png",
        "images/7.4.png",
        "images/7.5.png"
      ],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      categories: ["web"],
      videoUrl: "",
      features: [
        "Over 50 healthy and delicious recipes",
        "Average preparation time of just 5 minutes",
        "High customer satisfaction with a 4.9/5 rating",
        "Responsive and modern website design",
        "Easy navigation to menu, gallery, and contact sections",
        "Integrated online ordering system",
        "Showcases freshness and healthy living focus",
        "Strong brand identity with vibrant visuals"
      ],
      liveUrl: "https://hoc-cafe.netlify.app"
    },
    {
      id: 9,
      title: "Sai Krishna Website",
      description: "A vegetarian restaurant website with menu display, online ordering, and reservation features.",
      briefDescription: "Sai Krishna is a modern vegetarian restaurant website designed to showcase authentic Indian vegetarian cuisine, provide an easy online ordering experience, and connect food lovers with wholesome, freshly prepared meals in a welcoming digital space.",
      image: "images/9.1.png",
      images: [
        "images/9.2.png",
        "images/9.3.png",
        "images/9.4.png",
        "images/9.5.png"
      ],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      categories: ["web"],
      videoUrl: "",
      features: [
        "Interactive digital menu with vibrant food images",
        "Online table reservation system",
        "Food ordering and home delivery integration",
        "Daily specials and chef's recommendations",
        "Customer reviews and feedback section",
        "Mobile-friendly and responsive design",
        "SEO optimized for local discovery",
        "Secure payment gateway support"
      ],
      liveUrl: "https://tempsaikrishna.netlify.app/"
    },
    {
      id: 4,
      title: "Mings Chinese Cuisine",
      description: "A Chinese restaurant website with menu showcase, online reservations, and ordering features.",
      briefDescription: "Mings Chinese Cuisine website highlights authentic Chinese flavors, provides an easy online ordering and reservation experience, and helps customers connect with the restaurant for a delightful dining journey.",
      image: "images/10.1.png",
      images: [
        "images/10.2.png",
        "images/10.3.png",
        "images/10.4.png",
        "images/10.5.png"
      ],
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      categories: ["web"],
      videoUrl: "",
      features: [
        "Digital menu with authentic Chinese dishes",
        "Online table reservation system",
        "Food ordering and delivery integration",
        "Chef's specials and seasonal offers",
        "Customer reviews and testimonials",
        "Mobile-friendly responsive design",
        "SEO optimized for local restaurant discovery",
        "Secure online payments"
      ],
      liveUrl: "https://mingschinesecuisine.in/"
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
    <section id="projects" className="py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <h2 className="text-5xl font-bold bg-gradient-to-r from-[#578ACB] to-[#74B7F4] bg-clip-text text-transparent mb-6">Our Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing our latest innovations and successful client partnerships.
          </p> */}
        </motion.div>

        {/* Filter Buttons - Updated to Blue Theme */}
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
                ? 'bg-gradient-to-r from-[#578ACB] to-[#74B7F4] text-white shadow-lg transform scale-105'
                : 'bg-white/70 backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#578ACB]/10 hover:to-[#74B7F4]/10 border-2 border-[#578ACB]/30 text-[#578ACB] hover:text-[#578ACB] hover:border-[#578ACB]/50'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid - Fixed Equal Heights */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects
            .slice() // create a copy so original array isn't mutated
            .sort((a, b) => a.id - b.id) // sort by id ascending
            .map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                layout
                className="h-full" // Ensure motion.div takes full height
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