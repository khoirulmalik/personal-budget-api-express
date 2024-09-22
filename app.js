const express = require("express");
const app = express();
const myEnvelope = require("./myEnvelope");

const PORT = process.env.PORT || 3000;

app.get("/envelope", (req, res) => {
  res.send(myEnvelope);
});

app.get("/envelope/:id", (req, res) => {
  const getById = parseInt(req.params.id);
  const envelope = myEnvelope.find((env) => env.id === getById);

  console.log(envelope); // Log the envelope

  if (envelope) {
    res.send(envelope);
  } else {
    res.status(404).send("Envelope not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running in: http://localhost:${PORT}`);
});
