/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from "react";

import { Id } from "../convex/_generated/dataModel"
 
export interface EmptyStateProps {
  title: string;
  search?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export interface TopMonkeyTalesProps {
  _id: Id<"users">;
  _creationTime: number;
  email: string;
  imageUrl: string;
  clerkId: string;
  name: string;
  tale: {
    taleTitle: string;
    taleId: Id<"tales">;
  }[];
  totalTales: number;
}

export interface TaleProps {
  _id: Id<"tales">;
  _creationTime: number;
  audioStorageId: Id<"_storage"> | null;
  user: Id<"users">;
  taleTitle: string;
  taleDescription: string;
  audioUrl: string | null;
  imageUrl: string | null;
  imageStorageId: Id<"_storage"> | null;
  author: string;
  authorId: string;
  authorImageUrl: string;
  voicePrompt: string;
  imagePrompt: string | null;
  voiceType: string;
  audioDuration: number;
  views: number;
}

export interface TalesData {
  results: TaleProps[];
  totalCount: number;
}

export interface AuthorsData {
  results: AuthorsProps[];
}

export interface ProfileTaleProps {
  tales: TaleProps[];
  listeners: number;
}

export interface GenerateTaleProps {
  voiceType: string;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  voicePrompt: string;
  setVoicePrompt: Dispatch<SetStateAction<string>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
}

export interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  image: string;
  imagePrompt: string;
  setImagePrompt: Dispatch<SetStateAction<string>>;
}

export interface LatestTaleCardProps {
  imgUrl: string;
  title: string;
  duration: string;
  index: number;
  audioUrl: string;
  author: string;
  views: number;
  taleId: Id<"tales">;
}

export interface TaleDetailPlayerProps {
  audioUrl: string;
  taleTitle: string;
  taleDescription: string;
  voiceType: string;
  author: string;
  isOwner: boolean;
  imageUrl: string;
  taleId: Id<"tales">;
  imageStorageId?: Id<"_storage">;
  audioStorageId?: Id<"_storage">;
  authorImageUrl: string;
  authorId: string;
}

export interface AudioProps {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
  taleId: string;
}

export interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

export interface TaleCardProps {
  imgUrl: string;
  title: string;
  views: number;
  description: string;
  taleId: Id<"tales">;
}

export interface SmallTaleCardProps {
  imgUrl: string;
  title: string;
  author: string;
  audioDuration: number;
  views: number;
  taleId: Id<"tales">;
}

export interface CarouselProps {
  fansLikeDetail: TopMonkeyTalesProps[];
}

export interface TopTaleTellerCardProps {
  taleTeller: TopMonkeyTalesProps;
}

export interface ProfileCardProps {
  imageUrl: string;
  userFirstName: string;
  listeners: number;
  tales: number;
  mostListenedTaleTitle: string;
}

export interface AuthorsProps {
  imageUrl: string;
  userFirstName: string;
  tales: number;
  clerkId: string;
  totalTales: number;
  _id: Id<"users">;
  _creationTime: number;
  email: string;
  name: string;
}

export interface SmallProfileCardProps {
  imageUrl: string;
  userFirstName: string;
  tales: number;
  clerkId: string;
}

export type EditTaleControlsProps = {
  taleId:  Id<"tales">;
  taleTitle: string;
  taleDescription: string;
  imageStorageId: Id<"_storage"> | undefined;
  audioStorageId: Id<"_storage"> | undefined;
};

export type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export type IconProps = {
  src: string;
  isVisible: boolean;
};

export interface SpeechParams {
    voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
}

// Number of tales on page (for pagination purpose).
export const PAGE_SIZE = 8