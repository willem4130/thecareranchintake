import '@/styles/globals.css';
import { type Metadata } from 'next';
import { TRPCReactProvider } from '@/trpc/client';
import { Libre_Franklin } from 'next/font/google';
import localFont from 'next/font/local';

// Editorial serif font - Using Georgia as system font (Miller Text fallback)
const millerText = localFont({
  src: [],
  variable: '--font-miller',
  fallback: ['Georgia', 'serif'],
  display: 'swap',
});

// Sans-serif for UI elements
const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-libre',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Care Ranch Intake',
  description: 'Leadership retreat intake questionnaire system',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${millerText.variable} ${libreFranklin.variable}`}>
      <body className="font-serif antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
