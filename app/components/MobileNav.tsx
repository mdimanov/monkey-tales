"use client";

import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { Raleway } from "next/font/google";
import OpenCloseButton from "./OpenCloseButton";
import { NAVIGATION } from "../utils/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenClose = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <OpenCloseButton isOpen={isOpen} toggleOpenClose={toggleOpenClose} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="border-none bg-black-2"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <SheetTitle />
        <SheetDescription />
        <section className="flex flex-col justify-between h-full">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 pb-10">
              <Image
                src="/icons/monkey-tales.png"
                alt="logo"
                width={32}
                height={32}
              />
              <h1
                className={`text-18 ${raleway.className} text-white-1 font-extrabold`}
              >
                Monkey<span className="font-light">Tales</span>
              </h1>
            </Link>
            {NAVIGATION.map(({ label, route, icon }) => {
              const isActive =
                pathname === route || pathname.startsWith(`${route}/`);
              return (
                <SheetClose asChild key={route}>
                  <Link
                    href={route}
                    onClick={toggleOpenClose}
                    className={cn(
                      "flex py-2 font-semibold text-slate-400 border-violet-800 transition-colors duration-300",
                      {
                        "bg-nav-focus text-slate-50 border-r-4": isActive,
                      }
                    )}
                  >
                    <Image
                      src={`/icons/${icon}.png`}
                      alt="icon"
                      width={22}
                      height={22}
                      className="w-auto h-auto mr-3"
                    />
                    {label}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
          <SignedOut>
            <div className="flex-center w-full pb-14 pr-6">
              <Button className="text-16 w-full transition-all duration-500 bg-violet-600 hover:bg-violet-800 font-extrabold text-white-1">
                <Link href="/sign-in" className="flex">
                  <Image
                    src="/icons/signin.svg"
                    width={20}
                    height={20}
                    alt="Sign in icon for button in mobile navigation"
                  />
                  &nbsp; Sign In
                </Link>
              </Button>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex-center w-full pb-14 pr-6">
              <Button
                className="text-16 flex w-full transition-all duration-500 bg-violet-600 hover:bg-violet-800 font-extrabold text-white-1"
                onClick={() => signOut(() => router.push("/"))}
              >
                <Image
                  src="/icons/logout.svg"
                  width={20}
                  height={20}
                  alt="log out"
                />
                &nbsp; Log Out
              </Button>
            </div>
          </SignedIn>
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
