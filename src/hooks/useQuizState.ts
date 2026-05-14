import { useCallback, useEffect, useState } from 'react';
import type { QuizAnswers } from '@/types';

const STORAGE_KEY = 'scentfit:quiz:v1';

export type PartialAnswers = Partial<QuizAnswers>;

export const EMPTY_ANSWERS: PartialAnswers = {};

export function useQuizState() {
  const [answers, setAnswers] = useState<PartialAnswers>(() => {
    if (typeof window === 'undefined') return EMPTY_ANSWERS;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as PartialAnswers) : EMPTY_ANSWERS;
    } catch {
      return EMPTY_ANSWERS;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // sessionStorage 비활성/용량 초과 시 무시
    }
  }, [answers]);

  const setAnswer = useCallback(
    <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = useCallback(() => {
    setAnswers(EMPTY_ANSWERS);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, []);

  const isComplete = (a: PartialAnswers): a is QuizAnswers =>
    typeof a.showerTime === 'string' &&
    typeof a.preference === 'string' &&
    typeof a.space === 'string' &&
    typeof a.moodText === 'string' &&
    a.moodText.length >= 50;

  return { answers, setAnswer, reset, isComplete };
}