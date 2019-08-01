import * as Font from 'expo-font';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import StatusList from 'src/components/StatusList';

import { NavigationProps } from 'src/types/navigation';
import styles from './styles';

export default class MessagesScreen extends Component<NavigationProps, {}> {
  state = {
    fontLoaded: false,
  };
  onPress = () => {
    const { navigation } = this.props;
    navigation.navigate('CameraScreen');
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto-Light': require('../../../assets/fonts/Roboto-Light.ttf'),
      'Roboto-Medium': require('../../../assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('../../../assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Thin': require('../../../assets/fonts/Roboto-Thin.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded ? (
      <View style={styles.container}>
        <StatusList />
        <Button
          icon="add-a-photo"
          mode="contained"
          onPress={() => this.props.navigation.navigate('ChatScreen')}
        >
          Press me
        </Button>
      </View>
    ) : (
      <Text>Loading...</Text>
    );
  }
}
