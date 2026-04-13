import express from "express";
const router = express.Router();

import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  batchUpdateStatus,
  archiveJob,
} from "../controllers/jobController.js";

// create job
router.post("/", createJob);

// get all jobs (with filter)
router.get("/", getJobs);

// get single job
router.get("/:id", getJobById);

// batch update
router.put("/batch", batchUpdateStatus);

// update job
router.put("/:id", updateJob);

// archive job
router.delete("/:id", archiveJob);

export default router;