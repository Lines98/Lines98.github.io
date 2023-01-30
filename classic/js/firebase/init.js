if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
firebase.initializeApp({
  "apiKey": "AIzaSyBDDeYlrF2iWpI9D5k4uuT0cAQUi055Jok",
  "authDomain": "games235-com.firebaseapp.com",
  "databaseURL": "https://games235-com-default-rtdb.firebaseio.com",
  "messagingSenderId": "753101995083",
  "projectId": "games235-com",
  "storageBucket": "games235-com.appspot.com"
});