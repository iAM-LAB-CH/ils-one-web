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
        <link
          rel="preload"
          href="/fonts/PPMori-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/PPMori-SemiBold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-dark-950 text-dark-100 antialiased">
        {children}
      </body>
    </html>
  );
}
