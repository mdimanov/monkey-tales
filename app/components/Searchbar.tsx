"use client";

import { Input } from "@/components/ui/input";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { SearchPaths } from "../utils/constants";

type SearchbarProps = {
  searchPath: SearchPaths;
};

const Searchbar: FC<SearchbarProps> = ({ searchPath }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length >= 3) {
        router.push(`/${searchPath}?search=${search}`);
      } else if (search.length === 0 && pathname === `/${searchPath}`) {
        router.push(`/${searchPath}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchPath]);

  const placeholderText =
    searchPath === SearchPaths.Discover
      ? "Search for tales"
      : searchPath === SearchPaths.Authors
        ? "Search for authors"
        : "Search"; // Default placeholder if needed

  return (
    <div className="relative block">
      <Input
        className="input-class py-6 pl-12 focus-visible:ring-offset-violet-600"
        placeholder={placeholderText}
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
