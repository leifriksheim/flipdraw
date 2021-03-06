import { db, auth } from "./index";

export function submitDrawing({ drawingId, bodyPart, lines }) {
  const currentUser = auth.currentUser;

  return db.ref(`drawings/${drawingId}/parts/${bodyPart}`).set({
    data: lines,
    uid: currentUser.uid,
    isFinished: true,
    inProgress: false
  });
}

export async function findDrawing() {
  // Only look for active drawings you haven't drawn yourself
  const drawingsFromFirebase = await db.ref("activeDrawings")
                               .orderByChild(auth.currentUser.uid)
                               .equalTo(null)
                               .once("value");

  const drawings = drawingsFromFirebase.val();
  if (drawings) {
    // Return the first drawing of existing drawings
    return Object.keys(drawings)[0];
  } else {
    // Return false if no drawings exist
    return false;
  }
}

export async function getUserDrawings(uid) {
  const allDrawings = await db.ref(`users/${uid}/drawings`).once("value");
  return allDrawings.val();
}

export async function getAllDrawings() {
  const allDrawings = await db.ref(`/drawings`).once("value");
  return allDrawings.val();
}

export async function getDrawingById(id) {
  const drawing = await db.ref(`drawings/${id}`).once("value");

  return drawing.val();
}

export async function createNewDrawing() {
  const newDrawing = await db.ref("drawings").push({
    parts: {
      head: {
        isFinished: false
      },
      body: {
        isFinished: false
      },
      legs: {
        isFinished: false
      }
    }
  });

  const key = newDrawing.key;

  return key;
}

export async function getRandomBodypart(drawingId) {
  const drawing = await getDrawingById(drawingId);

  const bodyParts = [];
  if (!drawing.parts.head.isFinished) bodyParts.push("head");
  if (!drawing.parts.body.isFinished) bodyParts.push("body");
  if (!drawing.parts.legs.isFinished) bodyParts.push("legs");
  // pick random body part from parts that are not finished
  return bodyParts[Math.floor(Math.random() * bodyParts.length)];
}
