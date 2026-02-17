
export interface Verse {
  number: number;
  text: string;
}

export interface Chapter {
  number: number;
  verses: Verse[];
}

export interface Book {
  name: string;
  testament: 'Velho' | 'Novo';
  chapters: number;
}

export interface Devotional {
  title: string;
  verse: string;
  content: string;
  prayer: string;
  tags: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'video' | 'audio';
  duration: string;
  thumbnail: string;
  author: string;
}
