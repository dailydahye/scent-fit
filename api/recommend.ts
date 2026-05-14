import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CATEGORIES, type CategoryName } from '../src/data/catalog.js';
import { fallbackRecommend } from '../src/data/recommend-fallback.js';
import type { QuizAnswers, RecommendResult, Product } from '../src/types/index.js';

const TIMEOUT_MS = 8000;
const VALID_CATEGORIES: CategoryName[] = [
  'Clean & Crisp',
  'Warm Cotton',
  'Green Garden',
  'Soft Powder',
];

function pick(arr: readonly Product[], seed: number): Product {
  const idx = Math.abs(seed) % arr.length;
  return { ...arr[idx] };
}

function sanitizeAxes(raw: unknown): { label: string; value: number }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((r) => {
      if (!r || typeof r !== 'object') return null;
      const obj = r as Record<string, unknown>;
      const label = typeof obj.label === 'string' ? obj.label : '';
      const v = typeof obj.value === 'number' ? obj.value : Number(obj.value);
      if (!label) return null;
      if (!Number.isFinite(v)) return null;
      const value = Math.max(0, Math.min(100, Math.round(v)));
      return { label, value };
    })
    .filter((x): x is { label: string; value: number } => x !== null)
    .slice(0, 5);
}

async function callOpenAI(answers: QuizAnswers): Promise<RecommendResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const prompt = `당신은 매거진 톤의 향 큐레이터입니다. 사용자의 답변을 보고 4개 카테고리 중 하나를 고르세요:
- Clean & Crisp (시트러스, 깨끗함)
- Warm Cotton (머스크, 따스함)
- Green Garden (그린, 신선함)
- Soft Powder (파우더리, 부드러움)

답변:
- 샤워 시간: ${answers.showerTime}
- 선호: ${answers.preference}
- 공간: ${answers.space}
- 분위기 설명: ${answers.moodText}

다음 JSON 형식으로만 응답하세요 (다른 텍스트 없이):
{
  "category": "Clean & Crisp" | "Warm Cotton" | "Green Garden" | "Soft Powder",
  "description": "사용자의 결을 매거진 톤으로 2-3문장 설명 (한국어)",
  "routine": ["루틴 1", "루틴 2", "루틴 3", "루틴 4"],
  "noteAxes": [
    {"label": "노트 영문명", "value": 0-100},
    ... 정확히 5개
  ]
}`;

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);
    if (!resp.ok) return null;
    const data: any = await resp.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') return null;

    const parsed = JSON.parse(content);
    const cat = parsed.category;
    if (!VALID_CATEGORIES.includes(cat)) return null;

    const category = cat as CategoryName;
    const meta = CATEGORIES[category];
    const seed = (answers.moodText || '').length;

    return {
      category,
      description: typeof parsed.description === 'string' ? parsed.description : meta.defaultDescription,
      routine: Array.isArray(parsed.routine) && parsed.routine.length > 0
        ? parsed.routine.slice(0, 4).map(String)
        : [...meta.defaultRoutine],
      noteAxes: (() => {
        const ax = sanitizeAxes(parsed.noteAxes);
        return ax.length === 5 ? ax : meta.defaultNoteAxes.map((n) => ({ ...n }));
      })(),
      bodywash: pick(meta.bodywash as readonly Product[], seed),
      shampoo: pick(meta.shampoo as readonly Product[], seed + 1),
      nextPerfume: pick(meta.nextPerfume as readonly Product[], seed + 2),
      source: 'ai',
    };
  } catch {
    clearTimeout(timer);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const answers = req.body as QuizAnswers;
  if (!answers || typeof answers.moodText !== 'string') {
    res.status(400).json({ error: 'Invalid answers' });
    return;
  }

  const aiResult = await callOpenAI(answers);
  const result = aiResult ?? fallbackRecommend(answers);
  res.status(200).json(result);
}
