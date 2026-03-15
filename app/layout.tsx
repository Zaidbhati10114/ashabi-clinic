import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ashabi Clinic | Dr. Sahirabanu Faruk Bhati',
  description:
    'Homoeopathic Clinic in Sangli, Maharashtra. Practicing since 2008. Compassionate care for the whole family.',
};

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const bodyFont = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="font-body bg-cream antialiased">
        {children}
      </body>
    </html>
  );
}