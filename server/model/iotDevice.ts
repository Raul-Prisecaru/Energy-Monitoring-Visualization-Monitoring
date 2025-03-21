import mongoose from "mongoose";



const deviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

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
            },
            energyDate: {
                type: Date,
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