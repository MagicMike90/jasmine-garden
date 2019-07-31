import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';
import Images from 'src/config/images';
import styles from './styles';

export default class Avatar extends Component {
  render() {
    const { uri, large, isGroup, enableDot } = this.props;

    return (
      <View style={large ? styles.avatarLargeView : styles.avatarView}>
        {isGroup ? (
          <Icon name="face" size={64} color="grey" />
        ) : (
          <Image
            source={uri ? { uri } : Images.profile.avatar}
            style={large ? styles.avatarLarge : styles.avatar}
          />
        )}
        {enableDot ? (
          <View style={large ? styles.statusDotLarge : styles.statusDot} />
        ) : (
          <View style={{}} />
        )}
      </View>
    );
  }
}

Avatar.defultProps = {
  enableDot: true,
  large: false,
  isGroup: false,
  liveEnabled: true,
};

Avatar.propTypes = {
  large: PropTypes.bool,
  isGroup: PropTypes.bool,
  enableDot: PropTypes.bool,
  uri: PropTypes.string,
};
