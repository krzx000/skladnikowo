import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://skladnikowo.krzx.top"),
  title: "Składnikowo - Analizator składów produktów i karm dla zwierząt",
  description:
    "Składnikowo to inteligentny analizator składu produktów spożywczych i karm dla zwierząt. Sprawdź, co naprawdę jesz i co podajesz swojemu pupilowi. Analiza składników, dodatków i wartości analitycznych w kilka sekund dzięki AI.",
  keywords: [
    "Składnikowo",
    "analizator składów",
    "produkty spożywcze",
    "karma dla zwierząt",
    "karma kota",
    "karma psa",
    "kot",
    "pies",
    "zdrowe jedzenie",
    "super premium karma",
    "AI",
    "sztuczna inteligencja",
    "NLP",
    "białko",
    "tłuszcze",
    "węglowodany",
    "włókno",
    "popiół",
    "wilgotność",
    "dodatki do żywności",
    "konserwanty",
    "naturalne składniki",
    "syntetyczne składniki",
    "analiza etykiety",
    "świadome zakupy",
    "zdrowa dieta",
    "karma mokra",
    "karma sucha",
    "przepisy żywieniowe",
    "zdrowie pupila",
    "analiza karmy kota",
    "analiza karmy psa",
    "informacje o składzie",
    "świadome jedzenie",
    "zdrowy styl życia",
    "przewodnik po składnikach",
    "analiza jakości produktów",
    "dietetyka zwierząt",
    "zdrowe produkty spożywcze",
    "zdrowa karma dla kota",
    "zdrowa karma dla psa",
    "analiza produktów spożywczych",
    "skład chemiczny karmy",
    "subiektywna ocena karmy",
    "składniki niepożądane",
    "zdrowe przekąski",
    "porównanie karm",
    "ranking karm dla zwierząt",
    "etykieta produktów spożywczych",
    "kontrola jakości żywności",
    "AI w analizie produktów",
    "inteligentna analiza składników",
    "aplikacja do analizy składów",
    "narzędzie do świadomego żywienia",
    "analiza wartości odżywczych",
    "analiza dodatków paszowych",
  ],
  authors: [{ name: "krzx", url: "https://krzx.top" }],
  creator: "Składnikowo",
  openGraph: {
    title: "Składnikowo - Analizator składów produktów i karm dla zwierząt",
    description:
      "Analizuj skład produktów spożywczych i karm dla zwierząt w kilka sekund. Dowiedz się, co naprawdę jesz i co podajesz swojemu pupilowi dzięki AI.",
    url: "https://skladnikowo.krzx.top",
    siteName: "Składnikowo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Składnikowo - Analizator składów",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Składnikowo - Analizator składów produktów i karm dla zwierząt",
    description:
      "Analizuj skład produktów spożywczych i karm dla zwierząt w kilka sekund. Dowiedz się, co naprawdę jesz i co podajesz swojemu pupilowi dzięki AI.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${manrope.variable}  antialiased`}>
        <Navbar />
        <main className="flex justify-center w-full ">
          <div className="flex flex-col justify-center w-full max-w-5xl gap-32 px-4 py-24 pt-40">
            {children}
          </div>
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
