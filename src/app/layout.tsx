import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Instrument_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const ogaranya = localFont({
  src: [
    {
      path: '../../public/fonts/OGARANYA-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-ogaranya',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ogaranya.vercel.app'),
  title: 'OGARANYA — Built For Conquest, Forged By Culture',
  description:
    'A high-contrast African display serif typeface born from the idea of power, wealth, kingship and conquest. Designed by Nebo Ikechukwu Kingsley, engineered by Daniel Nwachukwu.',
  keywords: [
    'Ogaranya',
    'African Typography',
    'Display Serif',
    'Typeface',
    'Nebo Ikechukwu Kingsley',
    'Daniel Nwachukwu',
    'Igbo',
    'African Design',
    'Font',
  ],
  authors: [
    { name: 'Nebo Ikechukwu Kingsley', url: 'https://x.com/uncle_nebo' },
    { name: 'Daniel Nwachukwu', url: 'https://x.com/dannyclassi_c' },
  ],
  creator: 'Daniel Nwachukwu & Nebo Ikechukwu Kingsley',
  openGraph: {
    title: 'OGARANYA — Built For Conquest, Forged By Culture',
    description:
      'A high-contrast African display serif typeface born from the idea of power, wealth, kingship and conquest.',
    url: 'https://ogaranya.vercel.app',
    siteName: 'OGARANYA Typeface',
    images: [
      {
        url: '/og-image.png',
        width: 1024,
        height: 588,
        alt: 'OGARANYA — Built For Conquest, Forged By Culture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OGARANYA — Built For Conquest, Forged By Culture',
    description:
      'A high-contrast African display serif typeface born from the idea of power, wealth, kingship and conquest.',
    creator: '@uncle_nebo',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ogaranya.variable} ${instrumentSans.variable}`}>
      <body className="bg-[#FAF6EC] text-[#653917] antialiased selection:bg-[#653917] selection:text-[#FAF6EC]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
