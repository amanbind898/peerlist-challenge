// app/layout.jsx
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from './providers/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var storedTheme = localStorage.getItem('theme');
                var shouldUseDark = storedTheme === 'dark';
                document.documentElement.classList.toggle('dark', shouldUseDark);
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors antialiased">
        <Providers>
          <Header />
          <main className="pt-16 min-h-screen">{children}</main>
          <Footer />
        
        </Providers>
      </body>
    </html>
  );
}
