import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import uuid from 'uuid/v1';
import { primaryGradientArray } from '../../constants';
import DeleteListButton from '../../library/components/DeleteListButton';
import Header from '../../library/components/Header';
import Input from '../../library/components/Input';
import List from '../../library/components/List';
import SubTitle from '../../library/components/SubTitle';
import { TodoItem } from '../../types/Item';

const headerTitle = 'Todo';

interface IMainState {
  inputValue: string;
  loadingItems: boolean;
  allItems: {};
  isCompleted: boolean;
}

export class Home extends React.Component<{}, IMainState> {
  public state = {
    inputValue: '',
    loadingItems: false,
    allItems: {},
    isCompleted: false,
  };

  public componentDidMount = () => {
    this.loadingItems();
  }

  public newInputValue = (value) => {
    this.setState({
      inputValue: value,
    });
  }

  public loadingItems = async () => {
    try {
      const allItems = await AsyncStorage.getItem('Todos');
      this.setState({
        loadingItems: true,
        allItems: JSON.parse(allItems) || {},
      });
    } catch (err) {
      console.log(err);
    }
  }

  public onDoneAddItem = () => {
    const { inputValue } = this.state;
    if (inputValue !== '') {
      this.setState((prevState) => {
        const id = uuid();
        const newItemObject = {
          [id]: {
            id,
            isCompleted: false,
            text: inputValue,
            createdAt: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          inputValue: '',
          allItems: {
            ...prevState.allItems,
            ...newItemObject,
          },
        };
        this.saveItems(newState.allItems);
        return { ...newState };
      });
    }
  }

  public deleteItem = (id) => {
    this.setState((prevState) => {
      const allItems = prevState.allItems;
      delete allItems[id];
      const newState = {
        ...prevState,
        ...allItems,
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  }

  public completeItem = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        allItems: {
          ...prevState.allItems,
          [id]: {
            ...prevState.allItems[id],
            isCompleted: true,
          },
        },
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  }

  public incompleteItem = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        allItems: {
          ...prevState.allItems,
          [id]: {
            ...prevState.allItems[id],
            isCompleted: false,
          },
        },
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  }

  public deleteAllItems = async () => {
    try {
      await AsyncStorage.removeItem('Todos');
      this.setState({ allItems: {} });
    } catch (err) {
      console.log(err);
    }
  }

  public saveItems = (newItem) => {
    const saveItem = AsyncStorage.setItem('Todos', JSON.stringify(newItem));
  }
  public render() {
    const { inputValue } = this.state;

    return (
      <LinearGradient colors={primaryGradientArray} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centered}>
          <Header title={headerTitle} />
        </View>
        <View style={styles.inputContainer}>
          <SubTitle subtitle={'What\'s Next?'} />
          <Input
            inputValue={inputValue}
            onChangeText={this.newInputValue}
            onDoneAddItem={this.onDoneAddItem}
          />
        </View>
        <View style={styles.list}>
          <View style={styles.column}>
            <SubTitle subtitle={'Recent Notes'} />
            <View style={styles.deleteAllButton}>
              <DeleteListButton deleteAllItems={this.deleteAllItems} />
            </View>
          </View>

          {this.loadingView()}
        </View>
      </LinearGradient>
    );
  }

  private renderList(allItems) {
    return (
      <List
        items={Object.values(allItems).reverse() as [TodoItem]}
        deleteItem={this.deleteItem}
        completeItem={this.completeItem}
        incompleteItem={this.incompleteItem}
      />
    );
  }

  private loadingView() {
    const { loadingItems, allItems } = this.state;
    if (loadingItems) {
      return (
        <ScrollView contentContainerStyle={styles.scrollableList}>
          {this.renderList(allItems)}
        </ScrollView>
      );
    }

    return <ActivityIndicator size="large" color="white" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 40,
    paddingLeft: 15,
  },
  list: {
    flex: 1,
    marginTop: 70,
    paddingLeft: 15,
    marginBottom: 10,
  },
  scrollableList: {
    marginTop: 15,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteAllButton: {
    marginRight: 40,
  },
});
