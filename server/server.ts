import * as dotenv from "dotenv";
dotenv.config();


import cors from "cors";
import express from "express";
import userRouters from "./routes/userRoute";
import deviceRouters from "./routes/deviceRoute";
import authRoute from "./routes/authRouter"
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT



mongoose.connect(process.env.DATABASE_URL!);
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use("/api/user", userRouters)
app.use("/api/device", deviceRouters)
app.use("/api/auth/", authRoute)

app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)

})