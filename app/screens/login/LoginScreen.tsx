import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { strings } from '../../constants/strings';
import Button from '../../library/components/Button';
import FormTextInput from '../../library/components/FormTextInput';
import imageLogo from '../assets/images/logo.png';

interface ILoginScreenState {
  email: string;
  password: string;
}

class LoginScreen extends React.Component<{}, ILoginScreenState> {
  public readonly state: ILoginScreenState = {
    email: '',
    password: '',
  };

  public handleEmailChange = (email: string) => {
    this.setState({ email });
  }

  public handlePasswordChange = (password: string) => {
    this.setState({ password });
  }

  public handleLoginPress = () => {
    console.log('Login button pressed');
  }

  public render() {
    return (
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            placeholder={strings.EMAIL_PLACEHOLDER}
          />
          <FormTextInput
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD_PLACEHOLDER}
          />
          <Button label={strings.LOGIN} onPress={this.handleLoginPress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
});

export default LoginScreen;
