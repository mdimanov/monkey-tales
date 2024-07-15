"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Raleway } from "next/font/google";
import { NAVIGATION } from "../utils/constants";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-2 pb-10 max-md:justify-center"
        >
          <Image
            src="/icons/monkey-tales.png"
            alt="logo"
            width={32}
            height={32}
          />
          <h1
            className={`text-20 ${raleway.className} font-extrabold  max-md:hidden`}
          >
            Monkey<span className="font-light">Tales</span>
          </h1>
        </Link>
        {NAVIGATION.map(({ label, route, icon }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link
              href={route}
              key={label}
              className={cn(
                "flex items-center py-2 font-semibold text-slate-400 border-violet-800 transition-colors duration-300",
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
          );
        })}
      </nav>
      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Link href="/sign-in" className="flex w-full">
            <Button className="text-16 w-full transition-all duration-500 bg-violet-600 hover:bg-violet-800 font-extrabold text-white-1">
              <Image
                src="/icons/signin.svg"
                width={20}
                height={20}
                alt="Sign in icon for button in left sidebar"
              />
              &nbsp; Sign In
            </Button>
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
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
  );
};

export default LeftSidebar;
