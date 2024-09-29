import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import "../styles/prism.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google"; // Renamed to SpaceGrotesk
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "TechFlow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world.",
  openGraph: {
    type: "website",
    url: "https://tech--flow.vercel.app/",
    title: "TechFlow",
    description:
      "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world.",
    images: [
      {
        url: "https://wallpaperaccess.com/full/4416207.png",
        alt: "TechFlow Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechFlow",
    description:
      "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world.",
    images: [
      {
        url: "https://yourdomain.com/path-to-your-image.jpg",
        alt: "TechFlow Banner",
      },
    ],
  },
};

const appearance = {
  elements: {
    formButtonPrimary: "primary-gradient",
    footerActionLink: "primary-text-gradient hover:text-primary-500",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider appearance={appearance}>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
