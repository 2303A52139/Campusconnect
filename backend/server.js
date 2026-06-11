const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const requestRoutes = require("./routes/requestRoutes");
const startExpireRequestsJob =
  require("./jobs/expireRequests");

dotenv.config();
const seniorRoutes = require("./routes/seniorRoutes");
const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/seniors", seniorRoutes);
app.use("/api/requests", requestRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    startExpireRequestsJob();
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("CampusConnect Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});