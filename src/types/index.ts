export type ShowerTime = 'morning' | 'evening' | 'both';
export type Preference = 'clean' | 'warm' | 'green' | 'powdery';
export type Space = 'office' | 'home' | 'outdoor' | 'mixed';

export interface QuizAnswers {
  showerTime: ShowerTime;
  preference: Preference;
  space: Space;
  moodText: string;
}

export interface Product {
  brand: string;
  name: string;
  note: string;
  image: string;
}

export interface NoteAxis {
  label: string;
  value: number;
}

export type ProductKind = 'bodywash' | 'shampoo' | 'next';

export interface RecommendResult {
  category: string;
  description: string;
  routine: string[];
  noteAxes: NoteAxis[];
  bodywash: Product;
  shampoo: Product;
  nextPerfume: Product;
  source: 'ai' | 'fallback';
}