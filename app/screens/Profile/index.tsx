import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';
import { onSignOut } from '../../auth';

export const Profile = ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <Card title="John Doe">
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 28 }}>JD</Text>
      </View>
      <Button
        title="SIGN OUT"
        onPress={() => onSignOut().then(() => navigation.navigate('SignedOut'))}
      />
    </Card>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bcbec1',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
