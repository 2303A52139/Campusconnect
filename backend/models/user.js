const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["junior", "senior", "admin"],
        default: "junior"
    },

    bio: {
        type: String
    },

    company: {
        type: String
    },
    experience:{
        type: Number,
        default: 0
    },
    city:{
        type: String
    },
    availability: {
        type: String,
        enum: [
            "Available",
            "Limited Availability",
            "Not Accepting Requests"
        ],
        default: "Available"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);