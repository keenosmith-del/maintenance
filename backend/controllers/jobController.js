import Job from "../models/jobModel.js";

// create job
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all jobs
export const getJobs = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = { archived: false };

    if (status) {
      filter.status = status;
    }

    const jobs = await Job.find(filter).sort({
      status: 1,
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get single job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// batch update
export const batchUpdateStatus = async (req, res) => {
  try {
    const { ids, status } = req.body;

    await Job.updateMany(
      { _id: { $in: ids } },
      { status }
    );

    res.json({ message: "Jobs updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// archive job
export const archiveJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true }
    );

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json({ message: "Job archived" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};