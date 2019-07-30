import React from 'react';
import { View } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { onSignIn } from '../../auth';

interface SignInProps {
  navigation: {
    navigate: (name) => void;
  };
}

export class SignIn extends React.PureComponent<SignInProps, {}> {
  constructor(props) {
    super(props);
  }
  signIn() {
    const { navigation } = this.props;
    onSignIn().then(() => navigation.navigate('SignedIn'));
  }
  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <Input placeholder="Email address..." label="Email" />

          <Input
            placeholder="Password..."
            label="Password"
            secureTextEntry={true}
          />

          <Button
            buttonStyle={{ marginTop: 20 }}
            title="SIGN IN"
            onPress={this.signIn}
          />
        </Card>
      </View>
    );
  }
}
