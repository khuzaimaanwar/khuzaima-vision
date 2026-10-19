import React, { useState } from 'react';
import { X, Mail, Phone, MessageSquare, Instagram, Copy, Check, ExternalLink, Sparkles, UserCheck } from 'lucide-react';
import khuzaimaPic from '../assets/images/khuzaima_profile.jpg';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const contactInfo = {
    email: 'khziamaanwar91@gmail.com',
    phone: '03359748144',
    whatsapp: '03359748144',
    instagram: 'chaudhry_khuzaima546',
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border-2 border-[#c9a84c] rounded-sm shadow-2xl overflow-hidden my-auto max-h-[95vh] overflow-y-auto">
        
        {/* Header with Dark Blue Background & Gold Border */}
        <div className="bg-[#1a2a6c] text-white p-6 relative border-b border-[#c9a84c]/40 text-center">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo Badge */}
          <div className="w-28 h-28 mx-auto mb-3 rounded-full border-3 border-[#c9a84c] p-1 bg-[#1a2a6c] shadow-2xl overflow-hidden relative group">
            <img
              src={khuzaimaPic}
              alt="Chaudhry Khuzaima"
              className="w-full h-full object-cover object-[50%_15%] rounded-full group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="inline-flex items-center space-x-1.5 bg-[#c9a84c]/20 border border-[#c9a84c]/50 text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-xs mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Curator & Founder</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
            Chaudhry Khuzaima
          </h3>
          <p className="text-xs text-gray-300 mt-0.5 font-medium">
            Khuzaima Vision Fine Art Gallery
          </p>
        </div>

        {/* Contact Details Body */}
        <div className="p-6 space-y-4 bg-[#f8f6f0]">
          
          {/* Email */}
          <div className="bg-white p-3.5 rounded-sm border border-gray-200 shadow-xs flex items-center justify-between hover:border-[#c9a84c] transition-colors">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xs bg-[#1a2a6c] text-[#c9a84c] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                  Official Email
                </span>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-xs font-bold text-[#1a2a6c] hover:text-[#c9a84c] transition-colors truncate block"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0 ml-2">
              <button
                onClick={() => handleCopy(contactInfo.email, 'email')}
                className="p-1.5 text-gray-400 hover:text-[#1a2a6c] rounded-xs transition-colors"
                title="Copy Email"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={`mailto:${contactInfo.email}`}
                className="px-2.5 py-1 bg-[#1a2a6c] text-white text-[11px] font-bold rounded-xs hover:bg-[#121c49] transition-colors flex items-center space-x-1"
              >
                <span>Send</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Phone Number */}
          <div className="bg-white p-3.5 rounded-sm border border-gray-200 shadow-xs flex items-center justify-between hover:border-[#c9a84c] transition-colors">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xs bg-[#1a2a6c] text-[#c9a84c] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                  Phone Call
                </span>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-xs font-bold text-[#1a2a6c] hover:text-[#c9a84c] transition-colors truncate block"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0 ml-2">
              <button
                onClick={() => handleCopy(contactInfo.phone, 'phone')}
                className="p-1.5 text-gray-400 hover:text-[#1a2a6c] rounded-xs transition-colors"
                title="Copy Phone Number"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={`tel:${contactInfo.phone}`}
                className="px-2.5 py-1 bg-[#1a2a6c] text-white text-[11px] font-bold rounded-xs hover:bg-[#121c49] transition-colors flex items-center space-x-1"
              >
                <span>Call</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-white p-3.5 rounded-sm border border-gray-200 shadow-xs flex items-center justify-between hover:border-[#c9a84c] transition-colors">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xs bg-green-600 text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                  WhatsApp Direct
                </span>
                <a
                  href={`https://wa.me/92${contactInfo.whatsapp.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#1a2a6c] hover:text-green-600 transition-colors truncate block"
                >
                  {contactInfo.whatsapp}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0 ml-2">
              <button
                onClick={() => handleCopy(contactInfo.whatsapp, 'whatsapp')}
                className="p-1.5 text-gray-400 hover:text-[#1a2a6c] rounded-xs transition-colors"
                title="Copy WhatsApp Number"
              >
                {copiedField === 'whatsapp' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={`https://wa.me/92${contactInfo.whatsapp.replace(/^0/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-green-600 text-white text-[11px] font-bold rounded-xs hover:bg-green-700 transition-colors flex items-center space-x-1"
              >
                <span>Chat</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-white p-3.5 rounded-sm border border-gray-200 shadow-xs flex items-center justify-between hover:border-[#c9a84c] transition-colors">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xs bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                  Instagram Handle
                </span>
                <a
                  href={`https://instagram.com/${contactInfo.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#1a2a6c] hover:text-pink-600 transition-colors truncate block"
                >
                  @{contactInfo.instagram}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0 ml-2">
              <button
                onClick={() => handleCopy(contactInfo.instagram, 'instagram')}
                className="p-1.5 text-gray-400 hover:text-[#1a2a6c] rounded-xs transition-colors"
                title="Copy Instagram Username"
              >
                {copiedField === 'instagram' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={`https://instagram.com/${contactInfo.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[11px] font-bold rounded-xs hover:opacity-90 transition-opacity flex items-center space-x-1"
              >
                <span>Follow</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="bg-white border-t border-gray-200 p-4 text-center">
          <p className="text-[11px] text-gray-500">
            Khuzaima Vision Fine Art House • Art Inquiries & Commissions
          </p>
        </div>

      </div>
    </div>
  );
};
