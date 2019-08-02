/* StatuBar component
 * only works/needed on Android
 */

import PropTypes from 'prop-types';
import React from 'react';
import { StatusBar, View } from 'react-native';
import styles from './styles';

const FBStatusBar = (props) => {
  const FBStatusBarStyles = [
    styles.statusBar,
    {
      backgroundColor: props.backgroundColor,
    },
  ];
  return (
    <View style={FBStatusBarStyles}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor={props.backgroundColor}
        barStyle="light-content"
      />
    </View>
  );
};

FBStatusBar.propTypes = {
  backgroundColor: PropTypes.string,
};

export default FBStatusBar;
