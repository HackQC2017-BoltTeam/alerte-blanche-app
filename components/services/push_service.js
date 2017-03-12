// Lib imports
import PushNotification from 'react-native-push-notification';
import { Url } from '../common/constants';

// App imports
import store from 'react-native-simple-store';


var objs = {

}

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log('TOKEN:', token);

        store.get('user').then((user) => {
            if (user) {
                fetch(Url.token, {
                    method: 'PUT',
                    headers: {
                        'Cookies': user.cookie,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'token': token.token})
                }).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
            }
        });
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        // console.log('NOTIFICATION:', notification);

        if ('google.message_id' in notification) {
            PushNotification.localNotification({
                title: notification.title,
                message: notification.message,
                action: notification.action,
                payload: notification.payload,
                largeIcon: 'ic_launcher',
                smallIcon: 'ic_notification',
                playSound: true,
                soundName: 'default',
                number: '10',
                vibrate: true,
                vibration: 300,
            });
        } else if (notification.foreground === false && notification.userInteraction === true) {
            if (notification.action === 'towing_alert') {
                if (notification.payload) {
                    var payload = JSON.parse(notification.payload);
                    objs.emitter.emit('pushNewView', payload);
                }
            }
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

module.exports = {
    PushNotification: PushNotification,
    setEmitter: function(emitter) { objs.emitter=emitter; }
};
