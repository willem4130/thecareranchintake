import '@/styles/globals.css';
import { type Metadata } from 'next';
import { TRPCReactProvider } from '@/trpc/client';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';

// Heading font - Playfair Display (Elegant Serif)
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
});

// Body font - Source Sans 3 (Clean Sans-serif)
const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Care Ranch Intake',
  description: 'Leadership retreat intake questionnaire system',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${sourceSans3.variable}`}>
      <body className="font-sans antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
