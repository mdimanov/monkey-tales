type NavigationItem = {
    label: string;
    route: string;
    icon: string;
  };

export enum SearchPaths {
  Discover = 'discover',
  Authors = 'authors',
}

export enum SearchResults {
  Tales = 'tales',
  Authors = 'authors',
}

export const NAVIGATION: NavigationItem[] = [
    { label: "Home", route: "/", icon: 'home'},
    { label: "Discover", route: "/discover", icon: 'search'},
    { label: "Authors", route: "/authors", icon: 'authors' },
    { label: "Statistics", route: "/statistics", icon: 'stats' },
    { label: "Create Tale", route: "/create-tale", icon: 'book' },
  ];
  
export const VOICES = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx']

export const ADMIN = 'user_2i385LkE4gBaWKb15MfeVd8ieq6'

export const PROD_URL = 'https://monkey-tales.vercel.app'