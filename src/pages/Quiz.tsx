import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Layout from '@/components/Layout';
import ChoiceCard from '@/components/ChoiceCard';
import PrimaryButton from '@/components/PrimaryButton';
import MotionPage from '@/components/MotionPage';
import DiagnosisTransition from '@/components/DiagnosisTransition';
import { QUIZ_STEPS, TOTAL_STEPS } from '@/data/quiz-schema';
import { useQuizState } from '@/hooks/useQuizState';
import type { QuizAnswers } from '@/types';
import { stepVariants, stagger, fadeUp, EASE_OUT_SOFT } from '@/components/motion';

export default function Quiz() {
  const navigate = useNavigate();
  const { answers, setAnswer, isComplete } = useQuizState();
  const [stepIndex, setStepIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const reduce = useReducedMotion();

  const step = QUIZ_STEPS[stepIndex];
  const stepNum = stepIndex + 1;
  const progressPct = Math.round((stepNum / TOTAL_STEPS) * 100);

  const canProceed = useMemo(() => {
    if (step.type === 'single') {
      return typeof answers[step.key] === 'string';
    }
    const v = answers.moodText ?? '';
    return v.length >= (step.minLength ?? 0);
  }, [step, answers]);

  const onNext = () => {
    if (!canProceed) return;
    if (stepIndex < TOTAL_STEPS - 1) {
      setStepIndex((i) => i + 1);
      return;
    }
    if (isComplete(answers)) {
      // 결과로 즉시 가지 않고 cinematic transition 표시
      setTransitioning(true);
    }
  };

  const onTransitionComplete = () => {
    navigate('/result', { state: { answers } });
  };

  const onPrev = () => {
    if (stepIndex === 0) {
      navigate('/');
      return;
    }
    setStepIndex((i) => i - 1);
  };

  return (
    <>
      <MotionPage>
        <Layout variant="minimal">
          <div className="relative flex min-h-[calc(100vh-5rem)] flex-col">
            <div className="gradient-hero pointer-events-none absolute inset-0 -z-10 opacity-50" aria-hidden />
            <div className="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-30" aria-hidden />

            <div className="container-content flex flex-1 flex-col py-6 sm:py-8">
              {/* Progress */}
              <div className="mb-8 flex items-center justify-between sm:mb-10">
                <div className="flex items-baseline gap-4">
                  <p className="text-eyebrow">Diagnosis</p>
                  <span className="font-display text-[14px] tabular-nums text-taupe-500">
                    {String(stepNum).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-px w-32 overflow-hidden bg-stone-200 sm:w-56">
                    <motion.div
                      initial={false}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.9, ease: EASE_OUT_SOFT }}
                      className="h-full bg-ink-900"
                    />
                  </div>
                  <span className="font-display text-[11px] tabular-nums text-taupe-500">
                    {progressPct}%
                  </span>
                </div>
              </div>

              <div className="grid flex-1 gap-x-16 gap-y-8 lg:grid-cols-[7fr_4fr]">
                {/* Left */}
                <div className="flex flex-col">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={step.key}
                      variants={stepVariants}
                      initial={reduce ? false : 'hidden'}
                      animate="show"
                      exit="exit"
                      className="flex-1"
                    >
                      <p className="text-eyebrow mb-4">{step.eyebrow}</p>
                      <h1 className="font-ko text-[1.5rem] font-normal leading-[1.32] tracking-[-0.03em] text-ink-900 sm:text-[1.875rem] lg:text-[2.125rem]">
                        {step.question}
                      </h1>
                      {step.hint && (
                        <p className="font-ko mt-3 text-[13px] leading-relaxed text-taupe-500">
                          {step.hint}
                        </p>
                      )}

                      <motion.div
                        variants={stagger(0.06)}
                        initial={reduce ? false : 'hidden'}
                        animate="show"
                        className="mt-8 sm:mt-10"
                      >
                        {step.type === 'single' &&
                          step.options?.map((opt) => {
                            const selected = answers[step.key] === opt.value;
                            return (
                              <motion.div key={opt.value} variants={fadeUp}>
                                <ChoiceCard
                                  name={step.key}
                                  title={opt.title}
                                  description={opt.description}
                                  selected={selected}
                                  onSelect={() =>
                                    setAnswer(step.key, opt.value as QuizAnswers[typeof step.key])
                                  }
                                />
                              </motion.div>
                            );
                          })}

                        {step.type === 'text' && (
                          <motion.div variants={fadeUp}>
                            <TextStep
                              value={answers.moodText ?? ''}
                              onChange={(v) => setAnswer('moodText', v)}
                              placeholder={step.placeholder}
                              minLength={step.minLength ?? 50}
                              maxLength={step.maxLength ?? 300}
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex items-center justify-between gap-3 border-t border-stone-100 pt-6">
                    <PrimaryButton variant="ghost" onClick={onPrev}>
                      <span aria-hidden>←</span>
                      {stepIndex === 0 ? '처음으로' : '이전'}
                    </PrimaryButton>
                    <PrimaryButton onClick={onNext} disabled={!canProceed} size="lg">
                      {stepNum === TOTAL_STEPS ? '결과를 봅니다' : '다음'}
                      <span aria-hidden>→</span>
                    </PrimaryButton>
                  </div>
                </div>

                {/* Right */}
                <aside className="hidden lg:block">
                  <div className="sticky top-28 space-y-5">
                    <p className="text-eyebrow">Note Preview</p>
                    <p className="font-ko text-[13px] leading-[1.75] text-taupe-500">
                      각 답변이 시트러스·머스크·우디·플로럴 등 향 축의 분포를 미세하게 조정합니다.
                      당신의 결은 진단이 끝날 때 드러납니다.
                    </p>
                    <div className="h-px w-12 bg-stone-200" aria-hidden />
                    <p className="font-display text-[13px] italic leading-relaxed text-taupe-400">
                      "The diagnosis is not a test.
                      <br />
                      It is a quiet conversation."
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </Layout>
      </MotionPage>

      {/* Cinematic transition overlay */}
      <AnimatePresence>
        {transitioning && (
          <DiagnosisTransition onComplete={onTransitionComplete} duration={3200} />
        )}
      </AnimatePresence>
    </>
  );
}

interface TextStepProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minLength: number;
  maxLength: number;
}

function TextStep({ value, onChange, placeholder, minLength, maxLength }: TextStepProps) {
  const remaining = maxLength - value.length;
  const tooShort = value.length > 0 && value.length < minLength;
  const ok = value.length >= minLength;

  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder={placeholder}
        rows={4}
        className="font-ko w-full resize-none border-b border-stone-200 bg-transparent py-3 text-[15px] leading-[1.8] text-ink-900 placeholder:text-taupe-400/60 focus:border-ink-900 focus:outline-none"
      />
      <div className="flex items-center justify-between text-[11px] tracking-wider-2 text-taupe-400">
        <span>
          {tooShort
            ? `최소 ${minLength}자 — ${minLength - value.length}자 더`
            : ok
              ? '잘 적어주셨어요'
              : `MINIMUM ${minLength} CHARACTERS`}
        </span>
        <span className="font-display tabular-nums">{remaining}</span>
      </div>
    </div>
  );
}