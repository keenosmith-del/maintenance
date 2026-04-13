const express = require("express");
const router = express.Router();

const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    batchUpdateStatus,
    archiveJob,
} = require("../controllers/jobController");

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

module.exports = router;