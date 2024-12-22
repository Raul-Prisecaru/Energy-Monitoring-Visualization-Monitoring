const express = require("express");

const deviceController = require("../controller/virtualDeviceController.ts");

const router = express.Router();

// Router to create device
router.post("/", deviceController.createDevice)

// Router to update device, Takes ID Param
router.put("/:id", deviceController.updateDevice)

// Router to delete device, Takes ID Param
router.delete("/:id", deviceController.deleteDevice)

// Export Router
module.exports = router;