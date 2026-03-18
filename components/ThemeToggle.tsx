'use client';

import { useEffect } from 'react';

export default function ThemeToggle() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.setAttribute('data-theme', 'midnight');
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('themePalette', 'midnight');
  }, []);

  return null;
}
