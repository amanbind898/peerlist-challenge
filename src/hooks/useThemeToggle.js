'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Force ignore 'system' and resolve to explicit light/dark only
  const currentTheme = theme === 'dark' ? 'dark' : 'light';

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  // Set specific theme
  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  const setSystemTheme = () => setTheme('light');

  return {
    theme: currentTheme,
    isDark: currentTheme === 'dark',
    isLight: currentTheme === 'light',
    isSystem: false,
    mounted,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
  };
}
