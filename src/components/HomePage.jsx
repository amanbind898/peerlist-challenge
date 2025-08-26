'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export default function HomePage() {
  const { isDark, mounted } = useThemeToggle();
  const days = Array.from({ length: 2 }, (_, i) => i + 1);

  return (
    <div className={mounted && isDark ? 'dark' : ''}>
      <div className="font-serif grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <main className="flex flex-col gap-10 row-start-2 items-center text-center">
        <h1 className="text-5xl font-normal mb-2">
         Interaction Design Challenge
        </h1>

        <p className="text-xl font-light text-gray-600 dark:text-gray-300 max-w-xl">
          Hey, I'm Aman Bind – a passionate developer (B.Tech CSE, IIIT Bhagalpur) sharing my 7-day coding challenge journey. Explore my projects, connect with me, and track my progress!
        </p>

        <div className="flex flex-row gap-6 mt-6 flex-wrap justify-center">
          {[
            {
              href: 'https://peerlist.io/akb898',
              label: '/akb898',
              img: 'https://dqy38fnwh4fqs.cloudfront.net/website/peerlist-logo-full-light.svg',
              alt: 'Peerlist',
              width: 120,
              height: 28,
              hover: 'hover:text-blue-700 dark:hover:text-blue-500',
              darkBg: 'dark:bg-gray-800/80',
            },
            {
              href: 'https://github.com/amanbind898',
              label: '/amanbind898',
              img: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
              alt: 'GitHub',
              width: 28,
              height: 28,
              hover: 'hover:text-gray-800 dark:hover:text-gray-700',
              darkBg: 'dark:bg-gray-800/80',
            },
            {
              href: 'https://x.com/akb_898',
              label: '/akb_898',
              img: 'https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000',
              alt: 'X',
              width: 28,
              height: 28,
              hover: 'hover:text-blue-500 dark:hover:text-blue-400',
              darkBg: 'dark:bg-gray-800/80',
            },
          ].map((link, i) => (
            <Link
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm 
                bg-white/80 ${link.darkBg} hover:bg-gray-100 dark:hover:bg-gray-700 
                text-gray-800 dark:text-gray-100 transition-all duration-200
                ${link.hover}
              `}
            >
              <Image src={link.img} alt={link.alt} width={link.width} height={link.height} className="rounded-md" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>

        <nav className="flex flex-col gap-3 mt-8 items-center">
          <span className="font-medium text-gray-600 dark:text-gray-400 mb-1">7 Days Challenge Pages:</span>
          <div className="flex flex-wrap justify-center gap-4">
            {days.map((day) => (
              <Link
                key={day}
                href={`/day${day}`}
                className="rounded-md bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-700 text-blue-900 dark:text-blue-100 px-4 py-2 font-semibold transition-colors"
              >
                Day {day}
              </Link>
            ))}
          </div>
        </nav>
        </main>
      </div>
    </div>
  );
}
