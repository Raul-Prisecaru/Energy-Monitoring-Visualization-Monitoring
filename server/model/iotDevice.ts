const mongoose = require("mongoose");



const deviceSchema = new mongoose.Schema({

    deviceName: {
        type: String,
        require: true,
        trim: true
    },

    deviceType: {
        type: String,
        require: true,
        trim: true
    },

    energyHistory: {

        energyUsage: {
            type: Number,
            require: true
        },

        energyDate: {
            type: Date,
            require: true
        }
    },

})

const Device = mongoose.model("device", deviceSchema)

module.exports = Device