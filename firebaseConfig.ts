import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBVF1Fvbc2S2TOQnOi6qvvqaZf0ZVizZVs',
  // authDomain: 'sdi-mock-app.firebaseapp.com',
  projectId: 'sdi-mock-app',
  // storageBucket: 'sdi-mock-app.appspot.com',
  // messagingSenderId: '355291095068',
  appId: '1:355291095068:web:301397f3c6a7d774623fd9',
  // measurementId: 'G-6C96BQJBC3',
};

const configureFirebase = async () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
};

export default configureFirebase;
