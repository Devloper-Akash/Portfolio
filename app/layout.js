import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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

export const metadata = {
  title: "Akash Halder | Full Stack Developer & Backend Specialist",
  description:
    "Portfolio of Akash Halder - Full Stack Developer specializing in scalable backend systems, robust REST APIs, modern web architectures, and interactive 3D experiences.",
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <body className="portfolio-body min-h-full flex flex-col font-sans">
        <Script
          id="portfolio-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try { var savedTheme = localStorage.getItem('portfolio-theme'); if (savedTheme === 'dark') { document.documentElement.dataset.theme = 'dark'; document.documentElement.classList.add('dark'); } } catch (_) {}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
