export interface NavigationProps {
  navigation: {
    navigate: (screen: string) => void;
    pop: () => void;
    state: {
      index;
      routes;
    };
  };
}
