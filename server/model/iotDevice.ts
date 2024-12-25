const mongoose = require("mongoose");



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
});

const Device = mongoose.model("device", deviceSchema)

module.exports = Device