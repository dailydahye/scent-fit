import { CATEGORIES, type CategoryName } from './catalog.js';
import type { QuizAnswers, RecommendResult, Product } from '../types/index.js';
function pickCategory(a: QuizAnswers): CategoryName {
  // 명시적 선호 매핑
  switch (a.preference) {
    case 'clean':
    case 'fresh':
      return 'Clean & Crisp';
    case 'warm':
    case 'cozy':
      return 'Warm Cotton';
    case 'green':
      return 'Green Garden';
    case 'powdery':
      return 'Soft Powder';
    case 'unsure':
    default:
      // unsure는 공간으로 보조 판단
      if (a.space === 'outdoor') return 'Green Garden';
      if (a.space === 'home') return 'Soft Powder';
      if (a.space === 'cafe') return 'Warm Cotton';
      return 'Clean & Crisp';
  }
}

// 제네릭 union type 추론 우회 — Product[]로 단언
function pick(arr: readonly Product[], seed: number): Product {
  const idx = Math.abs(seed) % arr.length;
  return { ...arr[idx] };
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
    bodywash: pick(cat.bodywash as readonly Product[], seed),
    shampoo: pick(cat.shampoo as readonly Product[], seed + 1),
    nextPerfume: pick(cat.nextPerfume as readonly Product[], seed + 2),
    source: 'fallback',
  };
}