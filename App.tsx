import React from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';

import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { HomeScreen } from './app/screens/home/HomeScreen';
import { AuthLoadingScreen } from './app/screens/loading/AuthLoadingScreen';

class SignInScreen extends React.Component {
  public static navigationOptions = {
    title: 'Please sign in',
  };

  public render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  public _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  }
}

class OtherScreen extends React.Component {
  public static navigationOptions = {
    title: 'Lots of features here',
  };

  public render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
          <StatusBar barStyle="default" />
        </View>
      </SafeAreaView>
    );
  }

  public _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
}

const AppStack = createStackNavigator({ Home: {
  // `ProfileScreen` is a React component that will be the main content of the screen.
  screen: HomeScreen,
  // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

  // Optional: When deep linking or using react-navigation in a web app, this path is used:
  path: 'people/:name',
  // The action and route params are extracted from the path.

  // Optional: Override the `navigationOptions` for the screen
  navigationOptions: ({ navigation }) => ({
    title: `A`,
    headerBackTitle: 'A much too long text for back button from B to A',
    headerTruncatedBackTitle: `to A`
  })
  
}, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
// export default function App() {
//   return <Main />;
// }

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
