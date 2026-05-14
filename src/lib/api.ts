import { fallbackRecommend } from '@/data/recommend-fallback';
import type { QuizAnswers, RecommendResult } from '@/types';

export async function fetchRecommendation(
  answers: QuizAnswers
): Promise<RecommendResult> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9_000); // 클라 9s, 서버 8s
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as RecommendResult;
    if (!data.category || !data.bodywash || !data.shampoo) {
      throw new Error('Invalid response shape');
    }
    return data;
  } catch (err) {
    console.warn('[recommend] falling back:', err);
    return fallbackRecommend(answers);
  }
}