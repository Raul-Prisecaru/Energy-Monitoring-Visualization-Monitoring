const virtualDevice = require("../model/iotDevice.ts");

/**
 * Function Responsible for retrieving all Devices
 * @return res - 201 response with json of all devices else 500 response
 */
exports.getAllDevices = async (req, res) => {
    try {
        const allDevices = await virtualDevice.find()
        res.status(201).json(allDevices)
    } catch (err) {
        res.status(500).json( {message: "Failed to retrieve all Devices" + err} )
    }
}

/**
 * Function Responsible for retrieving the specified device via id
 * @param req - Device ID
 * @return res - 201 response with json of device else 500 response
 */
exports.getOneDevice = async (req, res) => {
    try {
        const oneDevice = await virtualDevice.findById(req.params.id)
        res.status(201).json(oneDevice)
    } catch (err) {
        res.status(500).json( { message: "Failed to retrieve the Device" + err })
    }
}

/**
 * Function Responsible for retrieving total energy Usage of each Device Category
 * @param res - 201 response with json else 500 response
 */
exports.getEnergyOfEachCategory = async (req, res) => {
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

/**
 * Function Responsible for retrieving of the total energy Prediction throughout the year
 * @return res - 201 response with json, else 500 response
 */
exports.getEnergyUsagePrediction = async (req, res) => {

}


/**
 * Function Responsible for retrieving the energy Usage Cost per Month
 * @param res - 201 response with JSON, else 500 response
 */
exports.getEnergyUsageCostPerMonth = async (req, res) => {
    try {
        const getCostDate = {}

        const allDevices = await virtualDevice.find();

        allDevices.forEach((device) => {

            console.log("-- EnergyUsage Test --")

            device.energyHistory.forEach((history) => {
                if (!getCostDate[history.energyDate]) {
                    getCostDate[history.energyDate] = 0
                }

                getCostDate[history.energyDate] += (history.energyUsage * 0.22)
            })
        })

        res.status(201).json(getCostDate)


    } catch (err) {
        res.status(500).json({error: "There has been an error: " + err})
    }
}

exports.getEnergyUsageProgress = async (req, res) => {
    try {
        const energyProgress = {
            total: 0,
            limit: 1500
        }

        const allDevices = await virtualDevice.find()

        allDevices.forEach((device) => {
            energyProgress["total"] = device.energyHistory.reduce((total, next) => {
                return total + next.energyUsage
            }, 0)

        })

        res.status(201).json(energyProgress)



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