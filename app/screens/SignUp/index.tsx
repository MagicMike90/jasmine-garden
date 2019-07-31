import React from 'react';
import { View } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { onSignIn } from '../../auth';

interface SignUpProps {
  navigation: {
    navigate: (name) => void;
  };
}

export class SignUp extends React.PureComponent<SignUpProps, {}> {
  constructor(props) {
    super(props);
  }
  signIn() {
    console.log('this.props', this.props);
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

          <Input
            placeholder="Confirm Password..."
            label="Confirm Password"
            secureTextEntry={true}
          />

          <Button
            buttonStyle={{ marginTop: 20 }}
            title="SIGN UP"
            onPress={this.signIn}
          />

          <Button
            buttonStyle={{ marginTop: 20 }}
            title="Sign In"
            onPress={this.signIn}
          />
        </Card>
      </View>
    );
  }
}
