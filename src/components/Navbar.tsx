import React, { useState } from 'react';
import { User } from '../types';
import { Upload, LogIn, LogOut, Plus, Search, PhoneCall } from 'lucide-react';
import khuzaimaPic from '../assets/images/khuzaima_profile.jpg';

interface NavbarProps {
  currentUser: User | null;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenUpload: () => void;
  onOpenContact: () => void;
  onLogout: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  onOpenUpload,
  onOpenContact,
  onLogout,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#1a2a6c] text-white shadow-md border-b border-[#c9a84c]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onSelectCategory('All')}>
            <div className="w-12 h-12 rounded-full border-2 border-[#c9a84c] overflow-hidden bg-[#1a2a6c] shadow-md transform group-hover:scale-105 transition-transform flex items-center justify-center p-0.5">
              <img 
                src={khuzaimaPic} 
                alt="Khuzaima Vision Logo" 
                className="w-full h-full object-cover object-[50%_15%] rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif tracking-widest text-white font-bold block leading-none">
                KHUZAIMA VISION
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84c] font-medium block mt-1">
                Fine Art Gallery & Exhibition
              </span>
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search paintings, artists, or categories..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 text-white placeholder-gray-300 text-sm border border-white/20 rounded-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white/15 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-300 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Contact Us Button */}
            <button
              onClick={onOpenContact}
              className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 border border-[#c9a84c]/60 text-white px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-sm font-bold text-xs tracking-wider transition-all shadow-sm"
              title="Contact Curator"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Contact Us</span>
            </button>

            {/* Upload Button */}
            <button
              onClick={onOpenUpload}
              className="flex items-center space-x-2 bg-[#c9a84c] hover:bg-[#b8973b] text-[#1a2a6c] px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-sm font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-sm active:scale-95"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload Painting</span>
              <span className="sm:hidden">Upload</span>
            </button>

            {/* Authentication / User Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-[#c9a84c]/40 px-3 py-2 rounded-sm transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-[#c9a84c] text-[#1a2a6c] flex items-center justify-center font-bold text-xs uppercase">
                    {currentUser.displayName.charAt(0)}
                  </div>
                  <span className="hidden lg:inline text-xs font-medium max-w-[100px] truncate">
                    {currentUser.displayName}
                  </span>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-[#1a2a6c] rounded-sm shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold truncate">{currentUser.displayName}</p>
                      <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenUpload();
                      }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-[#f8f6f0] flex items-center space-x-2 text-gray-700 hover:text-[#1a2a6c]"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#c9a84c]" />
                      <span>Add New Painting</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-red-50 text-red-600 flex items-center space-x-2 border-t border-gray-100 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center space-x-1.5 text-white hover:text-[#c9a84c] px-2.5 py-2 text-xs sm:text-sm font-medium transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search paintings, artists, categories..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white/10 text-white placeholder-gray-300 text-xs border border-white/20 rounded-sm focus:outline-none focus:border-[#c9a84c]"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
