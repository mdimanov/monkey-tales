type NavigationItem = {
    label: string;
    route: string;
    icon: string;
  };

export const NAVIGATION: NavigationItem[] = [
    { label: "Home", route: "/", icon: 'home'},
    { label: "Discover", route: "/discover", icon: 'search'},
    { label: "Authors", route: "/authors", icon: 'authors' },
    { label: "Create Tale", route: "/create-tale", icon: 'book' },
  ];
  
export const VOICES = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx']