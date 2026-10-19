import React, { useState } from 'react';
import { User, Painting } from '../types';
import { StorageService } from '../services/storage';
import { X, Upload, Image as ImageIcon, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onSuccess: (painting: Painting) => void;
  onRequireAuth: () => void;
}

const CATEGORIES = [
  'Abstract',
  'Portrait',
  'Landscape',
  'Calligraphy',
  'Modern Art',
  'Realism',
  'Islamic Art'
];

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSuccess,
  onRequireAuth
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [artistName, setArtistName] = useState(currentUser?.displayName || '');
  const [medium, setMedium] = useState('Oil on Canvas');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  
  // Image handling
  const [imageInputMode, setImageInputMode] = useState<'file' | 'url'>('file');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync artist name when currentUser changes
  React.useEffect(() => {
    if (currentUser) {
      setArtistName(currentUser.displayName);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  // Enforce login check
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="w-full max-w-md bg-white border border-[#c9a84c] p-6 text-center rounded-sm shadow-2xl">
          <AlertCircle className="w-12 h-12 text-[#c9a84c] mx-auto mb-3" />
          <h3 className="font-serif text-2xl font-bold text-[#1a2a6c]">Login Required</h3>
          <p className="text-sm text-gray-600 mt-2 mb-6 leading-relaxed">
            Painting upload karne ke liye login karna zaroori hai. Please sign in to your artist account first.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                onRequireAuth();
              }}
              className="flex-1 py-2.5 bg-[#1a2a6c] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#121c49]"
            >
              Login Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageUrl(result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (val: string) => {
    setImageUrl(val);
    setImagePreview(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter painting title.');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a description for your artwork.');
      return;
    }
    if (!artistName.trim()) {
      setError('Please specify the artist name.');
      return;
    }
    if (!imageUrl) {
      setError('Please select or paste a painting image.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = StorageService.addPainting({
        title: title.trim(),
        description: description.trim(),
        category,
        artistName: artistName.trim(),
        artistEmail: currentUser.email,
        imageUrl: imageUrl,
        medium: medium.trim() || 'Oil on Canvas',
        year: year.trim() || new Date().getFullYear().toString(),
      });

      onSuccess(created);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save painting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-[#c9a84c] rounded-sm shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#1a2a6c] px-6 py-4 text-white flex items-center justify-between border-b border-[#c9a84c]">
          <div className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-[#c9a84c]" />
            <h3 className="font-serif text-xl font-bold tracking-wide">
              Exhibit New Artwork
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
              {error}
            </div>
          )}

          {/* Image Picker */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1a2a6c]">
                Painting Artwork Image <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-2 text-[11px] font-medium">
                <button
                  type="button"
                  onClick={() => setImageInputMode('file')}
                  className={`px-2 py-0.5 rounded-xs ${imageInputMode === 'file' ? 'bg-[#1a2a6c] text-white' : 'text-gray-500'}`}
                >
                  File Upload
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputMode('url')}
                  className={`px-2 py-0.5 rounded-xs ${imageInputMode === 'url' ? 'bg-[#1a2a6c] text-white' : 'text-gray-500'}`}
                >
                  Image URL
                </button>
              </div>
            </div>

            {imageInputMode === 'file' ? (
              <div className="border-2 border-dashed border-[#c9a84c]/50 hover:border-[#1a2a6c] bg-[#f8f6f0] p-4 text-center rounded-sm transition-colors relative cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-2 py-3">
                  <ImageIcon className="w-8 h-8 text-[#c9a84c] group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-semibold text-[#1a2a6c]">
                    Click or Drag & Drop painting file
                  </p>
                  <p className="text-[10px] text-gray-500">Supports JPG, PNG, WEBP (Max 5MB)</p>
                </div>
              </div>
            ) : (
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="w-full p-2.5 text-xs border border-gray-300 rounded-sm focus:outline-none focus:border-[#1a2a6c]"
              />
            )}

            {/* Preview Box */}
            {imagePreview && (
              <div className="mt-3 relative w-full h-44 bg-gray-100 rounded-sm overflow-hidden border border-gray-200 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Artwork Preview"
                  className="w-full h-full object-contain"
                  onError={() => setError('Unable to load image from URL.')}
                />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-xs">
                  Preview
                </span>
              </div>
            )}
          </div>

          {/* Title & Artist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1a2a6c] mb-1">
                Painting Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Royal Harmony"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#1a2a6c]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1a2a6c] mb-1">
                Artist Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Khuzaima Ahmad"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                className="w-full p-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#1a2a6c]"
                required
              />
            </div>
          </div>

          {/* Category & Medium & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1a2a6c] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 text-sm border border-gray-300 rounded-sm bg-white focus:outline-none focus:border-[#1a2a6c]"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1a2a6c] mb-1">
                Medium
              </label>
              <input
                type="text"
                placeholder="e.g. Oil on Canvas"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full p-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#1a2a6c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1a2a6c] mb-1">
                Year Created
              </label>
              <input
                type="text"
                placeholder="2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#1a2a6c]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1a2a6c] mb-1">
              Description / Story Behind Artwork <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Describe the inspiration, color palette, and concept behind this piece..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#1a2a6c]"
              required
            ></textarea>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#1a2a6c] hover:bg-[#121c49] text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-md transition-all flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4 text-[#c9a84c]" />
              <span>Publish To Gallery</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
