import Icon from '@expo/vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';

export default class CameraScreen extends Component {
  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      alert('Saved', data.uri);
    }
  };

  onPress = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
        />
        <SafeAreaView style={styles.absoluteView}>
          <View style={styles.head}>
            <TouchableOpacity onPress={this.onPress}>
              <Icon name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
          >
            <Icon name="photo-camera" size={75} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}
