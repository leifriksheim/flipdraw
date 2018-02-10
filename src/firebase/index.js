import * as firebase from 'firebase';
import config from './config.js';

firebase.initializeApp(config);

export function submitDrawing({ drawingId, bodyPart, drawingData}) {
  return firebase
    .database()
    .ref(`games/${drawingId}/${bodyPart}`)
    .set(drawingData);
}
