"use client";

import { Input } from "@/components/ui/input";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length >= 3) {
        router.push(`/discover?search=${search}`);
      } else if (search.length === 0 && pathname === "/discover") {
        router.push("/discover");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname]);

  return (
    <div className="relative block">
      <Input
        className="input-class py-6 pl-12 focus-visible:ring-offset-violet-600"
        placeholder="Search for tales"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch("")}
      />
      <Image
        src="/icons/search.png"
        alt="search"
        height={22}
        width={22}
        className="absolute left-4 top-3"
      />
    </div>
  );
};

export default Searchbar;
