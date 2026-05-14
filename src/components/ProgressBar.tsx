import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_SOFT } from './motion';

interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const reduce = useReducedMotion();
  const pct = Math.max(0, Math.min(100, (current / total) * 100));

  return (
    <div className="w-full">
      <div className="mb-3 flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-eyebrow">Diagnosis</p>
          <p className="text-sm tracking-wide text-charcoal-800">
            <span className="font-medium tabular-nums">{current}</span>
            <span className="mx-1.5 text-charcoal-700/40">/</span>
            <span className="tabular-nums text-charcoal-700/70">{total}</span>
          </p>
        </div>
        <span className="text-xs tabular-nums text-charcoal-700/60">
          {Math.round(pct)}%
        </span>
      </div>

      <div
        className="relative h-1 w-full overflow-hidden rounded-full bg-lavender-50"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          initial={reduce ? { width: `${pct}%` } : { width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
          className="relative h-full rounded-full bg-gradient-to-r from-lavender-400 via-lavender-500 to-lavender-700"
        >
          {!reduce && (
            <span
              aria-hidden
              className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-white/0 via-white/40 to-white/0 blur-sm animate-shimmer"
              style={{ backgroundSize: '200% 100%' }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}