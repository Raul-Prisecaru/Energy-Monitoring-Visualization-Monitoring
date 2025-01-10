import * as express from "express";

import * as deviceController from "../controller/virtualDeviceController";
import {Router} from "express";
import {getDayCostDeviceGetDayCostDevice} from "../controller/virtualDeviceController";

const router: Router = express.Router();

// Router to get all devices
router.get("/", deviceController.getAllDevices)

// Router to get all energy Usage of every Category
router.get("/getEnergyOfEachCategory", deviceController.getEnergyOfEachCategory)

// Router to get cost produced per device
router.get("/getCostPerDevice", deviceController.getCostPerDevice)

// Router to get the total energy Usage of the month
router.get("/getCurrentMonthEnergyUsage", deviceController.getCurrentMonthEnergyUsage)

// Router to get current paying cost of the current month
router.get("/getCurrentMonthCost", deviceController.getCurrentMonthCost)

// Router to get energy Cost of every date
router.get("/getEnergyUsageCostPerMonth", deviceController.getEnergyUsageCostPerMonth)

// Router to get ordered list of most energy consumping devices
router.get("/getTopEnergyUsageDevices", deviceController.getTopEnergyUsageDevices)

// Router to get the energy Usage progress
router.get("/getEnergyUsageProgress", deviceController.getEnergyUsageProgress)

// Router to get the cost history Monthly
router.get("/getCostHistoryMonthly", deviceController.getCostHistoryMonthly)

router.get("/getEnergyAndCostAveragePerDevice", deviceController.getEnergyAndCostAveragePerDevice)

router.get("/getDeviceActiveStatusAndUsage", deviceController.getDeviceActiveStatusAndUsage)

// Router to get one device
router.get("/:id", deviceController.getOneDevice)

// Router to get energy Cost of the day
router.get("/getDayCostDevice/:id", deviceController.getDayCostDevice)

router.get("/getMonthCostDevice/:id", deviceController.getMonthCostDevice)

router.get("/getYearCostDevice/:id", deviceController.getYearCostDevice)

router.get("/getDayEnergyUsageDevice/:id", deviceController.getDayEnergyUsageDevice)

router.get("/getMonthEnergyUsageDevice/:id", deviceController.getMonthEnergyUsageDevice)

router.get("/getYearEnergyUsageDevice/:id", deviceController.getYearEnergyUsageDevice)



// Router to create device
router.post("/", deviceController.createDevice)

// Router to update device, Takes ID Param
router.put("/:id", deviceController.updateDevice)

// Router to delete device, Takes ID Param
router.delete("/:id", deviceController.deleteDevice)

// Export Router
export default router