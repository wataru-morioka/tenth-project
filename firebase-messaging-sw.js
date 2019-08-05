importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

if (ua.indexOf('Safari') !== -1) {
    // Initialize the Firebase app in the service worker by passing in the messagingSenderId.
    firebase.initializeApp({
        'messagingSenderId': '663686156877' // 4の messagingSenderId をコピペ
    });
    const messaging = firebase.messaging();
}

// messaging.setBackgroundMessageHandler(function(payload) {
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: payload.notification.icon
//     };
//     return self.registration.showNotification(notificationTitle, notificationOptions);
// });