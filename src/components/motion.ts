import type { Variants, Transition } from 'framer-motion';

// Apple/Byredo/Aesop 톤: 느린 fade + 미세 translate. spring 없음, 절제된 easing만.
export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT_SOFT = [0.65, 0, 0.35, 1] as const;

export const transitionBase: Transition = {
  duration: 0.6,
  ease: EASE_OUT_SOFT,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: transitionBase },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: EASE_OUT_SOFT } },
};

export const stagger = (children = 0.06, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: children,
      delayChildren,
    },
  },
});

export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_SOFT },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: EASE_OUT_SOFT },
  },
};

export const stepVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE_OUT_SOFT },
  },
  exit: {
    opacity: 0,
    x: -16,
    transition: { duration: 0.25, ease: EASE_OUT_SOFT },
  },
};

export const cardHover = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.4, ease: EASE_OUT_SOFT } },
};