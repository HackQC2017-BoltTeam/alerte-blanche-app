// Lib imports
import PushNotification from 'react-native-push-notification';
import { Url } from '../common/constants';

// App imports
import store from 'react-native-simple-store';


PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log('TOKEN:', token);

        store.get('user').then((user) => {
            if (user) {
                fetch(Url.token, {
                    method: 'POST',
                    headers: {
                        'Cookies: ' + user.cookie,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({token: token})
                });
            }
        });
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);

        if ('google.message_id' in notification) {
            console.log('google');
            PushNotification.localNotification({
                title: notification.title,
                message: notification.message,
                playSound: true,
                soundName: 'default',
                number: '10',
                vibrate: true,
                vibration: 300,
            });
        }

    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "119913850728",

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});

module.exports = PushNotification;
