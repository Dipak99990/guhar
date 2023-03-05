const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  username: String,
  comment: String,
});
const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
