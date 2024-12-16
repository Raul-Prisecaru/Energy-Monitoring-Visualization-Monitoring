const virtualDevice = require("../model/iotDevice");

// Function to Create virtualDevice
exports.createDevice = async (req, res) => {
    const deviceData = req.body;
    const newDevice = new virtualDevice(deviceData)

    try {

    } catch (err) {

    }

};

// Function to Update Device
exports.updateDevice = async (req, res) => {
    try {

    } catch (err) {

    }
};

// Function to Delete Device
exports.deleteDevice = async (req, res) => {
    try {

    } catch (err) {

    }

};