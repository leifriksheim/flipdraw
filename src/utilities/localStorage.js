const emptyStateObj = {
  userName: "",
  userKey: ""
};

function loadUserData() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return emptyStateObj;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return emptyStateObj;
  }
}

function saveUserData(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // Oh well..
  }
}

export { loadUserData, saveUserData };
