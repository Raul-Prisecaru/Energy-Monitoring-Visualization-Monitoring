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
    try {
        const categoryJSONUsage = {}

        const allDevices = await virtualDevice.find()

        allDevices.forEach((device) => {
            const deviceCategory = device.deviceType;
            const totalEnergyUsage = device.energyHistory.reduce((total, next) => {
                return total + next.energyUsage
            }, 0)

            if(!categoryJSONUsage[deviceCategory]) {
                categoryJSONUsage[deviceCategory] = 0;
            }

            categoryJSONUsage[deviceCategory] += totalEnergyUsage
        })

        res.status(201).json(categoryJSONUsage)

    } catch (err) {
        res.status(500).json({error: "There has been an error try to retrieve each category Usage: " + err})
    }
}


exports.getCostEnergyUsage = async (req, res) => {
    try {
        const getCostDate = {}

        const allDevices = await virtualDevice.find();

        allDevices.forEach((device) => {
            const energyHistory = device.energyHistory;

            console.log("-- EnergyUsage Test --")

            device.energyHistory.forEach((history) => {
                console.log(history.energyUsage)
                console.log(history.energyDate)
            })
        })


    } catch (err) {
        res.status(500).json({error: "There has been an error: " + err})
    }
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