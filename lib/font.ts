import { Inter } from 'next/font/google';

// Fetched at build time and served from this site, so pages load nothing from
// Google. Every <html> sets inter.variable, since --font-sans starts with it.
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
