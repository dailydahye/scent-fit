import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_SOFT } from '@/components/motion';

interface Props {
  name: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export default function ChoiceCard({ name, title, description, selected, onSelect }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.label
      htmlFor={`${name}-${title}`}
      whileHover={reduce ? undefined : { y: -1 }}
      transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
      className={`group relative mt-3 flex cursor-pointer items-start gap-5 border-b px-1 py-5 transition-colors duration-500 ease-velvet first:mt-0 ${
        selected
          ? 'border-ink-900/60'
          : 'border-stone-100 hover:border-stone-300'
      }`}
    >
      <input
        type="radio"
        id={`${name}-${title}`}
        name={name}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />

      <span
        aria-hidden
        className={`mt-[6px] inline-block h-[7px] w-[7px] flex-shrink-0 rounded-full border transition-all duration-500 ease-velvet ${
          selected
            ? 'border-ink-900 bg-ink-900'
            : 'border-taupe-300 bg-transparent group-hover:border-taupe-500'
        }`}
      />

      <span className="flex-1 space-y-1.5">
        <span
          className={`font-ko block text-[15px] leading-snug transition-colors duration-500 ease-velvet sm:text-[16px] ${
            selected ? 'text-ink-900' : 'text-ink-700 group-hover:text-ink-900'
          }`}
        >
          {title}
        </span>
        <span className="font-ko block text-[13px] leading-relaxed text-taupe-500">
          {description}
        </span>
      </span>
    </motion.label>
  );
}
