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
    },

    devices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device'
        }
    ]
})


const User = mongoose.model("User", userSchema)


userSchema.methods.validatePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}


export default User