const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:startup");

const home = require("./routes/home");
const api = require("./routes/api");

const log = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(log);

app.use("/", home);
app.use("/api", api);

app.set("view engine", "pug");
app.set("views", "./views"); // Optional

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled");
  // console.log("Morgan enabled...");
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));
