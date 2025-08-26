'use client';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export default function DayPage({ dayNumber, title, children }) {
  const { isDark, mounted } = useThemeToggle();

  return (
    <div className="instrument-serif-regular min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
      <div className="container mx-auto px-8 py-16">
        <main className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl  mb-4">Welcome to Day {dayNumber}</h1>
            {title && <h2 className="text-2xl text-gray-600 dark:text-gray-400">{title}</h2>}
          </div>
          
         

          {/* Content area */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {children || (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p>Content for Day {dayNumber} will be added here.</p>
                <p className="text-sm mt-2">Check back soon for updates!</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-center gap-4">
            {dayNumber > 1 && (
              <a
                href={`/day${dayNumber - 1}`}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
              >
                ← Day {dayNumber - 1}
              </a>
            )}
            {dayNumber < 7 && (
              <a
                href={`/day${dayNumber + 1}`}
                className="px-4 py-2 bg-blue-200 dark:bg-blue-700 hover:bg-blue-300 dark:hover:bg-blue-600 text-blue-800 dark:text-blue-200 rounded-md transition-colors"
              >
                Day {dayNumber + 1} →
              </a>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
