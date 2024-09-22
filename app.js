const express = require("express");
const app = express();
const myEnvelope = require("./myEnvelope");

const PORT = process.env.PORT || 3000;

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
      id: myEnvelope.length + 1,
      nama,
      budget,
    };

    myEnvelope.push(newEnvelope);
    res.status(201).send("success");
  } else {
    res.status(400).send("failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server running in: http://localhost:${PORT}`);
});
