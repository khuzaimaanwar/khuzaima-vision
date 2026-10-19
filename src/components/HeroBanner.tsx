import React from 'react';
import { Sparkles, Upload, PhoneCall, Heart, Palette } from 'lucide-react';
import khuzaimaPic from '../assets/images/khuzaima_profile.jpg';

interface HeroBannerProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
  totalPaintings: number;
  onOpenUpload: () => void;
  onOpenContact: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  selectedCategory,
  onSelectCategory,
  categories,
  totalPaintings,
  onOpenUpload,
  onOpenContact,
}) => {
  return (
    <section className="bg-gradient-to-b from-[#10193d] via-[#1a2a6c] to-[#25102a] text-white pt-12 pb-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b-2 border-[#c9a84c]">
      
      {/* 3D Decorative Glowing Lights */}
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#c9a84c]/20 via-[#900c3f]/30 to-[#1a2a6c]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#c9a84c]/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#800020]/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
        
        {/* 3D Floating Avatar Logo with real Khuzaim picture */}
        <div className="relative mb-6 group cursor-pointer" onClick={onOpenContact} title="Click to view Khuzaim's curator profile & contact">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#c9a84c] via-[#ff4d4d] to-[#c9a84c] rounded-full blur-md opacity-85 group-hover:opacity-100 transition duration-500 group-hover:scale-105 animate-pulse"></div>
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#c9a84c] p-1 bg-[#1a2a6c] shadow-[0_12px_35px_rgba(0,0,0,0.7)] overflow-hidden transition-transform duration-500 transform group-hover:scale-105 group-hover:rotate-1">
            <img
              src={khuzaimaPic}
              alt="Chaudhry Khuzaima - Founder"
              className="w-full h-full object-cover object-[50%_15%] rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-gradient-to-r from-[#c9a84c] to-[#e6c66e] text-[#1a2a6c] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-lg border-2 border-[#1a2a6c] tracking-wider">
            Curator
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-[#c9a84c]/15 border border-[#c9a84c]/60 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full mb-4 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
          <span>Official Fine Art Exhibition House</span>
        </div>

        {/* BIG CENTERED HEADING */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-extrabold text-white tracking-wider leading-none mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          <span className="bg-gradient-to-r from-white via-amber-100 to-[#c9a84c] bg-clip-text text-transparent">
            KHUZAIMA VISION
          </span>
        </h1>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center space-x-3 my-3">
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#c9a84c]"></div>
          <div className="w-2.5 h-2.5 rotate-45 bg-[#c9a84c] border border-white"></div>
          <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#c9a84c]"></div>
        </div>

        {/* Subtitle / Description */}
        <p className="text-sm sm:text-base text-gray-200 font-light max-w-2xl leading-relaxed mb-8 text-center px-2">
          An exclusive exhibition celebrating master classical artworks, modern abstract expressions, traditional Islamic calligraphy, and timeless portraits curated by <strong className="text-[#c9a84c] font-semibold">Chaudhry Khuzaima</strong>.
        </p>

        {/* Action Buttons: CONTACT US and SUBMIT PAINTING */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full sm:w-auto">
          
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto bg-gradient-to-r from-[#c9a84c] via-[#dfba5f] to-[#c9a84c] text-[#1a2a6c] px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest shadow-[0_10px_25px_rgba(201,168,76,0.4)] hover:shadow-[0_15px_30px_rgba(201,168,76,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center space-x-2.5 border border-white/40"
          >
            <PhoneCall className="w-4 h-4 fill-current" />
            <span>Contact Us / Curator Info</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-2 border-[#c9a84c]/80 text-white px-7 py-3 rounded-sm font-bold text-xs uppercase tracking-widest shadow-lg hover:border-[#c9a84c] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Upload className="w-4 h-4 text-[#c9a84c]" />
            <span>Submit Your Artwork</span>
          </button>

        </div>

        {/* Total Paintings Counter Pill */}
        <div className="inline-flex items-center space-x-3 bg-black/40 border border-[#c9a84c]/30 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
          <Palette className="w-4 h-4 text-[#c9a84c]" />
          <span className="text-xs text-gray-300 uppercase tracking-wider">
            Total Exhibited Pieces: <strong className="text-white font-serif font-bold text-sm ml-1">{totalPaintings} Artworks</strong>
          </span>
        </div>

        {/* Category Pills Filter Bar */}
        <div className="w-full border-t border-white/10 pt-6">
          <span className="text-xs uppercase tracking-widest text-[#c9a84c] font-bold block mb-3 text-center">
            Exhibition Categories
          </span>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-xs border ${
                  selectedCategory === cat
                    ? 'bg-[#c9a84c] text-[#1a2a6c] border-[#c9a84c] shadow-[0_4px_14px_rgba(201,168,76,0.5)] scale-105'
                    : 'bg-white/5 text-gray-200 border-white/15 hover:bg-white/15 hover:border-[#c9a84c]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
