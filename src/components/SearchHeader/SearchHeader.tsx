import React, { Component } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { Appbar, Searchbar, Text } from 'react-native-paper';
import FBStatusBar from 'src/components/FBStatusBar';
import { NavigationProps } from 'src/types/navigation';
import styles from './styles';
interface SearchHeaderState {
  searchQuery: string;
  isFocused: boolean;
}
export default class SearchHeader extends Component<
  NavigationProps,
  SearchHeaderState
> {
  state = {
    searchQuery: '',
    isFocused: false,
  };

  onFocus = () => {
    this.setState(
      {
        isFocused: true,
      },
      () => {
        this.props.navigation.navigate('SearchScreen');
        setTimeout(() => {
          this.searchTextInput.focus();
        }, 240);
      },
    );
  }

  onBlur = () => {
    this.setState({
      isFocused: false,
    });
  }

  onPress = () => {
    if (this.state.isFocused) {
      this.setState({
        isFocused: false,
      });
      this.props.navigation.pop();
    } else {
      this.onFocus();
    }
  }
  assignInput(input) {
    this.searchTextInput = input;
  }
  renderHeader() {
    return this.state.isFocused ? (
      <Appbar.Header style={styles.toolbar}>
        <Searchbar
          ref={this.assignInput}
          style={styles.searchbar}
          placeholder="Search"
          icon={Platform.OS === 'ios' ? 'keyboard-arrow-left' : 'arrow-back'}
          onIconPress={this.onPress}
          onChangeText={(query) => {
            this.setState({ searchQuery: query });
          }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={this.state.searchQuery}
        />
      </Appbar.Header>
    ) : (
      <Appbar.Header style={styles.toolbar}>
        <Appbar.Action icon="search" onPress={this.onPress} />
        <TouchableOpacity style={styles.btn} onPress={this.onPress}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
        <Appbar.Action icon="face" onPress={this._onSearch} />
      </Appbar.Header>
    );
  }
  render() {
    const activeScreen = this.props.navigation.state.routes[
      this.props.navigation.state.index
    ].routeName;

    return (
      <View
        style={
          activeScreen === 'HomeScreen'
            ? styles.container
            : styles.elevatedContainer
        }
      >
        <FBStatusBar backgroundColor="black" barStyle="light-content" />
        {this.renderHeader()}
      </View>
    );
  }
}
