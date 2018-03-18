import { db, auth } from "./index";

export async function createUser(userName, password) {
  const email = userName + '@flipdraw.com';
  const user = await auth.createUserWithEmailAndPassword(email, password);

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

export async function logInUser(userName, password) {
  const email = userName + '@flipdraw.com';
  const user = await auth.signInWithEmailAndPassword(email, password)
  return user.uid;
}
