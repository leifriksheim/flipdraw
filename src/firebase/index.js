import * as firebase from 'firebase';
import config from './config.js';

firebase.initializeApp(config);

export function submitDrawing({ drawingId, bodyPart, drawingData}) {
  return firebase
    .database()
    .ref(`drawings/${drawingId}/${bodyPart}`)
    .set(drawingData);
}

export function createUser(userName) {
  const user = firebase.database().ref(`users`).push({userName: userName});
  return user.key;
}


export function createNewDrawing() {
}
