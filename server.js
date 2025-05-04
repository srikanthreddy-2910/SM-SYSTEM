const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const pool = require("./config/db");
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/logInRoute");
const schoolRoutes = require("./routes/registerSclRoute");

// Routes
app.use("/api/schools", schoolRoutes);
app.use("/api/auth", authRoutes);

// PostgreSQL Connect Test
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch((err) => {
    console.error("PostgreSQL connection error:", err);
    process.exit(1);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
  pool.end(() => {
    console.log("PostgreSQL pool has ended");
    process.exit(0);
  });
});
