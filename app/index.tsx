import React from 'react';
import { isSignedIn } from './auth';
import { createRootNavigator } from './router';

interface AppState {
  signedIn: boolean;
  checkedSignIn: boolean;
}
export default class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
  }

  async componentDidMount() {
    try {
      const res = await isSignedIn();
      console.log('res', res);
      this.setState({ signedIn: res, checkedSignIn: true });
    } catch (err) {
      alert('An error occurred');
    }
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }
    const Root = createRootNavigator(signedIn);
    return <Root />;
  }
}
