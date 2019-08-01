import React, { Component } from 'react';
import { View } from 'react-native';
import ChatMessenger from 'src/components/Messenger';

export default class ChatScreen extends Component {
  onBackPress = () => {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ChatMessenger onBackPress={this.onBackPress} />
      </View>
    );
  }
}
