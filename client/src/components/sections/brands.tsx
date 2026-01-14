import React from 'react';

const Brands: React.FC = () => {
  // Array of logo configurations - adjust width and height for each logo individually
  const logoConfigs = [
    { src: '/images/logos/logo1.png', width: 200, height: 90 },   // Logo 1
    { src: '/images/logos/logo2.png', width: 200, height: 90 },   // Logo 2
    { src: '/images/logos/logo3.png', width: 200, height: 90 },   // Logo 3
    { src: '/images/logos/logo4.png', width: 200, height: 90 },   // Logo 4
    { src: '/images/logos/logo5.png', width: 200, height: 90 },   // Logo 5
    { src: '/images/logos/logo6.png', width: 200, height: 210 },  // Logo 6 - Larger
    { src: '/images/logos/logo7.png', width: 200, height: 150 },  // Logo 7 - Larger
  ];

  return (
    <section className="brands-carousel">
      <div className="marquee-container">
        <div className="marquee-content">
          {/* First set of logos */}
          {logoConfigs.map((logo, index) => (
            <div key={`logo-1-${index}`} className="logo-item">
              <img
                src={logo.src}
                alt={`Brand ${index + 1}`}
                className="logo-image"
                style={{
                  width: `${logo.width}px`,
                  height: `${logo.height}px`
                }}
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logoConfigs.map((logo, index) => (
            <div key={`logo-2-${index}`} className="logo-item">
              <img
                src={logo.src}
                alt={`Brand ${index + 1}`}
                className="logo-image"
                style={{
                  width: `${logo.width}px`,
                  height: `${logo.height}px`
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brands-carousel {
          background-color: #ffffff;
          padding: 60px 0;
          overflow: hidden;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
        }

        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .marquee-content {
          display: flex;
          align-items: center;
          animation: marquee 30s linear infinite;
          width: fit-content;
        }

        .logo-item {
          flex-shrink: 0;
          margin: 0 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 120px;
          min-width: 180px;
        }

        .logo-image {
          object-fit: contain;
          object-position: center;
          transition: all 0.3s ease;
        }

        .logo-image:hover {
          transform: scale(1.05);
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Pause animation on hover */
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .brands-carousel {
            padding: 40px 0;
          }
          
          .logo-item {
            margin: 0 25px;
            min-width: 150px;
            height: 100px;
          }
          
          /* Scale down logos for tablets - adjust multiplier as needed */
          .logo-image {
            transform: scale(0.85);
          }
          
          .marquee-content {
            animation-duration: 20s;
          }
        }

        @media (max-width: 480px) {
          .logo-item {
            margin: 0 20px;
            min-width: 120px;
            height: 80px;
          }
          
          /* Scale down logos for mobile - adjust multiplier as needed */
          .logo-image {
            transform: scale(0.7);
          }
        }
      `}</style>
    </section>
  );
};

export default Brands;