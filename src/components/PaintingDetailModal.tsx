import React, { useState, useEffect } from 'react';
import { Painting, User, Comment } from '../types';
import { StorageService } from '../services/storage';
import { X, Heart, MessageSquare, Share2, Trash2, Calendar, User as UserIcon, Tag, Check, Send } from 'lucide-react';

interface PaintingDetailModalProps {
  painting: Painting | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  isLiked: boolean;
  onToggleLike: (paintingId: string) => void;
  onDelete: (paintingId: string) => void;
}

export const PaintingDetailModal: React.FC<PaintingDetailModalProps> = ({
  painting,
  isOpen,
  onClose,
  currentUser,
  isLiked,
  onToggleLike,
  onDelete,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (painting) {
      const list = StorageService.getComments(painting.id);
      setComments(list);
    }
  }, [painting]);

  if (!isOpen || !painting) return null;

  const isOwnerOrAdmin = currentUser && (
    currentUser.email === painting.artistEmail ||
    currentUser.email === 'khuzaima@artgallery.com'
  );

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const authorName = currentUser ? currentUser.displayName : 'Guest Art Enthusiast';
    const authorEmail = currentUser ? currentUser.email : 'guest@khuzaima.vision';

    const created = StorageService.addComment(
      painting.id,
      newCommentText,
      authorName,
      authorEmail
    );

    setComments([created, ...comments]);
    setNewCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white border border-[#c9a84c] rounded-sm shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Large Artwork Display */}
        <div className="md:w-3/5 bg-[#1a2a6c] p-6 sm:p-10 flex items-center justify-center relative min-h-[320px] md:min-h-[550px]">
          <div className="relative max-w-full max-h-[75vh] shadow-2xl border-4 border-[#c9a84c]/60 p-2 bg-[#1a2a6c] rounded-xs">
            <img
              src={painting.imageUrl}
              alt={painting.title}
              className="max-w-full max-h-[68vh] object-contain mx-auto rounded-xs"
            />
          </div>
        </div>

        {/* Right Side: Painting Info & Interactivity */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white border-t md:border-t-0 md:border-l border-gray-100 max-h-[85vh]">
          
          <div>
            {/* Category Tag */}
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-[#f8f6f0] text-[#c9a84c] border border-[#c9a84c]/40 font-bold uppercase tracking-widest text-[11px] rounded-xs flex items-center space-x-1">
                <Tag className="w-3 h-3" />
                <span>{painting.category}</span>
              </span>

              {isOwnerOrAdmin && (
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to remove this painting from gallery?')) {
                      onDelete(painting.id);
                      onClose();
                    }
                  }}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Painting</span>
                </button>
              )}
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a2a6c] mb-2 leading-tight">
              {painting.title}
            </h2>

            {/* Artist Detail */}
            <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-full bg-[#1a2a6c] text-[#c9a84c] font-serif font-bold text-base flex items-center justify-center border border-[#c9a84c]">
                {painting.artistName.charAt(0)}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-[#1a2a6c]">
                  {painting.artistName}
                </p>
                <p className="text-[11px] text-gray-500">
                  {painting.medium || 'Oil on Canvas'} {painting.year ? `• ${painting.year}` : ''}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                Artwork Story & Description
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed bg-[#f8f6f0] p-4 rounded-sm border-l-2 border-[#c9a84c] italic">
                "{painting.description}"
              </p>
            </div>

            {/* Engagement Bar */}
            <div className="flex items-center justify-between border-y border-gray-100 py-3 mb-6">
              <button
                onClick={() => onToggleLike(painting.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-sm text-xs font-bold transition-all ${
                  isLiked
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{painting.likes} Appreciation{painting.likes !== 1 ? 's' : ''}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-[#1a2a6c] hover:bg-gray-50 border border-gray-200 rounded-sm transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4 text-[#c9a84c]" />}
                <span>{copied ? 'Link Copied!' : 'Share Artwork'}</span>
              </button>
            </div>

            {/* Comments Thread */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#1a2a6c] mb-3 flex items-center space-x-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span>Gallery Appreciations ({comments.length})</span>
              </h4>

              {/* Comment Input */}
              <form onSubmit={handleAddComment} className="mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Write a message or compliment..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-1 p-2 text-xs border border-gray-300 rounded-sm focus:outline-none focus:border-[#1a2a6c]"
                  />
                  <button
                    type="submit"
                    className="bg-[#1a2a6c] text-white px-3 py-2 rounded-sm text-xs font-bold hover:bg-[#121c49]"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* List of comments */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {comments.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No appreciations yet. Be the first to leave a comment!</p>
                ) : (
                  comments.map(comment => (
                    <div key={comment.id} className="p-3 bg-gray-50 border-l-2 border-[#1a2a6c] rounded-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-[#1a2a6c]">{comment.userName}</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
