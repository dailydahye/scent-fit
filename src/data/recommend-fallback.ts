import { CATEGORIES, pickProduct, type CategoryName } from './catalog';
import type { QuizAnswers, RecommendResult } from '@/types';

function pickCategory(a: QuizAnswers): CategoryName {
  if (a.preference === 'clean') return 'Clean & Crisp';
  if (a.preference === 'warm') return 'Warm Cotton';
  if (a.preference === 'green') return 'Green Garden';
  return 'Soft Powder';
}

export function fallbackRecommend(a: QuizAnswers): RecommendResult {
  const category = pickCategory(a);
  const cat = CATEGORIES[category];
  const seed = (a.moodText || '').length + (a.showerTime?.length || 0);

  return {
    category,
    description: cat.defaultDescription,
    routine: [...cat.defaultRoutine],
    noteAxes: cat.defaultNoteAxes.map((n) => ({ ...n })),
    bodywash: { ...pickProduct(cat.bodywash, seed) },
    shampoo: { ...pickProduct(cat.shampoo, seed + 1) },
    nextPerfume: { ...pickProduct(cat.nextPerfume, seed + 2) },
    source: 'fallback',
  };
}