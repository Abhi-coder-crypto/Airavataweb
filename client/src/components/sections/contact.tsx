import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Facebook, ArrowRight, Send, Clock, Award, Users, CheckCircle, X, AlertCircle } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailJSLoaded, setEmailJSLoaded] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', title: '', message: '' });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_a2es84b';
  const EMAILJS_TEMPLATE_ID = 'template_yx2mt45';
  const EMAILJS_PUBLIC_KEY = 'iQkaSHYtpkP-gnXXt';

  // Initialize EmailJS with better loading
  useEffect(() => {
    const loadEmailJS = async () => {
      try {
        // Check if EmailJS is already loaded
        if (window.emailjs) {
          window.emailjs.init(EMAILJS_PUBLIC_KEY);
          setEmailJSLoaded(true);
          return;
        }

        // Create and load the script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.async = true;

        script.onload = () => {
          if (window.emailjs) {
            window.emailjs.init(EMAILJS_PUBLIC_KEY);
            setEmailJSLoaded(true);
            console.log('EmailJS loaded successfully');
          } else {
            console.error('EmailJS failed to load properly');
          }
        };

        script.onerror = (error) => {
          console.error('Failed to load EmailJS script:', error);
          setEmailJSLoaded(false);
        };

        document.head.appendChild(script);

        // Cleanup function
        return () => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
        };
      } catch (error) {
        console.error('Error loading EmailJS:', error);
        setEmailJSLoaded(false);
      }
    };

    loadEmailJS();
  }, []);

  const showPopup = (type, title, message) => {
    setPopup({ show: true, type, title, message });
  };

  const hidePopup = () => {
    setPopup({ show: false, type: '', title: '', message: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      showPopup('error', 'Missing Information', 'Please fill in all required fields (First Name, Last Name, Email, and Message).');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showPopup('error', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!emailJSLoaded) {
      showPopup('error', 'Service Loading', 'Email service is still loading. Please wait a moment and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Double-check if EmailJS is available
      if (!window.emailjs) {
        throw new Error('EmailJS is not available');
      }

      // Prepare email template parameters - simplified and consistent
      const templateParams = {
        // Basic info that matches your HTML template exactly
        full_name: `${formData.firstName} ${formData.lastName}`,
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,

        // Contact details - handle empty values properly
        phone: formData.phone || '',
        service: formData.service || '',
        message: formData.message,

        // Email routing
        reply_to: formData.email,
        to_name: 'Airavata Technologies Team',

        // Date formatting
        contact_date: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata'
        })
      };

      console.log('Sending email with template params:', templateParams);

      // Send email using EmailJS
      const response = await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('EmailJS response:', response);

      if (response.status === 200) {
        showPopup('success', 'Message Sent Successfully!', "Thank you for reaching out! We've received your message and will get back to you within 24 hours.");

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error(`Failed to send message. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);

      // More specific error messages
      let errorTitle = "Error Sending Message";
      let errorMessage = "Sorry, there was an error sending your message. ";

      if (error.message === 'EmailJS is not available') {
        errorTitle = "Service Unavailable";
        errorMessage = "Email service is not available. Please try refreshing the page or contact us directly.";
      } else if (error.text) {
        if (error.text.includes('Invalid')) {
          errorTitle = "Configuration Error";
          errorMessage = "There seems to be a configuration issue. Please contact us directly at info@airavatatechnologies.com";
        } else if (error.text.includes('network') || error.text.includes('Network')) {
          errorTitle = "Network Error";
          errorMessage = "Network error. Please check your internet connection and try again.";
        } else {
          errorMessage += `Error: ${error.text}`;
        }
      } else if (error.message) {
        errorMessage += `Error: ${error.message}`;
      }

      errorMessage += "\n\nAlternatively, you can contact us directly at:\n📧 info@airavatatechnologies.com\n📱 +91 9619523254";

      showPopup('error', errorTitle, errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "info@airavatatechnologies.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9619523254 / +91 8975623356",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Mumbai, Maharashtra, India",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/airavata-infotech/", label: "LinkedIn", color: "from-blue-600 to-blue-700" },
    { icon: Twitter, href: "#", label: "Twitter", color: "from-sky-500 to-blue-500" },
    { icon: Youtube, href: "https://youtube.com/@airavatatechnologies?si=GefKGWjNo_qusPAN", label: "YouTube", color: "from-red-500 to-red-600" },
    { icon: Facebook, href: "#", label: "Facebook", color: "from-blue-500 to-indigo-600" }
  ];

  const features = [
    { icon: Clock, title: "24/7 Support", desc: "Round the clock assistance" },
    { icon: Award, title: "Expert Team", desc: "Skilled professionals" },
    { icon: Users, title: "Client Focus", desc: "Your success is our priority" }
  ];

  return (
    <section
    id="contact" 
    className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden py-12 lg:py-16">
      {/* Loading indicator for EmailJS */}
      {!emailJSLoaded && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin mr-2"></div>
            Loading email service...
          </div>
        </div>
      )}

      {/* Beautiful Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-popup">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${popup.type === 'success'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                    }`}>
                    {popup.type === 'success' ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <AlertCircle className="w-6 h-6" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{popup.title}</h3>
                </div>
                <button
                  onClick={hidePopup}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Message */}
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {popup.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={hidePopup}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${popup.type === 'success'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                >
                  {popup.type === 'success' ? 'Great!' : 'Got it'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your business with cutting-edge technology? Let's discuss your project and explore innovative solutions that drive real results.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Contact Form - Takes 3 columns on large screens */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/90 h-full">
              <div className="mb-6 lg:mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <Send className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Send us a Message</h2>
                    <p className="text-sm lg:text-base text-gray-600">We'd love to hear from you</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 lg:py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 lg:py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 lg:py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 lg:py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 lg:py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900"
                  >
                    <option value="">Select a service</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Cloud Solutions">Cloud Solutions</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Software Consulting">Software Consulting</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 lg:py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 resize-none"
                    placeholder="Tell us about your project requirements, goals, and how we can help you..."
                    required
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  type="button"
                  disabled={isSubmitting || !emailJSLoaded}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-3 lg:py-4 px-6 lg:px-8 rounded-xl font-semibold text-base lg:text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group relative overflow-hidden mb-6 lg:mb-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Sending your message...
                      </>
                    ) : !emailJSLoaded ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Loading email service...
                      </>
                    ) : (
                      <>
                        <span className="mr-3">Send Message</span>
                        <Send className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information Sidebar - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col space-y-4 lg:space-y-6">
            {/* Contact Info */}
            <div className="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl lg:rounded-3xl p-5 lg:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/80">
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">Contact Information</h3>

              <div className="space-y-4 lg:space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start group cursor-pointer hover:bg-white/30 p-2 lg:p-3 rounded-xl transition-all duration-300">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mr-3 lg:mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <info.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-600 text-xs lg:text-sm font-medium">{info.label}</p>
                      <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 text-sm lg:text-base break-words">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl lg:rounded-3xl p-5 lg:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/80">
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`group flex flex-col items-center p-3 lg:p-4 bg-gradient-to-r ${social.color} rounded-xl text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    <social.icon className="w-5 h-5 lg:w-6 lg:h-6 mb-1 lg:mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs lg:text-sm font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl lg:rounded-3xl p-5 lg:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/80 flex-grow">
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">Why Choose Us</h3>
              <div className="space-y-3 lg:space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <feature.icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 text-sm lg:text-base">
                        {feature.title}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes popup {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-popup {
          animation: popup 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
