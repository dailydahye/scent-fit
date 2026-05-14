import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Layout from '@/components/Layout';
import PrimaryButton from '@/components/PrimaryButton';
import ProductCard from '@/components/ProductCard';
import { ResultSkeleton } from '@/components/Skeleton';
import MotionPage from '@/components/MotionPage';
import { useQuizState } from '@/hooks/useQuizState';
import { fetchRecommendation } from '@/lib/api';
import { fallbackRecommend } from '@/data/recommend-fallback';
import type { QuizAnswers, RecommendResult } from '@/types';
import { fadeUp, stagger, EASE_OUT_SOFT } from '@/components/motion';

interface LocationState {
  answers?: QuizAnswers;
}

const CATEGORY_TONE: Record<string, { gradient: string; eyebrow: string; mood: string }> = {
  'Clean & Crisp': { gradient: 'gradient-crisp', eyebrow: 'Identity 01', mood: 'the morning air' },
  'Warm Cotton': { gradient: 'gradient-cotton', eyebrow: 'Identity 02', mood: 'sunlit cotton' },
  'Green Garden': { gradient: 'gradient-garden', eyebrow: 'Identity 03', mood: 'after the rain' },
  'Soft Powder': { gradient: 'gradient-powder', eyebrow: 'Identity 04', mood: 'the quiet evening' },
};

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers: stateAnswers, isComplete, reset } = useQuizState();
  const reduce = useReducedMotion();

  const fromNav = (location.state as LocationState | null)?.answers;
  const answers: QuizAnswers | null =
    fromNav && typeof fromNav.moodText === 'string'
      ? fromNav
      : isComplete(stateAnswers)
        ? stateAnswers
        : null;

  const [result, setResult] = useState<RecommendResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let alive = true;
    if (!answers) {
      const dummy: QuizAnswers = {
        showerTime: 'morning',
        preference: 'clean',
        space: 'office',
        moodText: '아침에 샤워하고 깔끔한 셔츠로 출근해요. 단정한 인상을 좋아하고 진하지 않은 향을 선호합니다.',
      };
      setResult(fallbackRecommend(dummy));
      const t = setTimeout(() => alive && setLoading(false), 350);
      return () => { alive = false; clearTimeout(t); };
    }
    setLoading(true);
    fetchRecommendation(answers).then((r) => {
      if (!alive) return;
      setResult(r);
      setLoading(false);
    });
    return () => { alive = false; };
  }, [answers]);

  if (loading || !result) {
    return (
      <MotionPage>
        <Layout variant="minimal">
          <ResultSkeleton />
        </Layout>
      </MotionPage>
    );
  }

  const onRestart = () => { reset(); navigate('/quiz'); };
  const tone = CATEGORY_TONE[result.category] ?? CATEGORY_TONE['Clean & Crisp'];

  return (
    <MotionPage>
      <Layout variant="minimal">
        {/* ═══ CHAPTER 01 — Identity ═══ */}
        <section className="relative min-h-[78vh] overflow-hidden">
          <div className={`${tone.gradient} pointer-events-none absolute inset-0 -z-20`} aria-hidden />
          <div className="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-25" aria-hidden />

          <div className="container-content flex min-h-[78vh] flex-col justify-center py-20 sm:py-28">
            <motion.div
              variants={stagger(0.14, 0.3)}
              initial={reduce ? false : 'hidden'}
              animate="show"
              className="max-w-3xl space-y-8"
            >
              <motion.p variants={fadeUp} className="text-eyebrow">
                Your Scent Identity · {tone.eyebrow}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="font-display text-[3.5rem] leading-[1] text-ink-900 sm:text-[5rem] lg:text-[5.5rem]"
              >
                {result.category}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="font-display text-[1.5rem] italic leading-snug text-taupe-500 sm:text-[1.875rem]"
              >
                — {tone.mood}
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-ko max-w-xl text-[15px] leading-[1.85] text-ink-700 sm:text-[16px]"
              >
                {result.description}
              </motion.p>

              <motion.div variants={fadeUp} className="flex items-center gap-4 pt-6">
                <span className="font-display text-[11px] italic text-taupe-400">
                  Scroll to read your full diagnosis
                </span>
                <span className="h-px w-12 bg-taupe-400/40" aria-hidden />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══ CHAPTER 02 — Note Distribution ═══ */}
        <section className="border-t border-stone-100">
          <div className="container-content py-20 sm:py-28">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_OUT_SOFT }}
              className="mb-12 max-w-xl space-y-4 sm:mb-16"
            >
              <p className="font-display text-[12px] italic text-taupe-400">Chapter 02</p>
              <p className="text-eyebrow">Note Distribution</p>
              <h2 className="font-ko text-[1.75rem] font-normal leading-[1.3] tracking-[-0.03em] text-ink-900 sm:text-[2rem]">
                당신의 향 분포
              </h2>
              <p className="font-ko pt-1 text-[13px] leading-[1.8] text-taupe-500">
                대표적인 향 축에서 당신의 분포입니다. 가장 도드라지는 노트가 당신의 결을 만듭니다.
              </p>
            </motion.div>

            <motion.div
              variants={stagger(0.1, 0.2)}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid gap-x-16 gap-y-10 lg:grid-cols-[5fr_6fr]"
            >
              {/* 좌측 — Dominant note */}
              <motion.div variants={fadeUp} className="space-y-6">
                <p className="font-display text-[11px] italic text-taupe-400">Dominant Note</p>
                <div className="space-y-2">
                  <p className="font-display text-[5rem] leading-[0.95] text-ink-900 sm:text-[6rem]">
                    {result.noteAxes[0]?.value ?? 0}
                  </p>
                  <p className="font-ko text-[18px] text-ink-700">
                    {result.noteAxes[0]?.label ?? ''}
                  </p>
                </div>
                <p className="font-ko max-w-xs pt-3 text-[13px] leading-[1.85] text-taupe-500">
                  당신의 결을 만드는 가장 도드라진 노트입니다. 다른 노트가 이 결을 보완해줍니다.
                </p>
              </motion.div>

              {/* 우측 — 5축 dot 라인 */}
              <motion.ul variants={fadeUp} className="space-y-6">
                {result.noteAxes.map((axis, i) => (
                  <motion.li key={axis.label} variants={fadeUp} className="space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-ko text-[14px] text-ink-700">
                        <span className="font-display mr-3 text-[11px] italic text-taupe-400">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {axis.label}
                      </span>
                      <span className="font-display text-[14px] tabular-nums text-ink-900">
                        {axis.value}
                      </span>
                    </div>
                    <div className="flex items-center gap-[3px]">
                      {Array.from({ length: 24 }).map((_, dotIdx) => {
                        const threshold = (dotIdx + 1) * (100 / 24);
                        const active = axis.value >= threshold;
                        return (
                          <motion.span
                            key={dotIdx}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: active ? 1 : 0.15 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.3 + dotIdx * 0.02,
                              ease: EASE_OUT_SOFT,
                            }}
                            className={`h-[3px] flex-1 ${active ? 'bg-ink-900' : 'bg-stone-200'}`}
                          />
                        );
                      })}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </section>

        {/* ═══ CHAPTER 03 — Daily Routine ═══ */}
        <section className="border-t border-stone-100">
          <div className="container-content py-20 sm:py-28">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_OUT_SOFT }}
              className="mb-10 max-w-xl space-y-4 sm:mb-14"
            >
              <p className="font-display text-[12px] italic text-taupe-400">Chapter 03</p>
              <p className="text-eyebrow">Daily Routine</p>
              <h2 className="font-ko text-[1.75rem] font-normal leading-[1.3] tracking-[-0.03em] text-ink-900 sm:text-[2rem]">
                당신을 위한 일상 루틴
              </h2>
              <p className="font-ko pt-1 text-[13px] leading-[1.8] text-taupe-500">
                하루의 흐름 안에서, 향이 자연스럽게 머무를 자리를 안내드립니다.
              </p>
            </motion.div>

            <motion.ol
              variants={stagger(0.1, 0.2)}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-0"
            >
              {result.routine.map((line, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="grid grid-cols-[auto_1fr] items-start gap-x-8 gap-y-2 border-b border-stone-100 py-6 sm:grid-cols-[100px_1fr] sm:gap-x-14 sm:py-7"
                >
                  <span className="font-display text-[1.375rem] italic tabular-nums text-taupe-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-ko text-[15px] leading-[1.85] text-ink-700 sm:text-[16px]">
                    {line}
                  </span>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </section>

        {/* ═══ CHAPTER 04 — Recommended (가로 3열 그리드) ═══ */}
        <section className="relative overflow-hidden border-t border-stone-100">
          <div
            className={`${tone.gradient} pointer-events-none absolute inset-0 -z-10 opacity-40`}
            aria-hidden
          />
          <div className="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-25" aria-hidden />

          <div className="container-content py-20 sm:py-28">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_OUT_SOFT }}
              className="mb-12 max-w-xl space-y-4 sm:mb-16"
            >
              <p className="font-display text-[12px] italic text-taupe-400">Chapter 04</p>
              <p className="text-eyebrow">Recommended for You</p>
              <h2 className="font-ko text-[1.75rem] font-normal leading-[1.3] tracking-[-0.03em] text-ink-900 sm:text-[2rem]">
                당신의 결에 머무는 향
              </h2>
              <p className="font-ko pt-1 text-[13px] leading-[1.8] text-taupe-500">
                매일 쓰는 두 가지에서 시작합니다.
                <br />
                익숙해질 때쯤, 같은 결의 퍼퓸이 자연스럽게 따라옵니다.
              </p>
            </motion.div>

            {/* 가로 3열 그리드 — 모바일에선 세로 적층 */}
            <motion.div
              variants={stagger(0.12, 0.1)}
              initial={reduce ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-x-10 gap-y-12 md:grid-cols-3 md:gap-x-12"
            >
              <motion.div variants={fadeUp}>
                <ProductCard
                  kind="bodywash"
                  product={result.bodywash}
                  reason="샤워의 첫 단계에 어울리는 결. 향이 가장 자연스럽게 머무는 시간입니다."
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <ProductCard
                  kind="shampoo"
                  product={result.shampoo}
                  reason="머리카락에 자연스럽게 머무는 향. 잔향이 부담스럽지 않은 것이 핵심입니다."
                />
              </motion.div>
              <motion.div variants={fadeUp}>
                <ProductCard
                  kind="next"
                  product={result.nextPerfume}
                  reason="이 향 계열이 익숙해질 때쯤, 같은 결의 퍼퓸으로 한 단계 넓혀보세요."
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══ CHAPTER 05 — Closing ═══ */}
        <section className="border-t border-stone-100">
          <div className="container-content py-24 sm:py-32">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: EASE_OUT_SOFT }}
              className="max-w-3xl space-y-10"
            >
              <p className="font-display text-[12px] italic text-taupe-400">Closing</p>
              <p className="font-display text-[1.5rem] italic leading-[1.45] text-ink-700 sm:text-[1.875rem]">
                A scent is a quiet portrait
                <br />
                of the way you live.
              </p>
              <p className="font-ko text-[14px] leading-[1.85] text-taupe-500">
                향은 사는 것이 아니라, 일상 속에서 천천히 드러나는 당신의 결입니다.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <PrimaryButton size="lg" onClick={onRestart}>
                  다시 진단받기
                  <span aria-hidden>→</span>
                </PrimaryButton>
                <Link to="/">
                  <PrimaryButton variant="ghost" size="lg">
                    처음으로
                  </PrimaryButton>
                </Link>
                <span className="ml-2 font-display text-[11px] italic text-taupe-400">
                  {result.source === 'ai' ? 'Analyzed by AI' : 'Offline matching'}
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </MotionPage>
  );
}