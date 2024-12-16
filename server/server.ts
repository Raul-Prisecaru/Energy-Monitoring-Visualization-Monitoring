const express = require("express");
require("dotenv").config();
const userRouters = require("./routes/userRoute")
const mongoose = require("mongoose")
const server = express();
const PORT = process.env.PORT

mongoose.connection(process.env.DATABASE_URL)
server.use(express.json)


server.use("/api/user", userRouters)

server.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)

})