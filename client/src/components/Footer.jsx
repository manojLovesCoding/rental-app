import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">RentPay</h2>
          <p className="text-sm mt-1">
            &copy; {new Date().getFullYear()} RentPay. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 mt-4 md:mt-0">
          <li>
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/support" className="hover:underline">
              Support
            </Link>
          </li>
        </ul>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-6 h-6 hover:text-gray-300" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-6 h-6 hover:text-gray-300" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-6 h-6 hover:text-gray-300" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 hover:text-gray-300" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
