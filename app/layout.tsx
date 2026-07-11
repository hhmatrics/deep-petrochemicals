import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { COMPANY, SITE_URL } from "@/data/company";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const DESCRIPTION =
  "Deep Petrochemicals Limited manufactures methanol, isobutylene, MTBE and specialty chemicals at Saykha GIDC, Bharuch, Gujarat. Consistent quality, reliable bulk supply, ISO-certified processes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.legalName} — Petrochemical Manufacturer, Bharuch, Gujarat`,
    template: `%s | ${COMPANY.shortName}`,
  },
  description: DESCRIPTION,
  keywords: [
    "methanol manufacturer India",
    "MTBE supplier Gujarat",
    "isobutylene supplier India",
    "petrochemical company Bharuch",
    "chemical manufacturer Saykha GIDC",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: COMPANY.shortName,
    title: `${COMPANY.legalName} — Petrochemical Manufacturer, Bharuch, Gujarat`,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: COMPANY.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.legalName} — Petrochemical Manufacturer`,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
