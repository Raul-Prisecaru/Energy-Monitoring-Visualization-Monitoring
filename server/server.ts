const express = require("express");
require("dotenv").config();
const userRouters = require("./routes/userRoute.ts")
const mongoose = require("mongoose")
const app = express();
const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL)
app.use(express.json())


app.use("/api/user", userRouters)

app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)

})