import mongoose from "mongoose";



const deviceSchema = new mongoose.Schema({

    deviceName: {
        type: String,
        required: true,
        trim: true
    },

    deviceType: {
        type: String,
        required: true,
        trim: true
    },

    energyHistory: {
        type: [
            {
            energyUsage: {
                type: Number,
                required: true,
            },
            energyDate: {
                type: Date,
                required: true,
            },
            },
        ],
        required: true
    },

    deviceStatus: {
        active: {
            type: Boolean,
            default: false
        },

        currentEnergyUsage: {
            type: Number,
            default: 0
        }
    }

});

const Device = mongoose.model("device", deviceSchema)

export default Device