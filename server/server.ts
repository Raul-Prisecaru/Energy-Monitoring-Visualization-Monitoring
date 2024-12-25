require("dotenv").config();
const express = require("express");
const userRouters = require("./routes/userRoute.ts")
const deviceRouters = require("./routes/deviceRoute.ts")
const mongoose = require("mongoose")
const app = express();
const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL)
app.use(express.json())


app.use("/api/user", userRouters)
app.use("/api/device", deviceRouters)

app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)

})