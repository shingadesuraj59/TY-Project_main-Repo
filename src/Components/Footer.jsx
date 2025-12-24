// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Facebook, Twitter, LinkedIn, 
  Instagram, Github, Heart, ArrowUp 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">InterviewHub</h3>
              <p className="text-gray-300 leading-relaxed">
                Empowering job seekers with authentic interview experiences and personalized preparation roadmaps to land their dream careers.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: LinkedIn, href: '#', label: 'LinkedIn' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Github, href: '#', label: 'GitHub' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200 group"
                  >
                    <Icon size={18} className="text-gray-300 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Experiences', href: '/feed' },
                { label: 'Roadmap Generator', href: '/roadmap' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowUp size={14} className="ml-1 transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              {[
                { label: 'Interview Tips', href: '/tips' },
                { label: 'Company Reviews', href: '/companies' },
                { label: 'Salary Insights', href: '/salary' },
                { label: 'Career Guidance', href: '/guidance' },
                { label: 'Mock Interviews', href: '/mock' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span>{link.label}</span>
                    <ArrowUp size={14} className="ml-1 transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                <a 
                  href="mailto:hello@interviewhub.com"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  hello@interviewhub.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                <a 
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                <address className="text-gray-300 not-italic">
                  123 Innovation Street<br />
                  Tech City, TC 12345<br />
                  United States
                </address>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h5 className="text-md font-medium text-white mb-4">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-blue-600 px-6 py-2 rounded-r-lg font-medium hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} InterviewHub. Made with</span>
              <Heart size={14} className="text-red-500 fill-current" />
              <span>for job seekers worldwide.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
