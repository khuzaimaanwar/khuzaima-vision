import React from 'react';
import { Painting } from '../types';
import { Heart, Eye, Sparkles } from 'lucide-react';

interface PaintingCardProps {
  painting: Painting;
  isLiked: boolean;
  onToggleLike: (e: React.MouseEvent, id: string) => void;
  onOpenDetail: (painting: Painting) => void;
}

export const PaintingCard: React.FC<PaintingCardProps> = ({
  painting,
  isLiked,
  onToggleLike,
  onOpenDetail,
}) => {
  return (
    <div 
      onClick={() => onOpenDetail(painting)}
      className="group relative bg-gradient-to-b from-white via-[#fcfbfa] to-[#f5f1e6] p-4 border-2 border-[#c9a84c]/40 hover:border-[#c9a84c] rounded-xs cursor-pointer flex flex-col justify-between transition-all duration-500 ease-out shadow-md hover:shadow-[0_20px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 hover:scale-[1.01] transform-gpu"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Frame Corner Gold Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#c9a84c]"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#c9a84c]"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#c9a84c]"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c9a84c]"></div>

      {/* Featured Curated Selection Badge */}
      {painting.featured && (
        <div className="absolute top-5 left-5 z-10 bg-gradient-to-r from-[#1a2a6c] to-[#900c3f] text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs border border-[#c9a84c] flex items-center space-x-1 shadow-xl">
          <Sparkles className="w-3 h-3 text-[#c9a84c]" />
          <span>Master Selection</span>
        </div>
      )}

      {/* Artwork Canvas Container in 3D Inner Frame */}
      <div className="bg-[#121c42] aspect-[4/5] mb-4 relative overflow-hidden flex items-center justify-center rounded-xs border border-[#c9a84c]/30 shadow-inner group-hover:border-[#c9a84c] transition-colors duration-300">
        <img
          src={painting.imageUrl}
          alt={painting.title}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* 3D Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10193d]/90 via-[#1a2a6c]/70 to-[#900c3f]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center text-white backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#a38232] text-[#1a2a6c] flex items-center justify-center mb-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 border-2 border-white">
            <Eye className="w-6 h-6" />
          </div>
          <span className="font-serif text-lg font-bold text-white mb-1 drop-shadow-md">
            View Artwork
          </span>
          <span className="text-[11px] text-[#c9a84c] font-semibold tracking-widest uppercase bg-black/40 px-2 py-0.5 rounded border border-[#c9a84c]/40">
            Open Gallery View
          </span>
        </div>
      </div>

      {/* Info Content */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-serif text-lg font-bold text-[#1a2a6c] leading-snug group-hover:text-[#900c3f] transition-colors line-clamp-1">
              {painting.title}
            </h3>
          </div>
          
          <p className="text-[11px] text-gray-600 uppercase tracking-widest font-semibold mb-3 flex items-center space-x-1">
            <span className="text-gray-400">By</span>
            <span className="text-[#1a2a6c] font-bold">{painting.artistName}</span>
          </p>
        </div>

        <div className="border-t border-gray-200/80 pt-3 flex items-center justify-between mt-auto text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#1a2a6c] uppercase tracking-wider text-[10px] bg-[#f0e6d2] px-2 py-0.5 rounded-xs border border-[#c9a84c]/40">
              {painting.category}
            </span>
            {painting.year && (
              <span className="text-gray-500 font-medium text-[11px]">
                {painting.year}
              </span>
            )}
          </div>

          <button
            onClick={(e) => onToggleLike(e, painting.id)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-xs ${
              isLiked
                ? 'bg-red-50 text-red-600 border border-red-300'
                : 'text-gray-500 hover:text-red-500 hover:bg-red-50/50 border border-gray-200'
            }`}
            title="Like this painting"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{painting.likes}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
