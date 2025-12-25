import type { Metadata } from 'next';
import { Outfit, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'SkillConnect JK - Skill Development Loans for J&K Youth',
  description:
    'Outcome-linked skilling credit platform for youth in Jammu & Kashmir. Get skill loans from ₹5,000 to ₹1,50,000 with milestone-based disbursement.',
  keywords: [
    'skill development',
    'education loan',
    'J&K',
    'Kashmir',
    'Jammu',
    'vocational training',
    'skill loan',
    'PMKVY',
  ],
  authors: [{ name: 'SkillConnect JK' }],
  openGraph: {
    title: 'SkillConnect JK',
    description: 'Skill Development Loans for J&K Youth',
    type: 'website',
    locale: 'en_IN',
    alternateLocale: ['hi_IN', 'ur_IN'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

