import { useState, useEffect } from "react";

function App() {
  const [jobs, setJobs] = useState([]);

  const [filter, setFilter] = useState("");

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("low");

  const [selected, setSelected] = useState([]);
  const [batchStatus, setBatchStatus] = useState("submitted");

  const loadJobs = async () => {
    const url = filter
      ? `http://localhost:5050/api/jobs?status=${filter}`
      : "http://localhost:5050/api/jobs";


    const res = await fetch(url);
    const data = await res.json();
    setJobs(data);
  };

  const createJob = async () => {
    if (!description || !location) {
      alert("Please fill in all fields");
      return;
    }

    await fetch("http://localhost:5050/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        location,
        priority,
      }),
    });

    // clear form
    setDescription("");
    setLocation("");
    setPriority("low");

    // reload jobs
    loadJobs();
  };

  const archiveJob = async (id) => {
    await fetch(`http://localhost:5050/api/jobs/${id}`, {
      method: "DELETE",
    });

    loadJobs();
  };

  const batchUpdate = async () => {
    if (selected.length === 0) {
      alert("Select at least one job");
      return;
    }

    await fetch("http://localhost:5050/api/jobs/batch", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: selected,
        status: batchStatus,
      }),
    });

    setSelected([]);
    loadJobs();
  };

  useEffect(() => {
    loadJobs();
  }, [filter]);

  useEffect(() => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

  return ( 
    <div className="app">
      <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <i data-lucide="brush-cleaning" width="30" height="30"></i>
        Maintenance Manager
      </h1>

      <div className="divider"></div>

      <div className="section">
        {/* FORM */}
        <div className="glass">
          <input
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoFocus={true}
          />

          <input
            placeholder="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <p className="label">priority: </p>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          <button
            onClick={createJob}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
          >
            <i data-lucide="check" width="16" height="16"></i>
            Submit Job
          </button>
        </div>
      </div>

      <p className="label">Filter Jobs</p>

      <div className="section">
        {/* FILTER */}
        <div className="controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Jobs</option>
            <option value="submitted">Submitted</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <p className="label">Batch Update</p>

      <div className="section">
        {/* BATCH */}
        <div className="batch-group">
          <select
            value={batchStatus}
            onChange={(e) => setBatchStatus(e.target.value)}
          >
            <option value="submitted">Submitted</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            className="update-btn"
            onClick={batchUpdate}
            disabled={selected.length === 0}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <i data-lucide="refresh-cw" width="14" height="14"></i>
            Update Selected
          </button>
        </div>
      </div>

      <p className="label">
        {selected.length > 0
          ? `${selected.length} job(s) selected`
          : "Select jobs to update their status"}
      </p>

      {jobs.map((job) => (
        <div className="job" key={job._id}>
        {/* TOP: description + location */}
        <div className="job-main">
          <strong>{job.description}</strong>
          <small>{job.location}</small>
        </div>

        {/* BOTTOM: actions */}
        <div className="job-row">
          <input
            type="checkbox"
            checked={selected.includes(job._id)}
            onChange={() => {
              if (selected.includes(job._id)) {
                setSelected(selected.filter((id) => id !== job._id));
              } else {
                setSelected([...selected, job._id]);
              }
            }}
          />

          <button
            className="archive-btn"
            onClick={() => archiveJob(job._id)}
          >
            Archive
          </button>
        </div>

        <div className="job-status">
          {job.priority} • {job.status}
        </div>
      </div>
      ))}
    </div>
  );
}

export default App;