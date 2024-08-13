import { Input } from "@/components/ui/input";

import Image from "next/image";
import { FC } from "react";
import { SearchPaths } from "../utils/constants";
import { useSearch } from "../hooks/useSearch";
import { SearchbarProps } from "@/Types";

const Searchbar: FC<SearchbarProps> = ({ searchPath }) => {
  const { search, setSearch } = useSearch({ searchPath });

  const placeholderText =
    searchPath === SearchPaths.Discover
      ? "Search for tales"
      : searchPath === SearchPaths.Authors
        ? "Search for authors"
        : "Search"; // Default placeholder if needed

  return (
    <div className="relative block w-full">
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
