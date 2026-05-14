import type { QuizAnswers } from '@/types';

export interface ChoiceOption<V extends string> {
  value: V;
  title: string;
  description: string;
}

export interface QuizStep<K extends keyof QuizAnswers> {
  key: K;
  eyebrow: string;
  question: string;
  hint?: string;
  type: 'single' | 'text';
  options?: ChoiceOption<Extract<QuizAnswers[K], string>>[];
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}

export const QUIZ_STEPS: [
  QuizStep<'showerTime'>,
  QuizStep<'preference'>,
  QuizStep<'space'>,
  QuizStep<'moodText'>,
] = [
  {
    key: 'showerTime',
    eyebrow: '하루의 시작',
    question: '주로 언제 샤워하시나요?',
    hint: '향이 머무는 시간대를 가늠하기 위한 질문이에요.',
    type: 'single',
    options: [
      { value: 'morning', title: '아침형', description: '하루를 깨끗하게 시작해요' },
      { value: 'evening', title: '저녁형', description: '하루를 차분하게 마무리해요' },
      { value: 'both', title: '둘 다', description: '아침과 저녁 모두 해요' },
    ],
  },
  {
    key: 'preference',
    eyebrow: '선호 감각',
    question: '어떤 느낌을 더 좋아하시나요?',
    type: 'single',
    options: [
      { value: 'clean', title: '깨끗한 느낌', description: '단정하고 정돈된 인상' },
      { value: 'cozy', title: '포근한 느낌', description: '부드럽고 따뜻한 분위기' },
      { value: 'fresh', title: '산뜻한 느낌', description: '가볍고 살아 있는 공기' },
      { value: 'unsure', title: '잘 모르겠어요', description: '추천에 맡길게요' },
    ],
  },
  {
    key: 'space',
    eyebrow: '머무는 공간',
    question: '평소 가장 오래 머무는 공간은요?',
    type: 'single',
    options: [
      { value: 'cafe', title: '카페·도서관', description: '조용하고 차분한 곳' },
      { value: 'home', title: '침실·거실', description: '편안한 일상의 공간' },
      { value: 'outdoor', title: '공원·야외', description: '자연과 가까운 곳' },
      { value: 'office', title: '사무실', description: '단정함이 필요한 곳' },
    ],
  },
  {
    key: 'moodText',
    eyebrow: '당신의 분위기',
    question: '당신의 평소 하루를 묘사해주세요',
    hint: '아침 루틴, 즐겨 입는 옷, 좋아하는 공간 등을 자유롭게 적어주세요.',
    type: 'text',
    placeholder:
      '예: 평일에는 7시에 일어나 샤워하고 출근해요. 셔츠나 깔끔한 니트를 자주 입고, 저녁엔 집에서 책을 읽거나 산책해요.',
    minLength: 50,
    maxLength: 300,
  },
];

export const TOTAL_STEPS = QUIZ_STEPS.length;