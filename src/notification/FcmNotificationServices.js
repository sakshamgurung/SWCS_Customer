import messaging from '@react-native-firebase/messaging';

class FcmNotificationServices {
  async register(storeDeviceToken, onMessage) {
    await this.checkNotificationPermission(storeDeviceToken);
    this.addNotificationListeners(storeDeviceToken, onMessage);
  }

  async checkNotificationPermission(storeDeviceToken) {
    try {
      const authStatus = await messaging().hasPermission();
      authStatus
        ? this.getToken(storeDeviceToken)
        : this.requestPermission(storeDeviceToken);
    } catch (err) {}
  }

  getToken(storeDeviceToken) {
    messaging()
      .getToken()
      .then(token => {
        token ? storeDeviceToken(token) : console.log('getToken failed!!!');
      })
      .catch(err => {
        console.log('getToken error: ', err);
      });
  }

  requestPermission(storeDeviceToken) {
    messaging()
      .requestPermission()
      .then(res => {
        res
          ? this.getToken(storeDeviceToken)
          : console.log('requestPermission failed!!!');
      })
      .catch(err => {
        console.log('requestPermission error: ', err);
      });
  }

  addNotificationListeners(storeDeviceToken, onMessage) {
    this.messageListener = messaging().onMessage(async message => {
      if (message) {
        onMessage(message, 'foreground');
      }
    });

    messaging().setBackgroundMessageHandler(async message => {
      if (message) {
        onMessage(message, 'background');
      }
    });

    //handling interaction with notification displayed when app is in quite state or background state
    messaging().getInitialNotification(async message => {
      if (message) {
        onMessage(message, 'quiteTrigger');
      }
    });

    this.notificationOpenedAppListener = messaging().onNotificationOpenedApp(
      async message => {
        if (message) {
          onMessage(message, 'backgroundTrigger');
        }
      },
    );

    this.tokenRefreshListener = messaging().onTokenRefresh(async token => {
      await storeDeviceToken(token);
    });
  }

  removeNotificationListeners() {
    this.messageListener();
    this.notificationOpenedAppListener();
    this.tokenRefreshListener();
  }
}

export const fcmNotificationServices = new FcmNotificationServices();
