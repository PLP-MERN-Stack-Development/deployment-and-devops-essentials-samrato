const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectDB = require("./Config/db");
const routes = require("./Routes/routes");
const Jobs=require("./utils/cron")
const app = express();

dotenv.config();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // Add your frontend URL here ni god manze....
  "https://katiba-ai.vercel.app" // If you have a live domain, add it here
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`Blocked by CORS: ${origin}`);
        callback(new Error("CORS Policy Violation: Access Denied"));
      }
    },
    credentials: true,
  })
);

app.use("/api", routes);

const PORT = process.env.PORT || 6000;
Jobs.start();
const startServer = async () => {
  try {
    await ConnectDB(); // connect to DB first
    app.listen(PORT, () => {
      console.log(`Server running on localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to DB:', error);
  }
};

startServer();
