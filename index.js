const express = require("express");
const app = express();
const cors = require("cors");
const { wordRouter } = require("./routes/words.routes");
const { userRouter } = require("./routes/User.route");
const { scoreRouter } = require("./routes/scores.routes");
const { connection } = require("./config/db");

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
app.use("/word", wordRouter);
app.use("/score", scoreRouter);

app.listen(4500, async () => {
  try {
    await connection;
    console.log("Server has been started on 4500");
  } catch (err) {
    console.log(err);
  }
});
