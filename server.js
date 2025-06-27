const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const app = express();
app.use(express.json());
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, ()=>console.log(`server is running now on ${PORT}`));