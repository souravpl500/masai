const express = require("express");
const { JobModel } = require("../Models/jobs.model");

const jobRouter = express.Router();

jobRouter.use(express.json());

jobRouter.get("/", (req, res) => {
  const query = {};
  let data = JobModel.find();

  if (req.query.contract) {
    query.contract = req.query.contract;
  }
  if (req.query.location) {
    query.location = req.query.location;
  }
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
  }
  data.find(query, (error, jobData) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(jobData);
    }
  });
});

jobRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const newPost = new JobModel(payload);
    await newPost.save();
    res.status(201).json({ newPost, message: "New Job successfully Added" });
  } catch (err) {
    console.log("err :", err);
    res.send({ msg: err });
  }
});

jobRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    const job = await JobModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(204).send({
      success: true,
      msg: "Successfully Updated the job",
      jobs: job,
    });
    await job.save();
  } catch (err) {
    console.log({ err: err, msg: " Job Update Error!" });
    res.send({ success: false, msg: " Job Update Error!", err: err });
  }
});

jobRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await JobModel.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The Job" });
  } catch {
    console.log("err :", err);
    res.send({ msg: err });
  }
});

module.exports = {
  jobRouter,
};
