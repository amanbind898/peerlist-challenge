// components/Header.jsx
'use client';
import Link from 'next/link';
import { Sun, Moon, Home } from 'lucide-react';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export default function Header() {
  const { theme, isDark, toggleTheme, mounted } = useThemeToggle();

  // Don't render theme toggle until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-2 rounded-full shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition">
          <Home size={18} /> Home
        </Link>
        <span className="h-5 w-px bg-gray-300 dark:bg-gray-600"></span>
        <div className="w-10 h-10"></div>
      </header>
    );
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-2 rounded-full shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700">
      <Link href="/" className="flex items-center gap-2 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition">
        <Home size={18} /> Home
      </Link>

      <span className="h-5 w-px bg-gray-300 dark:bg-gray-600"></span>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}
