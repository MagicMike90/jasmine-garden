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

import { PermissionProvider } from './testPage/PermissionContext';

import Button from './components/Button';
import Header from './components/Header';
import Input from './components/Input';
import List from './components/List';
import SubTitle from './components/SubTitle';
import { primaryGradientArray } from './constants/colors';

const headerTitle = 'Todo';

interface IMainState {
  inputValue: string;
  loadingItems: boolean;
  allItems: {};
  isCompleted: boolean;
}

export default class Main extends React.Component<{}, IMainState> {
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
      <PermissionProvider>
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
                <Button deleteAllItems={this.deleteAllItems} />
              </View>
            </View>

            {this.loadingView()}
          </View>
        </LinearGradient>
      </PermissionProvider>
    );
  }

  private loadingView() {
    const { loadingItems, allItems } = this.state;
    if (loadingItems) {
      return (
        <ScrollView contentContainerStyle={styles.scrollableList}>
          {Object.values(allItems)
            .reverse()
            .map((item) => (
              <List
                key={item.id}
                {...item}
                deleteItem={this.deleteItem}
                completeItem={this.completeItem}
                incompleteItem={this.incompleteItem}
              />
            ))}
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
