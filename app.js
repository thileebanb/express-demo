const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

const mois = [
  { id: 1, name: "thileeban" },
  { id: 2, name: "balasundaram" },
];

app.get("/", (req, res) => {
  res.send(mois);
});

app.get("/api/:id", (req, res) => {
  const params = req.params;
  const query = req.query;
  res.send({ ...params, ...query });
});

app.post("/api", (req, res) => {
  // Joi Validation
  const { error } = validateMoi(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Manual Validation
  // if (!req.body.name || req.body.name.length < 3) {
  //   res
  //     .status(400)
  //     .send("Name is required and should be minimum 3 characters.");
  //   return;
  // }

  const moi = {
    id: mois.length + 1,
    name: req.body.name,
  };
  mois.push(moi);
  res.send(moi);
});

app.put("/api:id", (req, res) => {
  const id = req.params.id;
  const moi = mois.find((m) => m.id === parseInt(id));
  if (!moi) return res.status(404).send("Record not found");

  const { error } = validateMoi(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  moi.name = req.body.name;
  res.status(200).send(moi);
});

function validateMoi(moi) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(moi);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));
