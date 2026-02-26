import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Zamonaviy va chiroyli shriftni ulaymiz
const inter = Inter({ subsets: ["latin"] });

// Sayt nomi va tavsifi
export const metadata: Metadata = {
  title: "Tezaurus",
  description: "O'zbek tilining izohli va tezaurus lug'ati",
};

// Advanced UI siri: Mobil telefonda ekranni tasodifan yaqinlashtirib (zoom) 
// yuborishni taqiqlaymiz. Shunda u xuddi haqiqiy ilovadek (native app) ishlaydi.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <head>
        {/* Telegram Web App SDK - Telegram bilan aloqa o'rnatish uchun */}
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive" 
        />
      </head>
      {/* Body qismida globals.css dagi Telegram ranglarini chaqiramiz. 
        antialiased - matnlar ekranda tiniq va silliq ko'rinishini ta'minlaydi. 
      */}
      <body className={`${inter.className} bg-[var(--background)] text-[var(--text)] antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
