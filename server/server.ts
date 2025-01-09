import * as dotenv from "dotenv";
dotenv.config();


import cors from "cors";
import express from "express";
import userRouters from "./routes/userRoute";
import deviceRouters from "./routes/deviceRoute";
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT




mongoose.connect(process.env.DATABASE_URL!);
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/api/user", userRouters)
app.use("/api/device", deviceRouters)

app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)

})