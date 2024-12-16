const mongoose = require("mongoose");



const deviceSchema = new mongoose({

    deviceType: {
        type: String,
        require: true,
        trim: true
    },

    energyUsage: {
        type: Number
    },

    energyDate: {
        type: Date
    }

})

const Device = mongoose.model("device", deviceSchema)

module.exports = Device