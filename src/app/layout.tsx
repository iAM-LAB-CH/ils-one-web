import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ILS One | Platform for Programmable Reinsurance',
  description: 'ILS One is a full lifecycle platform for Institutional Investors, Reinsurers, Brokers and Agents to transform insurance-linked securities into programmable on-chain instruments.',
  icons: {
    icon: '/Favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-dark-950 text-dark-100 antialiased">
        {children}
      </body>
    </html>
  );
}
