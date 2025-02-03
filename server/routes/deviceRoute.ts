import * as express from "express";

import {authMiddleware} from "../middleware/authMiddleware";
import * as deviceController from "../controller/virtualDeviceController";
import {Router} from "express";

const router: Router = express.Router();

// Router to get all devices
router.get("/", authMiddleware, deviceController.getAllDevices)

// Router to get all energy Usage of every Category
router.get("/getEnergyOfEachCategory", authMiddleware, deviceController.getEnergyOfEachCategory)

// Router to get cost produced per device
router.get("/getCostPerDevice", authMiddleware, deviceController.getCostPerDevice)

// Router to get the total energy Usage of the month
router.get("/getCurrentMonthEnergyUsage", authMiddleware,  deviceController.getCurrentMonthEnergyUsage)

router.get("/getTotalConnectedDevices", authMiddleware, deviceController.getTotalConnectedDevices)

// Router to get current paying cost of the current month
router.get("/getCurrentMonthCost", authMiddleware, deviceController.getCurrentMonthCost)

router.get("/getSpecifiedMonthCost/:month/:year", authMiddleware, deviceController.getSpecifiedMonthCost)

// router.get("/getCurrentYearCost", authMiddleware, deviceController.getCurrentYearCost)

router.get("/getSpecifiedYearCost/:year", authMiddleware, deviceController.getSpecifiedYearCost)


router.get("/getCostMonthGaugeChart", authMiddleware, deviceController.getCostMonthGaugeChart)

// Router to get energy Cost of every date
router.get("/getEnergyUsageCostPerMonth", authMiddleware, deviceController.getEnergyUsageCostPerMonth)

// Router to get ordered list of most energy consumping devices
router.get("/getTopEnergyUsageDevices", authMiddleware, deviceController.getTopEnergyUsageDevices)

// Router to get the energy Usage progress
router.get("/getMonthEnergyUsageProgress", authMiddleware, deviceController.getMonthEnergyUsageProgress)

// Router to get the cost history Monthly
router.get("/getCostHistoryMonthly",authMiddleware, deviceController.getCostHistoryMonthly)

// Router to get the average energy usage and cost of every month
router.get("/getMonthlyEnergyAndCostAveragePerDevice", authMiddleware ,deviceController.getMonthlyEnergyAndCostAveragePerDevice)

// Router to get status of devices
router.get("/getDeviceActiveStatusAndUsage", authMiddleware, deviceController.getDeviceActiveStatusAndUsage)

// Router to get one device
router.get("/:id", authMiddleware ,deviceController.getOneDevice)

// Router to get cost history of the current day
router.get("/getDayCostDevice/:id", authMiddleware, deviceController.getDayCostDevice)

// Router to get cost history of the current month
// router.get("/getMonthCostDevice/:id",authMiddleware,  deviceController.getMonthCostDevice)

// Router to get cost history of the current year
// router.get("/getYearCostDevice/:id", authMiddleware, deviceController.getYearCostDevice)

// Router to get energy usage history of current day
router.get("/getDayEnergyUsageDevice/:id", authMiddleware, deviceController.getDayEnergyUsageDevice)

// Router to get energy usage history of current month
// router.get("/getMonthEnergyUsageDevice/:id", authMiddleware, deviceController.getMonthEnergyUsageDevice)

// Router to get energy usage history of current year
// router.get("/getYearEnergyUsageDevice/:id", authMiddleware, deviceController.getYearEnergyUsageDevice)

// Router to get energy usage history of the device
router.get("/getEnergyHistoryDevice/:id", authMiddleware, deviceController.getEnergyHistoryDevice)

// Router to get cost history of the device
router.get("/getCostHistoryDevice/:id", authMiddleware, deviceController.getCostHistoryDevice)

// Router to create device
router.post("/", authMiddleware , deviceController.createDevice)

router.patch("/:id", authMiddleware, deviceController.addEnergyHistory)

// Router to update device, Takes ID Param
router.put("/:id", authMiddleware, deviceController.updateDevice)

// Router to delete device, Takes ID Param
router.delete("/:id", authMiddleware, deviceController.deleteDevice)

// Export Router
export default router