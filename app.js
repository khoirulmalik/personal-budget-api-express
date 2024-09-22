const express = require("express");
const app = express();
const myEnvelope = require("./myEnvelope");

const PORT = process.env.PORT || 3000;

let nextEnvelopeId = 6;

//middleware
app.use(express.json());

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

app.post("/envelope", (req, res) => {
  const { nama, budget } = req.body;

  if (req.body) {
    const newEnvelope = {
      id: (nextEnvelopeId += 1),
      nama,
      budget,
    };

    myEnvelope.push(newEnvelope);
    res.status(201).send("success");
  } else {
    res.status(400).send("failed");
  }
});

app.put("/envelope/:id", (req, res) => {
  const envelopeId = Number(req.params.id);
  const envelopeIndex = myEnvelope.findIndex((env) => env.id === envelopeId);
  if (envelopeIndex !== -1) {
    myEnvelope[envelopeIndex] = req.body;
    res.send(myEnvelope[envelopeIndex]);
  } else {
    res.status(404).send("envelope not foud");
  }
});

app.delete("/envelope/:id", (req, res) => {
  const envelopeId = Number(req.params.id);
  const envelopeIndex = myEnvelope.findIndex((env) => env.id === envelopeId);
  if (envelopeIndex !== -1) {
    myEnvelope.splice(envelopeIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("envelope not foud");
  }
});

app.listen(PORT, () => {
  console.log(`Server running in: http://localhost:${PORT}`);
});
