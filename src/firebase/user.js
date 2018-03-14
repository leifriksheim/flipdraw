import { db, auth } from "./index";

export async function createUser(userName) {
  const user = await auth.signInAnonymously();

  // Add username to anonymous profile
  user.updateProfile({
    displayName: userName
  });

  db.ref(`users/${user.uid}`).set({
    userName: userName,
    uid: user.uid
  });
  return user.uid;
}
