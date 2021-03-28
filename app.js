const express = require("express");
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
  if (!req.body.name || req.body.name.length < 3) {
    res
      .status(400)
      .send("Name is required and should be minimum 3 characters.");
    return;
  }

  const moi = {
    id: mois.length + 1,
    name: req.body.name,
  };
  mois.push(moi);
  res.send(moi);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));
