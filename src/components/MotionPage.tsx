import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { pageVariants } from './motion';

interface Props {
  children: ReactNode;
}

export default function MotionPage({ children }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : 'hidden'}
      animate="show"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
}