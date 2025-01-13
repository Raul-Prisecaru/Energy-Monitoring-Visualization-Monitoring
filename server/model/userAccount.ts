import mongoose from "mongoose";
import bcrypt from "bcrypt"
import {Float} from "@chakra-ui/react";

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
    ],

    settings: {
        monthlyCostGoal: {
            type: Number,
            default: 200
        },

        yearlyCostGoal: {
            type: Number,
            default: 2400
        },

        monthlyEnergyUsageGoal: {
            type: Number,
            default: 225
        },

        yearlyEnergyUsageGoal: {
            type: Number,
            default: 2700
        },

        pricePerkWh: {
            type: Float,
            default: 0.22
        }
    }
})


const User = mongoose.model("User", userSchema)


userSchema.methods.validatePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}


export default User