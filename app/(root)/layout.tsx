import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import MobileNav from "../components/RightSidebar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <LeftSidebar />
      <section className="flex min-h-screen flex-1 flex-col pt-2 px-4 sm:px-14 sm:pt-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
          <div className="flex h-16 items-center justify-netween md:hidden">
            <Image
              src="/icons/monkey-tales.png"
              alt="logo"
              width={32}
              height={32}
            />
            <MobileNav />
          </div>
          <div>
            <Toaster />
            {children}
          </div>
        </div>
      </section>

      <RightSidebar />
    </div>
  );
}
