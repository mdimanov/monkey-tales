"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { GenerateThumbnailProps } from "@/Types";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useAction, useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getImageUrl = useMutation(api.tales.getUrl);
  const handleGenerateThumbnail = useAction(api.openai.generateThumbnailAction);

  const handleImage = async (blob: Blob, fileName: string) => {
    try {
      const file = new File([blob], fileName, { type: "image/png" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });
      setImage(imageUrl!);
      setIsImageLoading(false);
      toast({
        title: "Thumbnail generated successfully",
      });
    } catch (error) {
      console.log(error);
      toast({ title: "Error generating thumbnail", variant: "destructive" });
    }
  };

  const generateImage = async () => {
    setIsImageLoading(true);
    setImage("");

    if (!imagePrompt) {
      toast({
        title: "Please provide a text to generate image",
      });
      return setIsImageLoading(false);
    }

    try {
      const response = await handleGenerateThumbnail({
        prompt: imagePrompt,
      });
      const blob = new Blob([response], { type: "image/png" });
      handleImage(blob, `thumbnail${uuidv4()}`);
    } catch (error) {
      console.log(error);
      toast({ title: "Error generating thumbnail", variant: "destructive" });
    }
  };
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleImage(blob, file.name);
    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading image", variant: "destructive" });
    }
  };

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(true)}
          className={cn("", { "bg-black-2": isAiThumbnail })}
        >
          Use AI to generate thumbnail
        </Button>
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(false)}
          className={cn("", { "bg-black-2": !isAiThumbnail })}
        >
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col mt-5 gap-2.5">
            <Label className="text-sm font-bold text-white-1">
              AI Prompt to generate thumbnail
            </Label>
            <Textarea
              className="input-class"
              placeholder="Provide text to generate thumbnail"
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button
              className="text-16 bg-black-2 py-4 font-bold text-white-1 transition-all duration-500 hover:bg-black-3"
              onClick={generateImage}
            >
              {isImageLoading ? (
                <>
                  <Loader size={20} className="animate-spin mr-2" />
                  Generating
                </>
              ) : (
                <>
                  <span className="flex h-7 w-7 items-center justify-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="icon-sm shrink-0"
                    >
                      <path
                        fill="currentColor"
                        d="M6.394 4.444c.188-.592 1.024-.592 1.212 0C8.4 8.9 9.1 9.6 13.556 10.394c.592.188.592 1.024 0 1.212C9.1 12.4 8.4 13.1 7.606 17.556c-.188.592-1.024.592-1.212 0C5.6 13.1 4.9 12.4.444 11.606c-.592-.188-.592-1.024 0-1.212C4.9 9.6 5.6 8.9 6.394 4.444m8.716 9.841a.41.41 0 0 1 .78 0c.51 2.865.96 3.315 3.825 3.826.38.12.38.658 0 .778-2.865.511-3.315.961-3.826 3.826a.408.408 0 0 1-.778 0c-.511-2.865-.961-3.315-3.826-3.826a.408.408 0 0 1 0-.778c2.865-.511 3.315-.961 3.826-3.826Zm2.457-12.968a.454.454 0 0 1 .866 0C19 4.5 19.5 5 22.683 5.567a.454.454 0 0 1 0 .866C19.5 7 19 7.5 18.433 10.683a.454.454 0 0 1-.866 0C17 7.5 16.5 7 13.317 6.433a.454.454 0 0 1 0-.866C16.5 5 17 4.5 17.567 1.317"
                      ></path>
                    </svg>
                  </span>
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="image_div"
          onClick={() => {
            imageRef?.current?.click();
          }}
        >
          <Input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />
          {!isImageLoading ? (
            <Image
              src="/icons/upload-image.svg"
              width={40}
              height={40}
              alt="upload image"
            />
          ) : (
            <div className="flex-center font-medium text-ellipsis">
              Uploading
              <Loader size={20} className="animate-spin ml-2" />
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <h2 className="font-semibold text-violet-600">Click to upload</h2>
            <p className="text-sm text-grey-1">
              SVG, PNG, JPG or GIF (max. 1080x1080px)
            </p>
          </div>
        </div>
      )}
      {image && (
        <div className="flex-center w-full py-4">
          <Image src={image} width={600} height={600} alt="image thumbnail" />
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;
