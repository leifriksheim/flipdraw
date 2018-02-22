import { db, auth } from "./index";

export function submitDrawing({ drawingId, bodyPart, drawingData }) {
  const currentUser = auth.currentUser;

  return db.ref(`drawings/${drawingId}/parts/${bodyPart}`).set({
    data: drawingData,
    uid: currentUser.uid,
    isFinished: true,
    inProgress: false
  });
}

export async function findDrawing() {
  const drawingsFromFirebase = await db.ref("activeDrawings").once("value");

  const drawings = drawingsFromFirebase.val();
  if (drawings) {
    // Return the first drawing of existing drawings
    return Object.keys(drawings)[0];
  } else {
    // Return false if no drawings exist
    return false;
  }
}

export async function getAllDrawings(uid) {
  const allDrawings = await db.ref(`users/${uid}/drawings`).once("value");
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

  await db.ref(`activeDrawings/${key}`).set(true);

  return key;
}

export async function getRandomBodypart(drawingId) {
  const drawing = await getDrawingById(drawingId);

  const bodyParts = [];
  if (!drawing.parts.head.isFinished) bodyParts.push("head");
  if (!drawing.parts.body.isFinished) bodyParts.push("body");
  if (!drawing.parts.legs.isFinished) bodyParts.push("legs");
  // Return random body part from parts that are not finished
  return bodyParts[Math.floor(Math.random() * bodyParts.length)];
}
