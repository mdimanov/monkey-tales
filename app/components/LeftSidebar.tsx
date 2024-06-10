import Link from "next/link";
import Image from "next/image";
import React from "react";

const LeftSidebar = () => {
  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link href="/">
          <Image
            src="/icons/monkey-tales.png"
            alt="logo"
            width={30}
            height={30}
          />
        </Link>
      </nav>
    </section>
  );
};

export default LeftSidebar;
