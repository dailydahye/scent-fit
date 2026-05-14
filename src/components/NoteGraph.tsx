import { motion, useReducedMotion } from 'framer-motion';
import type { NoteAxis } from '@/types';
import { EASE_OUT_SOFT } from './motion';

interface Props {
  axes: NoteAxis[];
}

export default function NoteGraph({ axes }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="space-y-4"
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.08, delayChildren: 0.05 },
        },
      }}
    >
      {axes.map((a) => (
        <motion.div
          key={a.label}
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_SOFT } },
          }}
          className="space-y-1.5"
        >
          <div className="flex items-baseline justify-between text-[13px]">
            <span className="font-medium tracking-wide text-charcoal-800">{a.label}</span>
            <span className="tabular-nums text-charcoal-600/70">{a.value}</span>
          </div>
          <div className="relative h-[6px] w-full overflow-hidden rounded-full bg-beige-50">
            <motion.div
              initial={reduce ? { width: `${a.value}%` } : { width: 0 }}
              whileInView={{ width: `${Math.max(0, Math.min(100, a.value))}%` }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE_OUT_SOFT }}
              className="h-full rounded-full bg-gradient-to-r from-lavender-300 via-lavender-500 to-lavender-700"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}