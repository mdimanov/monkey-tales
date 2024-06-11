type NavigationItem = {
    label: string;
    route: string;
  };

 export type Tale = {
    id: number;
    title: string;
    description: string;
    imgURL: string;
  };

export const NAVIGATION: NavigationItem[] = [
    { label: "Home", route: "/",},
    { label: "Profile", route: "/profile" },
    { label: "Discover", route: "/discover"},
  ];
  
export const TALES: Tale[] = [
  {
    id: 1,
    title: "The Enchanted Forest",
    description: "A tale of a young explorer who stumbles upon a magical forest filled with mystical creatures.",
    imgURL: "/images/thumb1.png"
  },
  {
    id: 2,
    title: "The Lost City",
    description: "An adventure story about the discovery of an ancient city hidden deep within the jungle.",
    imgURL: "/images/thumb2.png"
  },
  {
    id: 3,
    title: "The Brave Knight",
    description: "The journey of a brave knight who sets out to rescue a princess from a dragon.",
    imgURL: "/images/thumb3.png"
  },
  {
    id: 4,
    title: "The Time Traveler",
    description: "A thrilling tale of a scientist who invents a time machine and explores different eras.",
    imgURL: "/images/thumb1.png"
  },
  {
    id: 5,
    title: "The Hidden Treasure",
    description: "A pirate adventure about a quest to find a hidden treasure buried on a deserted island.",
    imgURL: "/images/thumb2.png"
  }
];