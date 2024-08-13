import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SearchPaths } from "../utils/constants";

type UseSearchProps = {
  searchPath: SearchPaths;
};

export const useSearch = ({ searchPath }: UseSearchProps) => {
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

  return { search, setSearch };
};