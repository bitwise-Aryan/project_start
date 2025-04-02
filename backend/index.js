//packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors

//utils
import connectDb from "./config/db.js"; 

dotenv.config();
const port = process.env.PORT || 5000;

connectDb();
const app = express();

app.use(cors({
    origin: "*", // Allows requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    credentials: true // Allows cookies if needed
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => console.log(`Server running on port:${port}`));