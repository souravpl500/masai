const express = require("express");
const { bugModel } = require("../models/bugs.model");
const bugRouter = express.Router();

bugRouter.get("/", async (req, res) => {
  try {
    const bugs = await bugModel.find().sort({
      updatedAt: -1,
    });
    res.status(200).send(bugs);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
});

bugRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const newBug = new bugModel(payload);
    await newBug.save();
    res.status(201).send("New Bug successfully Added");
  } catch (err) {
    console.log("err : ", err);
    res.send({ msg: err });
  }
});

bugRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, severity } = req.body;
    const bug = await bugModel.findById({ _id: id });

    if (!bug) {
      return res.status(404).send({ message: "Bug not found" });
    }

    bug.title = title || bug.title;
    bug.severity = severity || bug.severity;

    await bug.save();
    res.status(200).send(bug);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
});

bugRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await bugModel.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The Post" });
  } catch {
    res.send("err");
  }
});

module.exports = { bugRouter };
