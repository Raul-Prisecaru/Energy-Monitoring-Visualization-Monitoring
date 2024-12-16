const virtualDevice = require("../model/iotDevice");

// Function to Create virtualDevice
exports.createDevice = async (req, res) => {
    const newDevice = new virtualDevice({
        deviceType: req.body.deviceType,
        energyUsage: req.body.energyUsage,
        energyDate: req.body.energyDate
    })

    try {
        await newDevice.save()

        res.status(201).json({message: "Successfully created virtual Device"})

    } catch (err) {
        res.status(500).json({message: "Failed to create virtual device: " +  err})

    }

};

// Function to Update Device
exports.updateDevice = async (req, res) => {
    try {
        await virtualDevice.findByIdAndUpdate(req.param.id, req.body)
        res.status(201).json({message: "Successfully found and updated virtual device"})
    } catch (err) {
        res.status(500).json({message: "Failed to find or update virtual device: " +  err})
    }
};

// Function to Delete Device
exports.deleteDevice = async (req, res) => {
    try {
        await virtualDevice.findByIdAndDelete(req.param.id)
        res.status(201).json({message: "Successfully found and deleted virtual Device"})
    } catch (err) {

    }

};