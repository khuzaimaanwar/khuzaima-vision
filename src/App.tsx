import React, { useState, useEffect, useMemo } from 'react';
import { Painting, User } from './types';
import { StorageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PaintingCard } from './components/PaintingCard';
import { PaintingDetailModal } from './components/PaintingDetailModal';
import { AuthModal } from './components/AuthModal';
import { UploadModal } from './components/UploadModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { Filter, SlidersHorizontal, Grid, Sparkles, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Abstract',
  'Portrait',
  'Landscape',
  'Calligraphy',
  'Modern Art',
  'Realism',
  'Islamic Art'
];

export default function App() {
  // State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  
  // Filtering & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'likes' | 'oldest'>('newest');

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authNotice, setAuthNotice] = useState<string | undefined>(undefined);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedDetailPainting, setSelectedDetailPainting] = useState<Painting | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load initial state
    const user = StorageService.getCurrentUser();
    setCurrentUser(user);

    const list = StorageService.getPaintings();
    setPaintings(list);

    const likes = StorageService.getLikedPaintingIds();
    setLikedIds(likes);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Auth Handlers
  const handleOpenAuth = (mode: 'login' | 'register' = 'login', notice?: string) => {
    setAuthMode(mode);
    setAuthNotice(notice);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.displayName}! Signed in successfully.`);
  };

  const handleLogout = () => {
    StorageService.logout();
    setCurrentUser(null);
    showToast('Signed out successfully.');
  };

  // Upload Handlers
  const handleOpenUpload = () => {
    if (!currentUser) {
      handleOpenAuth('login', 'Upload se pehle login zaroori hai. Please sign in first.');
      return;
    }
    setIsUploadOpen(true);
  };

  const handleUploadSuccess = (newPainting: Painting) => {
    setPaintings([newPainting, ...paintings]);
    showToast(`"${newPainting.title}" has been published to Khuzaima Vision Gallery!`);
  };

  // Like Toggle Handler
  const handleToggleLike = (paintingId: string) => {
    const { isLiked, newCount } = StorageService.toggleLike(paintingId);
    
    // Update local state
    if (isLiked) {
      setLikedIds([...likedIds, paintingId]);
    } else {
      setLikedIds(likedIds.filter(id => id !== paintingId));
    }

    setPaintings(prev => prev.map(p => p.id === paintingId ? { ...p, likes: newCount } : p));
    if (selectedDetailPainting?.id === paintingId) {
      setSelectedDetailPainting(prev => prev ? { ...prev, likes: newCount } : null);
    }
  };

  // Delete Painting Handler
  const handleDeletePainting = (paintingId: string) => {
    StorageService.deletePainting(paintingId);
    setPaintings(prev => prev.filter(p => p.id !== paintingId));
    if (selectedDetailPainting?.id === paintingId) {
      setSelectedDetailPainting(null);
    }
    showToast('Painting deleted from gallery.');
  };

  // Filtered & Sorted Paintings
  const filteredPaintings = useMemo(() => {
    return paintings
      .filter(p => {
        // Category Filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Search Filter
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchArtist = p.artistName.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          return matchTitle || matchArtist || matchCategory || matchDesc;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'likes') {
          return b.likes - a.likes;
        } else if (sortBy === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else {
          // newest
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [paintings, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#1a2a6c] flex flex-col font-sans selection:bg-[#c9a84c] selection:text-[#1a2a6c]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a2a6c] text-white border-2 border-[#c9a84c] px-5 py-3 rounded-sm shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#c9a84c]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenUpload={handleOpenUpload}
        onOpenContact={() => setIsContactOpen(true)}
        onLogout={handleLogout}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Banner with Categories */}
      <HeroBanner
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={CATEGORIES}
        totalPaintings={paintings.length}
        onOpenUpload={handleOpenUpload}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Gallery Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Section Title & Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 mb-8 border-b border-gray-200 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#c9a84c] font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exhibition Grid</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a2a6c]">
              {selectedCategory === 'All' ? 'Curated Masterpieces' : `${selectedCategory} Collection`}
            </h2>
          </div>

          <div className="flex items-center space-x-3 self-end">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-300 text-[#1a2a6c] text-xs font-semibold px-3 py-2 rounded-sm focus:outline-none focus:border-[#1a2a6c]"
            >
              <option value="newest">Newest Additions</option>
              <option value="likes">Most Appreciated</option>
              <option value="oldest">Classic First</option>
            </select>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredPaintings.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center rounded-sm max-w-md mx-auto my-12">
            <Grid className="w-12 h-12 text-[#c9a84c] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#1a2a6c]">No Artworks Found</h3>
            <p className="text-xs text-gray-500 mt-2 mb-6">
              {searchTerm
                ? `No paintings matched "${searchTerm}". Try resetting your search query.`
                : `There are currently no paintings in the ${selectedCategory} category.`}
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 bg-[#1a2a6c] text-white text-xs font-bold uppercase tracking-wider"
              >
                Reset Filters
              </button>
              <button
                onClick={handleOpenUpload}
                className="px-4 py-2 bg-[#c9a84c] text-[#1a2a6c] text-xs font-bold uppercase tracking-wider"
              >
                Upload First Piece
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredPaintings.map((painting) => (
              <PaintingCard
                key={painting.id}
                painting={painting}
                isLiked={likedIds.includes(painting.id)}
                onToggleLike={(e, id) => {
                  e.stopPropagation();
                  handleToggleLike(id);
                }}
                onOpenDetail={(p) => setSelectedDetailPainting(p)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        onOpenUpload={handleOpenUpload}
        onOpenAuth={() => handleOpenAuth('login')}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
        noticeMessage={authNotice}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        currentUser={currentUser}
        onSuccess={handleUploadSuccess}
        onRequireAuth={() => handleOpenAuth('login', 'Upload se pehle login zaroori hai.')}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <PaintingDetailModal
        painting={selectedDetailPainting}
        isOpen={!!selectedDetailPainting}
        onClose={() => setSelectedDetailPainting(null)}
        currentUser={currentUser}
        isLiked={selectedDetailPainting ? likedIds.includes(selectedDetailPainting.id) : false}
        onToggleLike={handleToggleLike}
        onDelete={handleDeletePainting}
      />

    </div>
  );
}
