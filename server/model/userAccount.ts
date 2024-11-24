const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    // To Be Used Later when implemented basic logic
    // dateOfBirth: {
    //   type: Date,
    //   required: true
    // },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    }
})


const User = mongoose.model("User", userSchema)

module.exports = User