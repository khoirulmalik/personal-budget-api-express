const express = require("express");
const app = express();
const myEnvelope = require("./myEnvelope");

const PORT = process.env.PORT || 3000;

let nextEnvelopeId = 6;

//middleware
app.use(express.json());

app.param("/id", (req, res, next, id) => {
  const envelopeId = Number(id);
  const envelopeIndex = myEnvelope.findIndex((env) => env.id === envelopeId);
  if (envelopeIndex === -1) {
    res.status(404).send("envelope not found");
  } else {
    req.envelopeIndex = envelopeIndex;
    next();
  }
});

app.get("/envelope", (req, res) => {
  res.send(myEnvelope);
});

app.get("/envelope/:id", (req, res) => {
  res.send(myEnvelope[req.envelopeIndex]);
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
  myEnvelope[req.envelopeIndex] = req.body;
  res.send(myEnvelope[req.envelopeIndex]);
});

app.delete("/envelope/:id", (req, res) => {
  myEnvelope.splice(req.envelopeIndex);
  res.status(204).send("delete success");
});

app.listen(PORT, () => {
  console.log(`Server running in: http://localhost:${PORT}`);
});
