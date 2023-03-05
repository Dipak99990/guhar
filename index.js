const express = require("express");
const cors = require("cors");
const Feedback = require("./schemas.js");
const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://Dpksrm:123@cluster0.2tf8k9k.mongodb.net/?retryWrites=true&w=majority/feedbacks"
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    throw new Error("Error connecting to MongoDB: " + err);
  }
}

main();

const app = express();
express.urlencoded({ extended: true });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//posting in db
app.post("/", async (req, res) => {
  try {
    const feedback = new Feedback({
      username: req.body.username,
      comment: req.body.comment,
    });
    const result = await feedback.save();
    res.send(result);
  } catch (err) {
    console.error("Error saving feedback to MongoDB:", err);
    res.status(500).send("Error saving feedback to MongoDB");
  }
});

//getting from db
app.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    res.send(feedback);
  } catch (err) {
    console.error("Error retrieving feedback from MongoDB:", err);
    res.status(500).send("Error retrieving feedback from MongoDB");
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
