import { Item } from 'react-native-paper/typings/components/List';

interface GroupItem {
  name: string;
  last_active: string;
  members: [];
}
export interface GroupItemProps {
  item: GroupItem;
}
export interface GroupListProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}
