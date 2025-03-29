const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["PersonalRecord", "Award"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  value: String,
  subtitle: String,
  imageUrl: String,
  iconUrl: String,
  colorScheme: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
