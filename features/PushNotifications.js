var PushNotification = require('react-native-push-notification');
import PushNotificationIOS from 'react-native-push-notification';
const configure = () => {
    PushNotification.configure({


        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
            console.log('NOTIFICATION:', notification);
            alert(JSON.stringify(notification));
        },

    });
}

const localNotification = () => {
    PushNotification.localNotification({
        /* iOS and Android properties */
        title: "My Notification Title", // (optional)
        foreground: true,
        message: "My Notification Message", // (required)
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
    });

    PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        message: "Agun Ganteng", // (required)
        date: new Date(Date.now() + (10 * 1000)) // in 60 secs
    });
}

export {
    configure,
    localNotification
}