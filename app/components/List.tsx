import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TodoItem } from '../types/Item';
import ListItem from './ListItem';

const { width } = Dimensions.get('window');
interface IListProps {
  deleteItem: () => {};
  completeItem: () => {};
  items: [TodoItem];
  incompleteItem: (id) => void;
}
class List extends Component<IListProps, {}> {
  public render() {
    const { items, deleteItem, completeItem, incompleteItem } = this.props;
    return items.map((item) => (
      <ListItem
        key={item.id}
        {...item}
        deleteItem={deleteItem}
        completeItem={completeItem}
        incompleteItem={incompleteItem}
      />
    ));
  }
}
const styles = StyleSheet.create({
  container: {
    width: width - 50,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    height: width / 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
export default List;
