import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useLocation } from "wouter";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [location, setLocation] = useLocation();

  // Scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // After navigation, check if we need to scroll
  useEffect(() => {
    if (sessionStorage.getItem("scrollTarget")) {
      const target = sessionStorage.getItem("scrollTarget")!;
      sessionStorage.removeItem("scrollTarget");
      setTimeout(() => {
        scrollToSection(target);
      }, 50); // small delay so DOM is ready
    }
  }, [location]);

  // Scroll detection for navbar hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setShowNavbar(currentScrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (item: { label: string; id: string; isPage?: boolean; path?: string }) => {
    if (item.isPage && item.path) {
      // Page navigation
      setLocation(item.path);
      setIsMobileMenuOpen(false);
    } else {
      // Section navigation
      if (location !== "/") {
        // Mark target section and go to home
        sessionStorage.setItem("scrollTarget", item.id);
        sessionStorage.setItem("visited", "true"); // prevents loader replay
        setLocation("/");
      } else {
        scrollToSection(item.id);
      }
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Industries", id: "industries" },
    { label: "Solutions", id: "solutions" },
    { label: "Services", id: "services" },
    { label: "Products", id: "projects" },
    { label: "Portfolio", id: "portfolio", isPage: true, path: "/portfolio" },
    { label: "Digital Marketing", id: "digital-marketing", isPage: true, path: "/projects/digital-marketing" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <style>
        {`@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");`}
      </style>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          showNavbar ? "bg-transparent" : ""
        } ${scrollY > 50 ? "glass-effect shadow-lg" : ""}`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer h-full"
              onClick={() => handleNavigation({ label: "Home", id: "home" })}
            >
              <span
                className="text-xs sm:text-sm md:text-base lg:text-xl text-black whitespace-nowrap"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "0.3em",
                }}
              >
                AIRAVATA TECHNOLOGIES
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavigation(item)}
                  className="relative text-black hover:text-blue-600 transition-colors duration-300 font-medium text-sm lg:text-base py-2 px-1 group whitespace-nowrap"
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 text-black hover:text-blue-600 ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-2 sm:mt-4 bg-white/90 backdrop-blur-md rounded-lg p-4 sm:p-6 shadow-xl"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className="block w-full text-left py-2 sm:py-3 text-black hover:text-blue-600 transition-colors duration-300 text-base sm:text-lg font-medium border-b border-black/10 last:border-b-0"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  );
}
