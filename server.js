const express = require("express");
const errorHandler = require("./Middleware/errorHandler");
const connectDB = require("./Config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const v1Routes = require("./Routes/index");
const bodyParser = require("body-parser");
const initializeCronJobs = require("./CronJobs/index"); // Import cron jobs initialization

// Connect to the database
// connectDB();

const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/v1", v1Routes);

app.use("/healthz", (req, res) => {
  res.status(200).json({
    status: "success",
    message: `${process.env.APP_NAME} Server is healthy`,
  });
});

// Error handling middleware
app.use(errorHandler);

// Initialize cron jobs
initializeCronJobs();

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
