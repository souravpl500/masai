const express = require("express");
const { connection } = require("./Configs/db");
const { userRouter } = require("./Routes/User.route");
const { bugRouter } = require("./Routes/Bug.route");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Home Page");
});

app.use("/users", userRouter);
app.use("/bug", bugRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log("Trouble connecting to the DB");
    console.log(err);
  }
  console.log(`Running at ${process.env.port} Port`);
});
