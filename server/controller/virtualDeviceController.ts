const virtualDevice = require("../model/iotDevice.ts");

// Function to get all users
exports.getAllDevices = async (req, res) => {
    try {
        const allDevices = await virtualDevice.find()
        res.json(allDevices)
    } catch (err) {
        res.status(500).json( {message: "Failed to retrieve all Devices" + err} )
    }
}

exports.getOneDevice = async (req, res) => {
    try {
        const oneDevice = await virtualDevice.findById(req.params.id)
        res.json(oneDevice)
    } catch (err) {
        res.status(500).json( { message: "Failed to retrieve the Device" + err })
    }
}

// Function to get the energyUsage of each device category
exports.getCategoryEnergy = async (req, res) => {

}


// Function to Create virtualDevice
exports.createDevice = async (req, res) => {
    const newDevice = new virtualDevice({
        deviceName: req.body.deviceName,
        deviceType: req.body.deviceType,
        energyHistory: req.body.energyHistory
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