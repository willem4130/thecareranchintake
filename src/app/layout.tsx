import '@/styles/globals.css';
import { type Metadata } from 'next';
import { TRPCReactProvider } from '@/trpc/client';

export const metadata: Metadata = {
  title: 'The Care Ranch Intake',
  description: 'Intake management system for The Care Ranch',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
