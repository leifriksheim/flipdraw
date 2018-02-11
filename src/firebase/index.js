import * as firebase from "firebase";
import config from "./config.js";

firebase.initializeApp(config);

export function submitDrawing({ drawingId, bodyPart, drawingData }) {
  const drawing = { isActive: false };
  drawing[bodyPart] = drawingData;

  return firebase
    .database()
    .ref(`drawings/${drawingId}`)
    .set(drawing);
}

export async function createUser(userName) {
  const user = await firebase.auth().signInAnonymously();
  firebase
    .database()
    .ref(`users/${user.uid}`)
    .set({
      userName: userName,
      uid: user.uid
    });
  return user.uid;
}

export async function findDrawing() {
  const drawingsFromFirebase = await firebase
    .database()
    .ref("activeDrawings")
    .once("value");

  const drawings = drawingsFromFirebase.val();
  if (drawings) {
    // Return the first drawing of existing drawings
    return drawings[Object.keys(drawings)[0]];
  } else {
    // Return false if no drawings exist
    return false;
  }
}

export async function getDrawingById(id) {
  const drawing = await firebase
    .database()
    .ref(`drawings/${id}`)
    .once("value");

  return drawing.val();
}

export async function createNewDrawing() {
  const newDrawing = await firebase
    .database()
    .ref("drawings")
    .push({
      parts: {
        head: {
          isFinished: false
        },
        body: {
          isFinished: false
        },
        feet: {
          isFinished: false
        }
      }
    });

  const key = newDrawing.key;

  await firebase
    .database()
    .ref("activeDrawings")
    .set([key]);

  return key;
}
