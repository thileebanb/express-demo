const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const debugStartup = require("debug")("app:startup");
const { connect, model } = require("mongoose");
const config = require("config");
const debugDb = require("debug")("app:db");

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
  debugStartup("Morgan enabled");
  // console.log("Morgan enabled...");
}

async function connectDB() {
  try {
    await connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    debugDb("Connected to MongoDB...");
  } catch (error) {
    debugDb("Could not connect to MongoDB...", error);
  }
}

connectDB();

const Moi = model("Moi", {
  name: { type: String, required: true, minlength: 3 },
});

async function createMoi() {
  const moi = new Moi({
    name: "bala",
  });

  try {
    const result = await moi.save();
    console.log(result);
  } catch (error) {
    console.log(error.errors);
  }
}

createMoi();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}...`));
