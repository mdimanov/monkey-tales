import type { Metadata } from "next";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import MobileNav from "../components/MobileNav";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import TalePlayer from "../components/TalePlayer";
import MyProfileMobileIcon from "../components/MyProfileMobileIcon";

export const metadata: Metadata = {
  title:
    "MonkeyTales - Create and share your funny audio files using the latest AI technologies",
  description:
    "Transform your text prompt into hilarious tales told by a fancy AI voice and entertain your friends with ease!",
  metadataBase: new URL("https://monkey-tales.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <main className="flex w-full relative">
        <LeftSidebar />
        <section className="flex relative min-h-screen flex-1 flex-col pt-2 pb-20 px-4 sm:px-14 sm:pt-10">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Link href="/">
                <Image
                  src="/icons/monkey-tales.png"
                  alt="logo"
                  width={32}
                  height={32}
                />
              </Link>
              <MyProfileMobileIcon />
              <MobileNav />
            </div>
            <div>
              <Toaster />
              {children}
            </div>
          </div>
        </section>
        <RightSidebar />
      </main>
      <TalePlayer />
    </div>
  );
}
