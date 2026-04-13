const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low",
        },
        status: {
            type: String,
            enum: ["submitted", "in progress", "completed"],
            default: "submitted",
        },
        archived: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Job", jobSchema);