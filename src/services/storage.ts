import { Painting, User, Comment } from '../types';
import { INITIAL_PAINTINGS } from '../data/initialPaintings';

const PAINTINGS_KEY = 'khuzaima_vision_paintings_v1';
const CURRENT_USER_KEY = 'khuzaima_vision_current_user_v1';
const USERS_DB_KEY = 'khuzaima_vision_users_db_v1';
const LIKES_KEY = 'khuzaima_vision_likes_v1';
const COMMENTS_KEY = 'khuzaima_vision_comments_v1';

// Initialize default users if missing
const DEFAULT_USERS: User[] = [
  {
    uid: 'u-khuzaima-001',
    email: 'khuzaima@artgallery.com',
    displayName: 'Khuzaima Ahmad',
    bio: 'Founder & Curator at Khuzaima Vision Art House',
    createdAt: new Date().toISOString()
  },
  {
    uid: 'u-artist-002',
    email: 'zaid@khuzaima.vision',
    displayName: 'Zaid Khuzaima',
    bio: 'Contemporary abstract painter specializing in metallic textures',
    createdAt: new Date().toISOString()
  }
];

// Helper: Get stored users
function getUsersDB(): User[] {
  try {
    const data = localStorage.getItem(USERS_DB_KEY);
    if (!data) {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_USERS;
  }
}

// Storage Manager
export const StorageService = {
  // Paintings Management
  getPaintings(): Painting[] {
    try {
      const data = localStorage.getItem(PAINTINGS_KEY);
      if (!data) {
        localStorage.setItem(PAINTINGS_KEY, JSON.stringify(INITIAL_PAINTINGS));
        return INITIAL_PAINTINGS;
      }
      return JSON.parse(data);
    } catch (e) {
      return INITIAL_PAINTINGS;
    }
  },

  addPainting(painting: Omit<Painting, 'id' | 'createdAt' | 'likes'>): Painting {
    const newPainting: Painting = {
      ...painting,
      id: 'kv-art-' + Date.now(),
      createdAt: new Date().toISOString(),
      likes: 0
    };

    const currentPaintings = this.getPaintings();
    const updated = [newPainting, ...currentPaintings];
    localStorage.setItem(PAINTINGS_KEY, JSON.stringify(updated));
    return newPainting;
  },

  deletePainting(id: string): boolean {
    const current = this.getPaintings();
    const filtered = current.filter(p => p.id !== id);
    localStorage.setItem(PAINTINGS_KEY, JSON.stringify(filtered));
    return true;
  },

  // Likes Management
  getLikedPaintingIds(): string[] {
    try {
      const data = localStorage.getItem(LIKES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleLike(paintingId: string): { isLiked: boolean; newCount: number } {
    const likedIds = this.getLikedPaintingIds();
    const isLiked = likedIds.includes(paintingId);
    let updatedLikes: string[];

    if (isLiked) {
      updatedLikes = likedIds.filter(id => id !== paintingId);
    } else {
      updatedLikes = [...likedIds, paintingId];
    }
    localStorage.setItem(LIKES_KEY, JSON.stringify(updatedLikes));

    // Update painting count
    const paintings = this.getPaintings();
    let newCount = 0;
    const updatedPaintings = paintings.map(p => {
      if (p.id === paintingId) {
        newCount = isLiked ? Math.max(0, p.likes - 1) : p.likes + 1;
        return { ...p, likes: newCount };
      }
      return p;
    });

    localStorage.setItem(PAINTINGS_KEY, JSON.stringify(updatedPaintings));
    return { isLiked: !isLiked, newCount };
  },

  // Authentication
  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  login(email: string, password?: string): User {
    const users = getUsersDB();
    const cleanEmail = email.trim().toLowerCase();
    
    let existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!existing) {
      // Auto-register if mock credentials entered
      const nameFromEmail = cleanEmail.split('@')[0];
      const displayName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      existing = {
        uid: 'u-' + Date.now(),
        email: cleanEmail,
        displayName: displayName || 'Artist',
        createdAt: new Date().toISOString()
      };
      users.push(existing);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(existing));
    return existing;
  },

  register(displayName: string, email: string, password?: string): User {
    const users = getUsersDB();
    const cleanEmail = email.trim().toLowerCase();

    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      // Login if already registered
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(existing));
      return existing;
    }

    const newUser: User = {
      uid: 'u-' + Date.now(),
      email: cleanEmail,
      displayName: displayName.trim() || 'Artist',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return newUser;
  },

  logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Comments
  getComments(paintingId: string): Comment[] {
    try {
      const data = localStorage.getItem(COMMENTS_KEY);
      const allComments: Comment[] = data ? JSON.parse(data) : [];
      return allComments.filter(c => c.paintingId === paintingId);
    } catch {
      return [];
    }
  },

  addComment(paintingId: string, text: string, userName: string, userEmail: string): Comment {
    const newComment: Comment = {
      id: 'c-' + Date.now(),
      paintingId,
      text: text.trim(),
      userName: userName.trim(),
      userEmail: userEmail.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      const data = localStorage.getItem(COMMENTS_KEY);
      const allComments: Comment[] = data ? JSON.parse(data) : [];
      allComments.unshift(newComment);
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
    } catch {
      localStorage.setItem(COMMENTS_KEY, JSON.stringify([newComment]));
    }

    return newComment;
  }
};
