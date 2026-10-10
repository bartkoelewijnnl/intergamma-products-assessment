import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Toast } from "@heroui/react";
import Container from "@/components/layout/container";
import Header from "@/components/layout/header";
import "./globals.css";

// Overpass sits a bit high by default, these overrides center it.
// Local font because next/font/google can't do overrides.
const overpass = localFont({
  src: [
    {
      path: "./fonts/overpass-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/overpass-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-overpass",
  declarations: [
    { prop: "ascent-override", value: "98.3%" },
    { prop: "descent-override", value: "28.3%" },
  ],
});

// Karwei theme font: free stand-in for the paid Akkurat
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Intergamma | Producten",
    template: "%s | Intergamma",
  },
  description:
    "Gereedschap, materialen en advies onder één dak. Bewaar wat je nodig hebt op je verlanglijst.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html
      lang="nl"
      data-theme="gamma"
      className={`${overpass.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background font-brand text-foreground transition-theme">
        <ThemeProvider
          attribute="data-theme"
          themes={["gamma", "karwei"]}
          defaultTheme="gamma"
          enableSystem={false}
        >
          {/* First tab stop, hidden until keyboard focus. White on the brand color passes AA in both themes. */}
          <a
            href="#main"
            className="sr-only rounded-md bg-surface font-bold text-accent focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-4 focus-visible:py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-foreground"
          >
            Overslaan en naar de inhoud gaan
          </a>
          <div className="bg-accent transition-theme">
            <Container>
              <Header />
            </Container>
          </div>
          {/* tabIndex -1 lets the skip link move keyboard focus here, not only scroll */}
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Toast.Provider />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
