import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "../providers/ConvexClerkProvider";
import AudioProvider from "../providers/AudioProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monkey Tales",
  description: "Generated your tales using AI",
  icons: {
    icon: "/icons/monkey-tales.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <AudioProvider>
          <body className={manrope.className}>{children}</body>
        </AudioProvider>
      </html>
    </ConvexClerkProvider>
  );
}
