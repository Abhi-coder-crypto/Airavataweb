import React, { useState, useEffect } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import Projects from "../components/sections/projects2";

const Portfolio: React.FC = () => {
  const [counters, setCounters] = useState({ projects: 0, products: 0, clients: 0 });

  useEffect(() => {
    const targets = { projects: 10, products: 5, clients: 20 };
    const duration = 2000; // total animation time (2s)
    const steps = 60; // number of updates (~60fps)
    const stepTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCounters({
        projects: Math.min(Math.round((targets.projects / steps) * currentStep), targets.projects),
        products: Math.min(Math.round((targets.products / steps) * currentStep), targets.products),
        clients: Math.min(Math.round((targets.clients / steps) * currentStep), targets.clients),
      });
      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-r from-[#578ACB] to-[#74B7F4]">
        <div className="max-w-7xl mx-auto relative text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">Our Portfolio</h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the innovative solutions we've crafted for our clients.
            <span className="font-semibold text-white"> Airavata Technologies</span> transforms
            ideas into digital excellence.
          </p>

          {/* ✅ Auto-Counting Stats */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-4xl font-bold">{counters.projects}+</h3>
              <p className="text-lg">Projects Completed</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-4xl font-bold">{counters.products}+</h3>
              <p className="text-lg">Products</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-4xl font-bold">{counters.clients}+</h3>
              <p className="text-lg">Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      <Projects />

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-600 to-blue-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Let's transform your ideas into digital excellence together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-sky-600 font-semibold rounded-full hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Get Started Today
              <ChevronRight size={20} />
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-sky-600 transform hover:scale-105 transition-all duration-300">
              View More Projects
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
