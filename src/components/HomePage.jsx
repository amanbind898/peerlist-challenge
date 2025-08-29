'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export default function HomePage() {
  const { isDark, mounted } = useThemeToggle();
  const days = Array.from({ length: 7 }, (_, i) => i + 1);
  const [cardClicked, setCardClicked] = useState(false);
const router = useRouter();

function handleCardClick(e) {
  e.preventDefault();
  setCardClicked(true);
  setTimeout(() => {
    router.push('/day3');
  }, 500); // duration matches animation
}

  return (
    <div className="font-serif grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex flex-col gap-10 row-start-2 items-center text-center p-4">
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
          
          {/* --- Challenge Card --- */}
       <motion.div
  layout
  initial={{ scale: 1, opacity: 1 }}
  animate={cardClicked ? { scale: 1.15, opacity: 0 } : { scale: 1, opacity: 1 }}
  transition={{ duration: 0.5 }}
  onClick={handleCardClick}
  className="group block max-w-xs w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 mt-8 cursor-pointer"
>
  <div className="flex flex-col items-center text-center">
    <Image
      src="/peerlist-challenge-accepted.png"
      alt="Challenge Accepted Graphic"
      width={150}
      height={150}
      className="rounded-lg mb-4 transform group-hover:scale-105 transition-transform duration-300"
    />
    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
      DAY 3 card to Page
    </h5>
  </div>
</motion.div>
          {/* --- End of Challenge Card --- */}

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
  );
}