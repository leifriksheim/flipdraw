const functions = require("firebase-functions");

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://flipdraw-js.firebaseio.com"
});

exports.drawingCompleted = functions.database
  .ref("/drawings/{drawingId}/parts")
  .onWrite(event => {
    // Grab the current value of what was written to the Realtime Database.
    const drawingId = event.params.drawingId;
    const parts = event.data.val();

    // If all are finished or one is inProgress
    if (
      parts.head.isFinished &&
      parts.body.isFinished &&
      parts.legs.isFinished
    ) {
      admin
        .database()
        .ref(`/activeDrawings/${drawingId}`)
        .remove();
      admin
        .database()
        .ref(`/users/${parts.head.uid}/drawings/${drawingId}`)
        .set({viewed: false});
      admin
        .database()
        .ref(`/users/${parts.body.uid}/drawings/${drawingId}`)
        .set({viewed: false});
      admin
        .database()
        .ref(`/users/${parts.legs.uid}/drawings/${drawingId}`)
        .set({viewed: false});
    }
  });

exports.drawingInProgress = functions.database
  .ref("/drawings/{drawingId}/parts")
  .onWrite(event => {
    // Grab the current value of what was written to the Realtime Database.
    const drawingId = event.params.drawingId;
    const parts = event.data.val();
    let uids = {};
    // Dynamically add uid's as properties so we know who's drawing
    // Should find a better method
    if (parts.head.uid) {
      uids[parts.head.uid] = true;
    }
    if (parts.body.uid) {
      uids[parts.body.uid] = true;
    }
    if (parts.legs.uid) {
      uids[parts.legs.uid] = true;
    }

    // If all are finished or one is inProgress
    if (
      parts.head.inProgress ||
      parts.body.inProgress ||
      parts.legs.inProgress
    ) {
      admin
        .database()
        .ref(`/activeDrawings/${drawingId}`)
        .remove();
    } else {
      admin
        .database()
        .ref(`/activeDrawings/${drawingId}`)
        .set(uids);
    }
  });
