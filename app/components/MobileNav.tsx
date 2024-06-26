"use client";

import { useState, useEffect } from "react";
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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});

const MobileNav = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenClose = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        document.body.style.pointerEvents = "auto";
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  return (
    <Sheet>
      <SheetTrigger>
        <OpenCloseButton isOpen={isOpen} toggleOpenClose={toggleOpenClose} />
      </SheetTrigger>
      <SheetContent side="left" className="border-none bg-black-2">
        <SheetTitle />
        <SheetDescription />
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
