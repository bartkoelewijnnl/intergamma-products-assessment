import type { Metadata } from "next";
import localFont from "next/font/local";
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
    <html lang="nl" data-theme="gamma" className={`${overpass.variable}`}>
      <body className="bg-background font-overpass text-foreground">
        <div className="bg-accent">
          <Container>
            <Header />
          </Container>
        </div>
        <main>{children}</main>
        <Toast.Provider />
      </body>
    </html>
  );
};

export default RootLayout;
