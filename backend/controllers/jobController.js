const Job = require("../models/jobModel");

// create job
// POST /api/jobs
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all jobs (sorted + not archived)
/// GET /api/jobs
exports.getJobs = async (req, res) => {
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
// GET /api/jobs/:id
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update single job
// PUT /api/jobs/:id
exports.updateJob = async (req, res) => {
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

// batch update status
// PUT /api/jobs/batch
exports.batchUpdateStatus = async (req, res) => {
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

// archive a job
// DELETE /api/jobs/:id
exports.archiveJob = async (req, res) => {
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