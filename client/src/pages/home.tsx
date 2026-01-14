import { useEffect, useState } from "react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import Hero from "../components/sections/hero";
import About from "../components/sections/about";
import Services from "../components/sections/services";
import Projects from "../components/sections/projects";
import { useScrollProgress } from "../hooks/use-scroll-progress";

export default function Home() {
  const scrollProgress = useScrollProgress();
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    setShowPreloader(false);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      {/* <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 w-12 h-12 gradient-bg text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
          scrollProgress > 20
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <svg
          className="w-5 h-5 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button> */}
      {/* Scroll to Top Button */}
<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className={`fixed bottom-8 right-8 w-12 h-12 gradient-bg text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 ${
    scrollProgress > 20 ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
>
  <svg
    className="w-5 h-5 mx-auto"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  </svg>
</button>

    </div>
  );
}
