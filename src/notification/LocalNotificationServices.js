import PushNotification from 'react-native-push-notification';

class LocalNotificationServices {
  configure(onRegister, onNotification) {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
        onRegister(token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        onNotification(notification);
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  createDefaultChannel() {
    console.log('creating default channel...');
    PushNotification.createChannel(
      {
        channelId: 'SWCS-customer-default-channel-id',
        channelName: 'SWCS customer channel',
        channelDescription: 'SWCS customer channel',
        soundName: 'default',
        vibrate: true,
      },
      created =>
        console.log(
          `SWCS customer channel ${
            created
              ? 'creation success'
              : 'creation failed. Probably channel already exists.'
          } `,
        ),
    );
  }

  localNotification(notification, options = {}) {
    const {title, body} = notification;
    PushNotification.localNotification({
      id: 0,
      title: title || '',
      message: body || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',

      /*Android Only Properties*/
      channelId: 'SWCS-customer-default-channel-id',
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_notification',
      bigText: title || '',
      subText: body || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
    });
  }

  requestPermissions() {
    PushNotification.requestPermissions();
  }
}

export const localNotificationServices = new LocalNotificationServices();
