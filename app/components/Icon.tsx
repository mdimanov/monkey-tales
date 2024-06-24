import Image from "next/image";

import { IconProps } from "@/Types";

const Icon = ({ src, isVisible }: IconProps) => (
  <Image
    src={src}
    layout="fill"
    objectFit="contain"
    className={`absolute transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    alt="icon"
  />
);

export default Icon;
