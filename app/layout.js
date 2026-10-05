import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { getPublishedContent } from '@/lib/portfolio-data';
import ThemeInitializer from '@/components/ui/theme-init';
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export async function generateMetadata() {
  const settings = (await getPublishedContent()).find((item) => item.kind === 'settings' && item.key === 'site')?.data;
  return {
  title: settings?.title || "Akash Halder | Full Stack Developer & Backend Specialist",
  description: settings?.description || "Portfolio of Akash Halder - Full Stack Developer specializing in scalable backend systems, robust REST APIs, modern web architectures, and interactive 3D experiences.",
  keywords: [
    "Full Stack Developer",
    "Backend Specialist",
    "Node.js",
    "Next.js",
    "React",
    "MongoDB",
    "REST API",
    "Akash Halder",
    "Kolkata",
  ],
  };
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <body className="portfolio-body min-h-full flex flex-col font-sans">
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
