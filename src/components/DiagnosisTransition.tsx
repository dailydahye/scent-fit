import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const STAGES = [
  { en: 'Reading your day', ko: '당신의 하루를 읽는 중' },
  { en: 'Tracing the texture', ko: '결을 따라가는 중' },
  { en: 'Composing the accord', ko: '향의 결을 조합하는 중' },
  { en: 'Refining the silence', ko: '잔향을 다듬는 중' },
];

const FLOATING_NOTES = [
  'CITRUS',
  'MUSK',
  'WOOD',
  'POWDER',
  'GREEN',
  'AMBER',
  'IRIS',
  'CEDAR',
];

interface Props {
  onComplete: () => void;
  duration?: number; // 총 지속 시간 (ms)
}

export default function DiagnosisTransition({ onComplete, duration = 3200 }: Props) {
  const reduce = useReducedMotion();
  const [stageIndex, setStageIndex] = useState(0);

  // Reduced motion: 즉시 완료
  useEffect(() => {
    if (reduce) {
      const t = setTimeout(onComplete, 300);
      return () => clearTimeout(t);
    }
  }, [reduce, onComplete]);

  // 단계별 진행
  useEffect(() => {
    if (reduce) return;
    const stageDuration = duration / STAGES.length;
    const id = setInterval(() => {
      setStageIndex((i) => {
        if (i >= STAGES.length - 1) {
          clearInterval(id);
          return i;
        }
        return i + 1;
      });
    }, stageDuration);
    return () => clearInterval(id);
  }, [reduce, duration]);

  // 전체 완료 후 onComplete
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(onComplete, duration);
    return () => clearTimeout(t);
  }, [reduce, duration, onComplete]);

  const stage = STAGES[stageIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-ivory"
    >
      {/* Ambient layers */}
      <div
        className="gradient-hero pointer-events-none absolute inset-0 animate-drift-slow"
        aria-hidden
      />
      <div
        className="gradient-vapor pointer-events-none absolute inset-0 animate-breathe"
        aria-hidden
      />
      <div
        className="bg-grain pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
      />

      {/* Floating notes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {FLOATING_NOTES.map((note, i) => {
          const top = 12 + ((i * 11) % 76);
          const left = 6 + ((i * 17) % 84);
          const delay = (i * 0.25) % 2;
          return (
            <motion.span
              key={note}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: [0, 0.35, 0.15, 0.4, 0], y: [-4, -16, -10, -22, -30] }}
              transition={{
                duration: 6,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="font-display absolute text-[10px] uppercase tracking-wider-3 text-taupe-400"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              {note}
            </motion.span>
          );
        })}
      </div>

      {/* Center content */}
      <div className="container-content relative z-10 flex flex-col items-center text-center">
        {/* 진행 인디케이터 */}
        <div className="mb-16 flex items-center gap-3">
          {STAGES.map((_, i) => (
            <span
              key={i}
              className={`h-px transition-all duration-700 ease-velvet ${
                i <= stageIndex ? 'w-10 bg-ink-900' : 'w-6 bg-stone-200'
              }`}
            />
          ))}
        </div>

        {/* 영문 stage */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`en-${stageIndex}`}
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[11px] uppercase tracking-wider-3 text-taupe-500"
          >
            {stage.en}
          </motion.p>
        </AnimatePresence>

        {/* 한글 stage */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={`ko-${stageIndex}`}
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="font-ko mt-8 text-[1.5rem] font-normal leading-[1.35] tracking-[-0.02em] text-ink-900 sm:text-[1.875rem] lg:text-[2.25rem]"
          >
            {stage.ko}
          </motion.h2>
        </AnimatePresence>

        {/* shimmer line */}
        <div className="mt-14 h-px w-32 overflow-hidden bg-stone-200">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-ink-900 to-transparent"
          />
        </div>

        {/* 시적 quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display absolute bottom-16 left-1/2 -translate-x-1/2 text-[12px] italic text-taupe-400"
        >
          A quiet conversation between you and the air.
        </motion.p>
      </div>
    </motion.div>
  );
}