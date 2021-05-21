/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import App from './src/App';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async message => {
  if (message) {
    //updating local storage or sending network request from headless task in android
    console.log('setting background message handler...');
  }
});

AppRegistry.registerComponent(appName, () => App);
