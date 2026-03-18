import { Variants, Transition } from 'framer-motion';

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 140,
  damping: 20,
  mass: 1,
};

export const springPop: Transition = {
  type: 'spring',
  stiffness: 220,
  damping: 18,
  mass: 0.7,
};

export const fadeInUp = (delay = 0, distance = 24): Variants => ({
  initial: { opacity: 0, y: distance },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.21, 1.02, 0.73, 1],
    },
  },
});

export const fadeIn = (delay = 0): Variants => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: 'easeOut',
    },
  },
});

export const scaleIn = (delay = 0): Variants => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
});

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
