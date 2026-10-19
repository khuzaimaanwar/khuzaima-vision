import React from 'react';
import { Heart, ShieldCheck, Mail, Phone, MessageSquare, Instagram, PhoneCall } from 'lucide-react';
import khuzaimaPic from '../assets/images/khuzaima_profile.jpg';

interface FooterProps {
  onOpenUpload: () => void;
  onOpenAuth: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenUpload, onOpenAuth, onOpenContact }) => {
  return (
    <footer className="bg-[#1a2a6c] text-white border-t-2 border-[#c9a84c] pt-12 pb-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Col 1: Brand Info & Logo */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#c9a84c] overflow-hidden bg-[#1a2a6c] shrink-0 p-0.5 shadow-md">
              <img
                src={khuzaimaPic}
                alt="Khuzaima Vision Logo"
                className="w-full h-full object-cover object-[50%_15%] rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-widest text-white block leading-none">
                KHUZAIMA VISION
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84c] font-medium block mt-1">
                Curated Fine Art House
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed max-w-md mb-4">
            Dedicated to celebrating master artistic talent, preserving classical aesthetics, and promoting modern visual expressions. Every painting is a story framed in passion.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-[#c9a84c] uppercase font-semibold tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Art Exhibition & Curator House</span>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[#c9a84c] font-bold mb-4 border-b border-[#c9a84c]/30 pb-1.5">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
            <li>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#c9a84c] transition-colors">
                Curated Gallery
              </button>
            </li>
            <li>
              <button onClick={onOpenUpload} className="hover:text-[#c9a84c] transition-colors">
                Submit Painting
              </button>
            </li>
            <li>
              <button onClick={onOpenContact} className="hover:text-[#c9a84c] transition-colors flex items-center space-x-1.5 text-[#c9a84c] font-bold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contact Curator & Founder</span>
              </button>
            </li>
            <li>
              <button onClick={onOpenAuth} className="hover:text-[#c9a84c] transition-colors">
                Artist Login / Register
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Direct Contact Details */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[#c9a84c] font-bold mb-4 border-b border-[#c9a84c]/30 pb-1.5">
            Founder & Curator Info
          </h4>
          <p className="text-xs font-bold text-white mb-2">
            Chaudhry Khuzaima
          </p>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#c9a84c]" />
              <a href="mailto:khziamaanwar91@gmail.com" className="hover:text-[#c9a84c] truncate">
                khziamaanwar91@gmail.com
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#c9a84c]" />
              <a href="tel:03359748144" className="hover:text-[#c9a84c]">
                03359748144
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <MessageSquare className="w-3.5 h-3.5 text-green-500" />
              <a href="https://wa.me/923359748144" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
                WhatsApp: 03359748144
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <a href="https://instagram.com/chaudhry_khuzaima546" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300">
                @chaudhry_khuzaima546
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 font-medium gap-3">
        <p>© {new Date().getFullYear()} Khuzaima Vision Art House. All rights reserved.</p>
        <div className="flex items-center space-x-1 text-[#c9a84c]">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 fill-[#c9a84c]" />
          <span>for Art Enthusiasts worldwide</span>
        </div>
      </div>
    </footer>
  );
};
