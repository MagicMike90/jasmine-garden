import Icon from '@expo/vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { Image, View } from 'react-native';

import Images from 'src/config/images';
import { AvatarProps } from 'src/types/avatar';
import styles from './styles';

export default class Avatar extends Component<AvatarProps, {}> {
  renderGroup() {
    const { uri, large, isGroup } = this.props;

    return isGroup ? (
      <Icon name="face" size={64} color="grey" />
    ) : (
      <Image
        source={uri ? { uri } : Images.profile.avatar}
        style={large ? styles.avatarLarge : styles.avatar}
      />
    );
  }

  renderDot() {
    const { large, enableDot } = this.props;
    return enableDot ? (
      <View style={large ? styles.statusDotLarge : styles.statusDot} />
    ) : (
      <View style={{}} />
    );
  }
  render() {
    const { uri, large, isGroup, enableDot } = this.props;

    return (
      <View style={large ? styles.avatarLargeView : styles.avatarView}>
        {this.renderGroup()}
        {this.renderDot()}
      </View>
    );
  }
}
