import React, { Component } from 'react';
import { View } from 'react-native';

import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { AppStyles } from 'src/config/styles';
import styles from './styles';

interface TabIconProps {
  name?: string;
  tintColor?: any;
  style?: object;
  type?: string;
}

export default class TabIcon extends Component<TabIconProps, {}> {
  render() {
    const { name, tintColor, style, type } = this.props;

    switch (type) {
      case 'entypo':
        return (
          <Entypo
            style={style ? style : {}}
            name={name}
            size={24}
            color={tintColor}
          />
        );
      case 'rounded':
        return (
          <View style={styles.rounded}>
            <MaterialIcons
              style={style ? style : {}}
              name={name}
              size={24}
              color={
                tintColor === AppStyles.colors.inactiveGreyColor
                  ? AppStyles.colors.white
                  : tintColor
              }
            />
          </View>
        );
      case 'material':
      default:
        return (
          <MaterialIcons
            style={style ? style : {}}
            name={name}
            size={24}
            color={tintColor}
          />
        );
    }
  }
}
