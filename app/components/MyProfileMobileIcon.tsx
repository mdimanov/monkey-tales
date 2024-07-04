"use client";

import { SignedIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const MyProfileMobileIcon = () => {
  const { user } = useUser();

  return (
    <SignedIn>
      <Link
        className="absolute sm:right-[100px] right-[80px]"
        href={`/profile/${user?.id}`}
      >
        <Image src="/icons/user.svg" alt="logo" width={28} height={28} />
      </Link>
    </SignedIn>
  );
};

export default MyProfileMobileIcon;
