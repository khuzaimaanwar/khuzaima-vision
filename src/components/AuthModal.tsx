import React, { useState } from 'react';
import { User } from '../types';
import { StorageService } from '../services/storage';
import { X, Lock, Mail, User as UserIcon, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess: (user: User) => void;
  noticeMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess,
  noticeMessage
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    if (mode === 'register' && !displayName.trim()) {
      setError('Please enter your artist or full name.');
      return;
    }

    setIsLoading(true);

    try {
      let user: User;
      if (mode === 'login') {
        user = StorageService.login(email, password);
      } else {
        user = StorageService.register(displayName, email, password);
      }
      onSuccess(user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string, name: string) => {
    const user = StorageService.login(demoEmail, 'demo123');
    onSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-[#c9a84c]/40 rounded-sm shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-[#1a2a6c] px-6 py-5 text-white relative border-b border-[#c9a84c]">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold tracking-wide text-white">
              {mode === 'login' ? 'Artist & Guest Login' : 'Create Artist Account'}
            </h3>
            <p className="text-xs text-[#c9a84c] mt-1 font-medium tracking-wider uppercase">
              Khuzaima Vision Fine Art House
            </p>
          </div>
        </div>

        {/* Notice banner if upload was attempted */}
        {noticeMessage && (
          <div className="bg-[#fdfaf3] border-b border-[#c9a84c]/30 px-6 py-3 flex items-center space-x-2 text-[#1a2a6c] text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-[#c9a84c] shrink-0" />
            <span>{noticeMessage}</span>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
              mode === 'login'
                ? 'bg-white text-[#1a2a6c] border-b-2 border-[#1a2a6c]'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
              mode === 'register'
                ? 'bg-white text-[#1a2a6c] border-b-2 border-[#1a2a6c]'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1a2a6c] mb-1">
                Artist / Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Khuzaima Ahmad"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#1a2a6c]"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1a2a6c] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="artist@khuzaima.vision"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#1a2a6c]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1a2a6c] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#1a2a6c]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#1a2a6c] hover:bg-[#121c49] text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-sm flex items-center justify-center space-x-2"
          >
            <span>{mode === 'login' ? 'Login To Gallery' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4 text-[#c9a84c]" />
          </button>
        </form>

        {/* Demo Fast Logins */}
        <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/50">
          <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-2 text-center">
            Or Instant Demo Login:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('khuzaima@artgallery.com', 'Khuzaima Ahmad')}
              className="py-2 px-3 bg-white border border-[#c9a84c]/50 hover:border-[#1a2a6c] text-[#1a2a6c] text-xs font-medium rounded-sm flex items-center justify-center space-x-1 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Khuzaima (Admin)</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('zaid@khuzaima.vision', 'Zaid Artist')}
              className="py-2 px-3 bg-white border border-[#c9a84c]/50 hover:border-[#1a2a6c] text-[#1a2a6c] text-xs font-medium rounded-sm flex items-center justify-center space-x-1 transition-all"
            >
              <UserIcon className="w-3.5 h-3.5 text-gray-500" />
              <span>Zaid (Artist)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
