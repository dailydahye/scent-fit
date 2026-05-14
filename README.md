# Scent Fit

향에 관심 없던 사용자를 위한 일상 향 진단 웹앱.
바디워시·샴푸에서 시작해 자연스럽게 퍼퓸으로 이어지는 큐레이션을 지향합니다.

## Stack

- Vite 5 · React 18 · TypeScript 5
- React Router 6
- Tailwind CSS 3 + Framer Motion 11
- Vercel (Static + Serverless Functions, Node 20)
- OpenAI `gpt-4o-mini` (서버 측 호출, 실패 시 fallback)

## Routes

| Path | 설명 |
| --- | --- |
| `/` | 랜딩 |
| `/quiz` | 4단계 진단 |
| `/result` | 진단 결과 |
| `/api/recommend` | OpenAI 추천 (서버 전용) |

## Local development

```bash
npm install
cp .env.example .env.local   # OPENAI_API_KEY 입력 (없어도 fallback 동작)
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. GitHub에 푸시
2. Vercel → New Project → Import
3. Framework Preset: Vite (자동 감지)
4. Environment Variables: `OPENAI_API_KEY` 등록 (Production / Preview / Development)
5. Node.js Version: 20.x
6. Deploy
