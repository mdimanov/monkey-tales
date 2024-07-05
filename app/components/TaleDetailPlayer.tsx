"use client";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { api } from "@/convex/_generated/api";
import { useAudio } from "@/providers/AudioProvider";
import { TaleDetailPlayerProps } from "@/Types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import LoaderSpinner from "./LoaderSpiner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TaleDetailPlayer = ({
  audioUrl,
  voiceType,
  taleTitle,
  taleDescription,
  author,
  imageUrl,
  taleId,
  imageStorageId,
  audioStorageId,
  isOwner,
  authorImageUrl,
  authorId,
}: TaleDetailPlayerProps) => {
  const router = useRouter();
  const { setAudio } = useAudio();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editedTitle, setEditedTitle] = useState(taleTitle);
  const [editedDescription, setEditedDescription] = useState(taleDescription);
  const deleteTale = useMutation(api.tales.deleteTale);
  const editTale = useMutation(api.tales.editTale);
  const updateViews = useMutation(api.tales.updateTaleViews);

  const handleDelete = async () => {
    if (!imageStorageId || !audioStorageId) {
      toast({
        title: "Error deleting tale",
        variant: "destructive",
        description: "Missing storage IDs",
      });
      return;
    }
    try {
      await deleteTale({ taleId, imageStorageId, audioStorageId });
      toast({
        title: "Tale deleted successfully",
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting tale", error);
      toast({
        title: "Error deleting tale",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async () => {
    if (!imageStorageId) {
      toast({
        title: "Error deleting tale",
        variant: "destructive",
        description: "Missing storage IDs",
      });
      return;
    }
    try {
      await editTale({
        taleId,
        taleTitle: editedTitle,
        taleDescription: editedDescription,
      });
      toast({
        title: "Tale edited successfully",
      });
    } catch (error) {
      console.error("Error editing tale", error);
      toast({
        title: "Error editing tale",
        variant: "destructive",
      });
    }
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    try {
      await updateViews({ taleId });
      setAudio({
        title: taleTitle,
        audioUrl,
        imageUrl,
        author,
        taleId,
      });
    } catch (error) {
      console.error("Error updating tale views", error);
      toast({
        title: "Error playing tale",
        variant: "destructive",
      });
    }
  };

  if (!imageUrl || !authorImageUrl) return <LoaderSpinner />;

  return (
    <div className="relative mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <div className="w-full">
          <Image
            src={imageUrl}
            width={300}
            height={300}
            alt="Tale image"
            className="w-full h-auto max-w-full max-h-full rounded-lg"
          />
        </div>
        <div className="flex w-full flex-col gap-5 max-md:items-center md:gap-6">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
              {taleTitle}
            </h1>
            <figure
              className="flex w-full cursor-pointer items-center gap-2"
              onClick={() => {
                router.push(`/profile/${authorId}`);
              }}
            >
              <Image
                src={authorImageUrl}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-white-3">{author}</h2>
            </figure>
            <p className="font-medium md:py-0 py-6 max-md:text-center">
              {taleDescription}
            </p>
            <p className="mt-3">
              AI voice: <strong className="text-white-1">{voiceType}</strong>
            </p>
          </article>

          <Button
            onClick={handlePlay}
            disabled={isPlaying}
            className="text-16 w-full max-w-[250px] transition-all duration-500 bg-violet-600 hover:bg-violet-800 font-extrabold text-white-1"
          >
            <Image
              src="/icons/play.svg"
              width={20}
              height={20}
              alt="random play"
            />
            &nbsp; Play tale
          </Button>
        </div>
      </div>
      {isOwner && (
        <div className="absolute md:right-0 md:top-0 md:relative top-2.5 right-2.5 min-w-5">
          <Image
            src="/icons/settings.svg"
            width={22}
            height={22}
            alt="Tale edit icon"
            className={`cursor-pointer transition-transform duration-300 ${isEditing ? "rotate-45" : ""}`}
            onClick={() => setIsEditing((prev) => !prev)}
          />
          {isEditing && (
            <div className="flex flex-col gap-1 absolute -left-36 -top-1 z-10 w-32">
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="flex cursor-pointer justify-center gap-2 rounded-md bg-black-2 py-1.5 hover:bg-black-3 transition-all duration-500">
                    <Image
                      src="/icons/edit.svg"
                      width={14}
                      height={14}
                      alt="Edit icon"
                    />
                    <p className="text-sm font-normal text-white-1">Edit</p>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit Tale</AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="flex flex-col gap-1">
                        <Input
                          className="input-class py-6 focus-visible:ring-offset-violet-600"
                          placeholder="Title"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <Textarea
                          className="input-class  focus-visible:ring-offset-violet-600"
                          placeholder="Description"
                          rows={5}
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleEdit}>
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <div className="flex cursor-pointer justify-center gap-2 rounded-md bg-black-2 py-1.5 hover:bg-red-600 transition-all duration-500">
                    <Image
                      src="/icons/delete.svg"
                      width={14}
                      height={14}
                      alt="Delete icon"
                    />
                    <p className="text-sm font-normal text-white-1">Delete</p>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this tale? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaleDetailPlayer;
