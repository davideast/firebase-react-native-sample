<p align="center">
  <h2 align="center">Firebase React Native App</h2>
</p>

![Logo](firebase-react.png)

### 7/6/16 - Updated to 3.1.0 of the Firebase SDK
With the new 3.1.0 SDK, Firebase Database and Firebase Auth, now work with React Native. 
Rather than use `new Firebase(url)` like with the old SDK, you now configure firebase with `firebase.initializeApp(config)`,
and use the new `firebase.database().ref()` method.

```js
const React = require("react-native");
const firebase = require("firebase");

// Initialize Firebase
const firebaseConfig = {
  apiKey: "<YOUR-API-KEY>",
  authDomain: "<YOUR-AUTH-DOMAIN>",
  databaseURL: "<YOUR-DATABASE-URL>",
  storageBucket: "",
};
firebase.initializeApp(firebaseConfig);

// Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child('items');
```

### [Tutorial - https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html](https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html)

