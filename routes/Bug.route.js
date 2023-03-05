const express = require("express");
const { BugModel } = require("../Models/Bugs.model");
const bugRouter = express.Router();

bugRouter.get("/", async (req, res) => {
  try {
    const bugs = await BugModel.find().sort({
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
    const newBug = new BugModel(payload);
    await newBug.save();
    res.status(201).json({ newPost, message: "New Bug successfully Added" });
  } catch (err) {
    console.log("err : ", err);
    res.send({ msg: err });
  }
});

bugRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, severity } = req.body;
    const bug = await BugModel.findById({ _id: id });

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
    await BugModel.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The Post" });
  } catch {
    res.send("err");
  }
});

module.exports = { bugRouter };
