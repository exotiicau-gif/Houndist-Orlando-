import localFont from "next/font/local";
import "./globals.css";
import { business } from "@/lib/content";

const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    { path: "./fonts/playfair-normal.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/playfair-italic.woff2", weight: "400 700", style: "italic" },
  ],
});

const dmSans = localFont({
  variable: "--font-dmsans",
  display: "swap",
  src: [
    { path: "./fonts/dmsans-normal.woff2", weight: "300 600", style: "normal" },
    { path: "./fonts/dmsans-italic.woff2", weight: "300 600", style: "italic" },
  ],
});

export const metadata = {
  title: "The Houndist — Premium Dog Walking & Sitting · Berowra",
  description:
    "Professional dog walking and dog sitting in Berowra & Berowra Heights. GPS-tracked walks, free basic training, and 24-hour sitting from $18.",
  metadataBase: new URL("https://thehoundist.com"),
  openGraph: {
    title: "The Houndist — Premium Dog Walking & Sitting · Berowra",
    description:
      "GPS-tracked walks, free basic training, and 24-hour sitting in Berowra & Berowra Heights.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#1A2E22",
  width: "device-width",
  initialScale: 1,
};

// LocalBusiness structured data only — no self-serving review/rating markup,
// in line with search-engine guidelines for reviews on your own site.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  description:
    "Premium dog walking and 24-hour in-home dog sitting in Berowra & Berowra Heights, NSW. GPS-tracked walks, free basic training included.",
  url: "https://thehoundist.com",
  image: "https://thehoundist.com/logo.png",
  telephone: business.phone,
  email: business.email,
  priceRange: "$18–$180",
  areaServed: ["Berowra", "Berowra Heights"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berowra",
    addressRegion: "NSW",
    postalCode: "2081",
    addressCountry: "AU",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "07:00",
    closes: "19:00",
  },
  sameAs: [
    "https://www.facebook.com/TheHoundist",
    "https://www.instagram.com/The_Houndist",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
