import mongoose from "mongoose";
import bcrypt from "bcrypt"

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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next()
})


export default User