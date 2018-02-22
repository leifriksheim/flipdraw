import firebase from "firebase";
import config from "./config.js";

export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database(); //the real-time database
export const auth = firebaseApp.auth(); //the firebase auth namespace

export const isAuthenticated = () => {
  return !!auth.currentUser;
};
