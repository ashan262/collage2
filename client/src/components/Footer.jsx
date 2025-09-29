import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Clock,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Faculty", href: "/faculty" },
    { name: "Time Table", href: "/timetable" },
    { name: "Contact Us", href: "/contact" },
  ];

  const academicLinks = [
    { name: "Admissions", href: "/admissions" },
    { name: "Activities", href: "/activities" },
    { name: "Examination", href: "/examination" },
    { name: "Alumni", href: "/alumni" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-center justify-center gap-2 min-w-[56px]">
                <div className="w-20 h-20 flex items-center justify-center relative">
                  <img
                    src="/images/logo2.png"
                    alt="FGDC Boys Kohat Cantt Logo"
                    className="w-20 h-20 object-contain rounded-full shadow-md border border-primary-600 bg-white"
                    style={{ background: "#fff" }}
                    onError={(e) => {
                      // Fallback to text logo if image fails to load
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center absolute top-0 left-0"
                    style={{ display: "none" }}
                  >
                    <span className="text-white font-bold text-xl">FG</span>
                  </div>
                </div>
                <h3 className="text-lg font-heading font-bold text-center leading-tight">
                  Federal Government Degree College
                  <br />
                  For Boys Kohat Cantt
                </h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Federal Government Degree College For Boys Kohat Cantt is
              committed to providing quality education and nurturing future
              leaders through academic excellence and character building.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/16NHH6K1Np/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href={import.meta.env.VITE_TWITTER_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href={import.meta.env.VITE_YOUTUBE_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Academics</h4>
            <ul className="space-y-2">
              {academicLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin
                  size={16}
                  className="text-primary-400 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-300 text-sm">
                    Federal Government Degree College For Boys Dhoda Road Kohat
                    Cantt
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">0333-6040021</p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">fgdcbkohat@gmail.com</p>
              </div>

              <div className="flex items-start space-x-3">
                <Clock
                  size={16}
                  className="text-primary-400 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-300 text-sm">
                    Mon - Fri: 8:00 AM - 2:00 PM
                  </p>
                  <p className="text-gray-300 text-sm">
                    Saturday: 8:00 AM - 12:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Federal Government Degree College For Boys Kohat
              Cantt. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
