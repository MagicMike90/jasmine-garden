import { AsyncStorage } from 'react-native';

export const USER_KEY = 'auth-demo-key';

export const onSignIn = async () => AsyncStorage.setItem(USER_KEY, 'true');

export const onSignOut = async () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = async (): Promise<boolean> => {
  return (await AsyncStorage.getItem(USER_KEY)) ? true : false;
};
