import React from "react";
import Link from "next/link";

const Header = ({
  headerTitle,
  pageUrl,
}: {
  headerTitle?: string;
  pageUrl?: string;
}) => {
  return (
    <header className="flex items-center justify-between pb-2">
      {headerTitle ? (
        <h3 className="font-semibold text-white-1">{headerTitle}</h3>
      ) : (
        <div />
      )}
      <Link
        href={pageUrl ? pageUrl : "/"}
        className="text-sm text-purple-2 hover:text-violet-300 transition-all duration-500"
      >
        See all
      </Link>
    </header>
  );
};

export default Header;
