import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfZw0gfjHBw3U11kgqrLb11jRVcqwNtP0",
  authDomain: "webaseimage.firebaseapp.com",
  databaseURL: "https://webaseimage.firebaseio.com",
  projectId: "webaseimage",
  storageBucket: "webaseimage.appspot.com",
  messagingSenderId: "695810731830",
  appId: "1:695810731830:web:4367de6d001c88373b8d97",
};

firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();

export { storage, firebase as default };
