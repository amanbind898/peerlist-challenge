'use client';
import Link from 'next/link';
import { Github, Twitter, Mail, Heart } from 'lucide-react';
import { useThemeToggle } from '@/hooks/useThemeToggle';

export default function Footer() {
  const { isDark } = useThemeToggle();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Brand */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span className="text-sm">Made with</span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span className="text-sm">by Aman Bind</span>
          </div>

          {/* Center - Navigation */}
          <nav className="flex items-center gap-6 text-sm">
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/day1" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Challenge
            </Link>
            <Link 
              href="https://peerlist.io/akb898" 
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Peerlist
            </Link>
          </nav>

          {/* Right side - Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/amanbind898"
              target="_blank"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={18} />
            </Link>
            <Link
              href="https://x.com/akb_898"
              target="_blank"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="mailto:amanbind898@gmail.com"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={18} />
            </Link>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © 2024 Aman Bind. All rights reserved. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
