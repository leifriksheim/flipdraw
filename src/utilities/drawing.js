function pickBodyPart(drawingData) {
  const bodyParts = [];
  if (!drawingData.parts.head.isFinished) bodyParts.push("head");
  if (!drawingData.parts.body.isFinished) bodyParts.push("body");
  if (!drawingData.parts.legs.isFinished) bodyParts.push("legs");
  // pick random body part from parts that are not finished
  return bodyParts[Math.floor(Math.random() * bodyParts.length)];
}

function findOverlaps(currentPart, allParts) {
  let data = {};

  // If drawing head, get top of body lines
  if (currentPart === "head") {
    data.bottom = allParts.body.data || [];
  }

  // If drawing body, get head and leg lines
  if (currentPart === "body") {
    data.top = allParts.head.data || [];
    data.bottom = allParts.legs.data || [];
  }

  // If drawing legs, get bottom of body lines
  if (currentPart === "legs") {
    data.top = allParts.body.data || [];
  }

  return data;
}

export { pickBodyPart, findOverlaps };
