// import React, { useState } from "react";
// import { Zap, Linkedin, Twitter, Github, Dribbble, Youtube, ArrowRight } from "lucide-react";

// export default function Footer() {
//   const [email, setEmail] = useState("");

//   const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (email) {
//       alert('Thank you for subscribing to our newsletter!');
//       setEmail("");
//     }
//   };

//   return (
//     <footer className="bg-gray-900 text-white py-16">
//       <div className="container mx-auto px-6">
//         <div className="grid md:grid-cols-4 gap-8 mb-12">
//           {/* Company Info */}
//           <div className="animate-fade-in">
//             <div className="flex items-center space-x-3 mb-4">
//               {/* Logo Placeholder */}
//               <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
//                 AIRAVATA TECHNOLOGIES
//               </span>
//             </div>
//             <p className="text-gray-400 mb-6 leading-relaxed">
//               Innovating tomorrow's technology solutions today. Transforming businesses through digital excellence.
//             </p>
//             <div className="flex space-x-4">
//               {[
//                 { Icon: Linkedin, href: "#", label: "LinkedIn" },
//                 { Icon: Twitter, href: "#", label: "Twitter" },
//                 { Icon: Youtube, href: "#", label: "YouTube" },
//                 { Icon: Github, href: "#", label: "GitHub" },
//                 { Icon: Dribbble, href: "#", label: "Dribbble" }
//               ].map(({ Icon, href, label }, index) => (
//                 <a
//                   key={index}
//                   href={href}
//                   aria-label={label}
//                   className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-3"
//                 >
//                   <Icon className="w-5 h-5" />
//                 </a>
//               ))}
//             </div>
//           </div>
          
//           {/* Services */}
//           <div className="animate-fade-in-delay-1">
//             <h3 className="text-xl font-bold mb-4 text-white">Services</h3>
//             <ul className="space-y-3 text-gray-400">
//               {[
//                 'Web Development',
//                 'Mobile Apps',
//                 'Cloud Solutions',
//                 'AI & Automation',
//                 'Cybersecurity'
//               ].map((service, index) => (
//                 <li key={index}>
//                   <a 
//                     href="#" 
//                     className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
//                   >
//                     {service}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           {/* Company */}
//           <div className="animate-fade-in-delay-2">
//             <h3 className="text-xl font-bold mb-4 text-white">Company</h3>
//             <ul className="space-y-3 text-gray-400">
//               {[
//                 'About Us',
//                 'Careers',
//                 'Blog',
//                 'Press',
//                 'Partners'
//               ].map((item, index) => (
//                 <li key={index}>
//                   <a 
//                     href="#" 
//                     className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
//                   >
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           {/* Newsletter */}
//           <div className="animate-fade-in-delay-3">
//             <h3 className="text-xl font-bold mb-4 text-white">Newsletter</h3>
//             <p className="text-gray-400 mb-4">
//               Stay updated with our latest insights and innovations.
//             </p>
//             <form onSubmit={handleNewsletterSubmit} className="flex">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </form>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-800 pt-8 text-center text-gray-400 animate-fade-in-delay-4">
//           <p>&copy; 2025 Airavata Technologies. All rights reserved. | Privacy Policy | Terms of Service</p>
//         </div>
//       </div>
      
//       <style dangerouslySetInnerHTML={{
//         __html: `
//           .animate-fade-in {
//             animation: fadeIn 0.6s ease-out;
//           }
//           .animate-fade-in-delay-1 {
//             animation: fadeIn 0.6s ease-out 0.1s both;
//           }
//           .animate-fade-in-delay-2 {
//             animation: fadeIn 0.6s ease-out 0.2s both;
//           }
//           .animate-fade-in-delay-3 {
//             animation: fadeIn 0.6s ease-out 0.3s both;
//           }
//           .animate-fade-in-delay-4 {
//             animation: fadeIn 0.6s ease-out 0.4s both;
//           }
          
//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//               transform: translateY(20px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `
//       }} />
//     </footer>
//   );
// }
import React, { useState } from "react";
import { Zap, Linkedin, Twitter, Github, Dribbble, Youtube, ArrowRight, Target, Instagram } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing to our newsletter!');
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              {/* Logo Placeholder */}
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                AIRAVATA TECHNOLOGIES
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Innovating tomorrow's technology solutions today. Transforming businesses through digital excellence.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/company/airavatatechnologies/posts/?feedView=all", target: "_blank", label: "LinkedIn" },
                { Icon: Instagram, href: "https://www.instagram.com", target: "_blank", label: "Instagram" },
                { Icon: Youtube, href: "https://www.youtube.com/@AIRAVATATECHNOLOGIES", target: "_blank", label: "YouTube" },
                { Icon: Github, href: "https://www.github.com", target: "_blank", label: "GitHub" },
                { Icon: Twitter, href: "https://www.twitter.com", target: "_blank", label: "Twitter" }
              ].map(({ Icon, href, label, target }, index) => (
                <a
                  key={index}
                  href={href}
                  target={target}
                  rel={target === "_blank" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-3"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="animate-fade-in-delay-1">
            <h3 className="text-xl font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-3 text-gray-400">
              {[
                'Web Development',
                'Mobile Apps',
                'Cloud Solutions',
                'AI & Automation',
                'Cybersecurity'
              ].map((service, index) => (
                <li key={index}>
                  <a 
                    href="#services" 
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="animate-fade-in-delay-2">
            <h3 className="text-xl font-bold mb-4 text-white">Company</h3>
            <ul className="space-y-3 text-gray-400">
              {[
                'About Us',
                'Careers',
                'Blog',
                'Press',
                'Partners'
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-fade-in-delay-3">
            <h3 className="text-xl font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest insights and innovations.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 animate-fade-in-delay-4">
          <p>&copy; 2025 Airavata Technologies. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
          }
          .animate-fade-in-delay-1 {
            animation: fadeIn 0.6s ease-out 0.1s both;
          }
          .animate-fade-in-delay-2 {
            animation: fadeIn 0.6s ease-out 0.2s both;
          }
          .animate-fade-in-delay-3 {
            animation: fadeIn 0.6s ease-out 0.3s both;
          }
          .animate-fade-in-delay-4 {
            animation: fadeIn 0.6s ease-out 0.4s both;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </footer>
  );
}