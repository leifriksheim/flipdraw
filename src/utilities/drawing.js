function pickBodyPart(drawingData) {
  const bodyParts = [];
  if (!drawingData.parts.head.isFinished) bodyParts.push("head");
  if (!drawingData.parts.body.isFinished) bodyParts.push("body");
  if (!drawingData.parts.legs.isFinished) bodyParts.push("legs");
  // pick random body part from parts that are not finished
  return bodyParts[Math.floor(Math.random() * bodyParts.length)];
}

function extractOverlappingLines(drawingData) {}

export { pickBodyPart };
