
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold mb-4 inline-block">
              <span className="text-primary-foreground">TRICK</span>
              <span className="text-accent">TOPIA</span>
            </Link>
            <p className="text-primary-foreground/80 max-w-md mb-6">
              Taiwan's first dedicated Tricking Club. Join our community and learn the art of movement through kicks, flips, and twists.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="mailto:info@tricktopia.com" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tricktionary" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                  Tricktionary
                </Link>
              </li>
              <li>
                <Link to="/points" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                  Buy Points
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">
                  Book Classes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <address className="not-italic text-primary-foreground/80">
              <p>123 Tricking Street</p>
              <p>Taipei, Taiwan</p>
              <p className="mt-2">Phone: +886 123 456 789</p>
              <p>Email: info@tricktopia.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Tricktopia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
