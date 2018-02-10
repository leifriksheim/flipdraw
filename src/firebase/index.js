import * as firebase from 'firebase';
import config from './config.js';

firebase.initializeApp(config);

export function submitDrawing({ drawingId, bodyPart, drawingData}) {

  const drawing = {isActive: false};
  drawing[bodyPart] = drawingData;

  return firebase
    .database()
    .ref(`drawings/${drawingId}`)
    .set(drawing);
}

export function createUser(userName) {
  const user = firebase.database().ref(`users`).push({userName: userName});
  return user.key;
}


export async function findDrawing() {
  // Only get the drawings that are not active (currently being drawn by someone else)
  const drawingsFromFirebase = await firebase.database()
                                 .ref(`drawings`)
                                 .orderByChild('isActive')
                                 .equalTo(false)
                                 .once('value');

  const drawings = drawingsFromFirebase.val();
  if (drawings) {
    // Return the first drawing of existing drawings
    return drawings[Object.keys(drawings)[0]];
  } else {
    // Return false if no drawings exist
    return false
  }
}
