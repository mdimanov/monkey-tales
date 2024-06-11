"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Raleway } from "next/font/google";
import { NAVIGATION } from "../utils/constants";
import { usePathname, useRouter } from "next/navigation";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-2 pb-10 max-lg:justify-center"
        >
          <Image
            src="/icons/monkey-tales.png"
            alt="logo"
            width={32}
            height={32}
          />
          <h1
            className={`text-20 ${raleway.className} font-extrabold  max-lg:hidden`}
          >
            Monkey<span className="font-light">Tales</span>
          </h1>
        </Link>
        {NAVIGATION.map(({ label, route }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link
              href={route}
              key={label}
              className={cn(
                "flex py-2 font-semibold text-slate-400 border-violet-800 transition-colors duration-300",
                {
                  "bg-nav-focus text-slate-50 border-r-4": isActive,
                }
              )}
            >
              <Image
                src={`/icons/${label}.png`}
                alt="icon"
                width={22}
                height={22}
                className="mr-3"
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default LeftSidebar;
