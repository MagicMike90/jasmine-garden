import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Images from 'src/config/images';
import Avatar from '../Avatar';
import styles from './styles';

export default class UserItem extends Component {
  shouldComponentUpdate(nextProps) {
    if (_.isEqual(this.props.item, nextProps.item)) {
      return false;
    }
    return true;
  }

  onPress = () => {
    alert('Clicked ');
  }

  render() {
    const { name, picture } = this.props.item;
    return (
      <TouchableRipple onPress={this.onPress} rippleColor="rgba(0, 0, 0, .20)">
        <View style={styles.item}>
          <Avatar uri={picture.thumbnail} enableDot={true} />
          <Text style={styles.userName}>
            {name.first[0].toUpperCase() +
              name.first.slice(1) +
              ' ' +
              name.last[0].toUpperCase() +
              name.last.slice(1)}
          </Text>
          <Image style={styles.wave} source={Images.profile.wave} />
        </View>
      </TouchableRipple>
    );
  }
}

UserItem.propTypes = {
  item: PropTypes.object,
};
