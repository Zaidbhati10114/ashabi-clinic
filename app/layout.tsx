import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "../app/providers /ConvexClientProvider";
import { getClinicSchema } from "@/lib/clinic-schema";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ashabiclinic.com"),
  title: {
    default: "Ashabi Clinic | Dr. Sahirabanu Faruk Bhati",
    template: "%s | Ashabi Clinic Sangli",
  },
  description:
    "Homoeopathic Clinic in Sangli, Maharashtra. Practicing since 2008. Compassionate care for the whole family. Located in Hanuman Nagar, Dattanagar.",
  keywords: [
    "clinic in Sangli",
    "homeopathy clinic Sangli",
    "Ashabi Clinic",
    "Dr Sahirabanu Faruk Bhati",
    "general clinic Sangli",
    "Dattanagar clinic",
  ],
  openGraph: {
    title: "Ashabi Clinic | Dr. Sahirabanu Faruk Bhati",
    description:
      "Homoeopathic Clinic in Sangli, Maharashtra. Practicing since 2008. Compassionate care for the whole family.",
    url: "https://ashabiclinic.com",
    siteName: "Ashabi Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ashabi Clinic, Sangli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashabi Clinic | Dr. Sahirabanu Faruk Bhati",
    description:
      "Homoeopathic Clinic in Sangli, Maharashtra. Practicing since 2008.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.ashabiclinic.com",
  },
};

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clinicSchema = getClinicSchema();

  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
      </head>
      <body className="font-body bg-cream antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
