const express = require("express");

const deviceController = require("../controller/virtualDeviceController.ts");

const router = express.Router();

// Router to get all devices
router.get("/", deviceController.getAllDevices)

// Router to get all energy Usage of every Category
router.get("/getEnergyOfEachCategory", deviceController.getEnergyOfEachCategory)

// Router to get energy Cost of every date
router.get("/getEnergyUsageCostPerMonth", deviceController.getEnergyUsageCostPerMonth)

// Router to get ordered list of most energy consumping devices
router.get("/getTopEnergyUsageDevices", deviceController.getTopEnergyUsageDevices)

// Router to get the energy Usage progress
router.get("/getEnergyUsageProgress", deviceController.getEnergyUsageProgress)

// Router to get one device
router.get("/:id", deviceController.getOneDevice)

// Router to create device
router.post("/", deviceController.createDevice)

// Router to update device, Takes ID Param
router.put("/:id", deviceController.updateDevice)

// Router to delete device, Takes ID Param
router.delete("/:id", deviceController.deleteDevice)

// Export Router
module.exports = router;