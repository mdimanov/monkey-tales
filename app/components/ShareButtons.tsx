import React from "react";
import Image from "next/image";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";

type ShareButtonsProps = {
  shareUrl: string;
};

const ShareButtons = ({ shareUrl }: ShareButtonsProps) => {
  return (
    <div className="flex items-center md:mt-3 mt-8 gap-3">
      <figure className="flex gap-3">
        <Image src="/icons/share.svg" width={20} height={20} alt="share" />
        <h2>
          <span className="font-normal text-white-2">Share </span>
        </h2>
      </figure>
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>{" "}
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
