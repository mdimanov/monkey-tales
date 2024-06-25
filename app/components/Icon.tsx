import Image from "next/image";

import { IconProps } from "@/Types";

const Icon = ({ src, isVisible }: IconProps) => (
  <Image
    src={src}
    width={30}
    height={30}
    className={`absolute transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    alt="icon"
  />
);

export default Icon;
