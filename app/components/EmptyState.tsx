import { EmptyStateProps } from "@/Types";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmptyState = ({
  title,
  search,
  buttonLink,
  buttonText,
}: EmptyStateProps) => {
  return (
    <section className="flex-center size-full flex-col my-4 p-4 gap-3  rounded-lg bg-black-2">
      <Image
        src="/icons/search-not-found.svg"
        width={45}
        height={45}
        alt="serach not found"
        className="py-2"
      />
      <div className="flex-center w-full max-w-[250px] flex-col gap-3">
        <p className="text-sm text-center">{title}</p>
        {search && (
          <p>Try adjusting your search to find what you are looking for</p>
        )}
        {buttonLink && (
          <Button className="bg-violet-600 hover:bg-violet-800 transition-all duration-500">
            <Link
              href={buttonLink}
              className="flex gap-1 font-extrabold text-white-1"
            >
              <Image
                src="/icons/discover.svg"
                width={20}
                height={20}
                alt="discover icon"
              />
              &nbsp; {buttonText}
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default EmptyState;
