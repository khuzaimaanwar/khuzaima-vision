export interface Painting {
  id: string;
  title: string;
  artistName: string;
  artistEmail?: string;
  description: string;
  category: string;
  imageUrl: string;
  medium?: string;
  year?: string;
  createdAt: string;
  likes: number;
  featured?: boolean;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  paintingId: string;
  userName: string;
  userEmail: string;
  text: string;
  createdAt: string;
}

export type CategoryFilter = 'All' | 'Abstract' | 'Portrait' | 'Landscape' | 'Calligraphy' | 'Modern Art' | 'Realism' | 'Islamic Art';
