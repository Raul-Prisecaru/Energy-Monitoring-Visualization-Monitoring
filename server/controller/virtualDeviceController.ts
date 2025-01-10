import virtualDevice from "../model/iotDevice";

/**
 * Function Responsible for retrieving all Devices
 * @return res - 201 response with json of all devices else 500 response
 */
export const getAllDevices = async (req: any, res:any) => {
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
export const getOneDevice = async (req: any, res:any) => {
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
export const getEnergyOfEachCategory = async (req: any, res:any) => {
    try {
        const categoryJSONUsage: any = {}

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
 * Function Responsible for retrieving the top devices based on energyUsage
 * @param res - 201 response with json else 500 response
 */
export const getTopEnergyUsageDevices = async (req: any, res:any) => {
    try {
        let counter: number = 0;
        const topDeviceJSON: Record<string, number> = {}

        const allDevices = await virtualDevice.find();

        const tempArray: any[] = []
        allDevices.forEach((device) => {


            const totalEnergy: number = device.energyHistory.reduce((total, next) => {
                return total + next.energyUsage
            }, 0);
            counter += 1
            tempArray.push(["Device " + counter, totalEnergy])
            tempArray.sort((a: [string, number], b: [string, number]) => b[1] - a[1])

            tempArray.forEach(([key, pair]:any) => {
                topDeviceJSON[key] = pair
            })

        })

        return res.status(201).json(topDeviceJSON);
    } catch (err) {
        res.status(500).json({error: "There has been an error try to retrieve each category Usage: " + err})
    }

}

/**
 * Function Responsible for retrieving the current paying cost of the current month
 * @return res - 201 response with json, else 500
 */
export const getCurrentMonthCost = async (req: any, res:any) => {
    try {
        const allDevices = await virtualDevice.find();

        let totalCost = 0;
        const currentMonth = new Date().getMonth()

        allDevices.forEach((device) => {

            totalCost += device.energyHistory.reduce((total, next) => {
                // console.log(currentMonth)
                if (next.energyDate.getMonth() === currentMonth) {
                    console.log("Reached")
                    console.log(total + next.energyUsage)

                    return total + next.energyUsage
                }
                return total
            }, 0);

        })

        // TODO: Change this to get the user's actual paying amount
        totalCost *= 0.22;

        res.status(201).json({totalCost})


    } catch (err) {
        res.status(500).json({err: "Failed to retrieve the current month's cost: " + err})
    }


}

/** Function Responsible for retrieving cost of each month
 * @param res - 201 if successful, else 500
 */
export const getEnergyUsageHistoryMonthly = async (req: any, res: any) => {
    try {
        let counter: number = 0;
        let costJson: { [key: string]: number[] }  = {}

        const allDevice = await virtualDevice.find();
        allDevice.forEach((device) => {
            counter += 1;
            device.energyHistory.forEach((next) => {

                if (!costJson["Device " + counter]) {
                    costJson["Device " + counter] = [];
                }

                // Accumulate energy usage cost
                costJson["Device " + counter].push(next.energyUsage);
            });
        });

        res.status(201).json(costJson);
    } catch (err) {
        res.status(500).json({ err: "Failed to retrieve the history data of devices: " + err });
    }
};


/** Function Responsible for retrieving cost of each month
 * @param res - 201 if successful, else 500
 */
export const getCostHistoryMonthly = async (req: any, res: any) => {
    try {


        let costJson: { [key: string]: number } = {}
        const allDevice = await virtualDevice.find();
        allDevice.forEach((device) => {
                device.energyHistory.forEach((next) => {
                    const date = new Date(next.energyDate);
                    const month = date.toLocaleString("default", {month: "long"})
                    if (!costJson[month]) {
                        costJson[month] = 0;
                    }
                    costJson[month] += (next.energyUsage * 0.22);
                });
            });

        res.status(201).json(costJson)
    } catch (err) {
        res.status(500).json({err: "Failed to retrieve the history data of devices: " + err})
    }
}


/**
 * Function Responsible for retrieving the total energy used in current month
 * @param req
 * @param res
 */
export const getCurrentMonthEnergyUsage = async (req: any, res: any) => {
    try {
        const allDevices = await virtualDevice.find();
        let totalEnergy: number = 0
        const currentMonth: number = new Date().getMonth();

        allDevices.forEach((device) => {

            totalEnergy += device.energyHistory.reduce((total, next) => {
                // console.log(currentMonth)
                if (next.energyDate.getMonth() === currentMonth) {
                    console.log("Reached")
                    console.log(total + next.energyUsage)

                    return total + next.energyUsage
                }
                return total
            }, 0);

        })

        res.status(201).json(totalEnergy)

    } catch (err) {
        res.status(201).json({err: "Failed to retrieve the current month energy Usage: " + err})
    }
}


/**
 * Function Responsible for retrieving of the total energy Prediction throughout the year
 * @return res - 201 response with json, else 500 response
 */
// exports.getEnergyUsagePrediction = async (req, res) => {
//
// }


/**
 * Function Responsible for retrieving the energy Usage Cost per Month
 * @param res - 201 response with JSON, else 500 response
 */
export const getEnergyUsageCostPerMonth = async (req: any, res:any) => {
    try {
        const getCostDate: Record<number, number> = {}

        const allDevices = await virtualDevice.find();

        allDevices.forEach((device) => {

            device.energyHistory.forEach((history) => {
                if (!getCostDate[history.energyDate.getMonth()]) {
                    getCostDate[history.energyDate.getMonth()] = 0
                }

                getCostDate[history.energyDate.getMonth()] += (history.energyUsage * 0.22)
            })
        })

        res.status(201).json(getCostDate)


    } catch (err) {
        res.status(500).json({error: "There has been an error: " + err})
    }
}

/**
 * Function Responsible for retrieving the cost of each Device
 * TODO: toggle for Between Day / Month / Year?
 */
export const getCostPerDevice = async (req: any, res: any) => {
  try {
      let counter: number = 0;
      const deviceCost: Record<string, number> = {};
      const allDevice = await virtualDevice.find()

      allDevice.forEach((device) => {
          const totalEnergy: number = device.energyHistory.reduce((total, next) => {
              return total + next.energyUsage
          }, 0);
          counter += 1;
          deviceCost["device " + counter] = totalEnergy;
      })


      res.status(201).json(deviceCost)
  } catch (err) {
      res.status(500).json({error: "There has been an error retriving cost of each device: " + err})
  }
}

/**
 * Function Responsible for retrieving amount of energy user has used with targeted energy Usage
 * @param res - 201 Response with json else 500 response
 */
export const getEnergyUsageProgress = async (req: any, res:any) => {
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

/**
 * Method Responsible for creating Device and storing to the Database
 * @param req.body.deviceName - Device Name
 * @param req.body.deviceType - Device Type
 * @param req.body.EnergyHistory - Array that takes energyUsage (int) and energyDate (Date)
 * @param res - 201 response else 500 response
 */
export const createDevice = async (req: any, res:any) => {
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

/**
 * Method Responsible for finding and updating specified device
 * @param req.param.id - Device ID
 * @param req.body.deviceName - Device Name
 * @param req.body.deviceType - Device Type
 * @param req.body.EnergyHistory - Array that takes energyUsage (int) and energyDate (Date)
 * @param res - 201 response else 500 response
 */
export const updateDevice = async (req: any, res:any) => {
    try {
        await virtualDevice.findByIdAndUpdate(req.param.id, req.body)
        res.status(201).json({message: "Successfully found and updated virtual device"})
    } catch (err) {
        res.status(500).json({message: "Failed to find or update virtual device: " +  err})
    }
};

/**
 * Method Responsible for finding and deleting specified device
 * @param res.param.id - Device ID
 */
export const deleteDevice = async (req: any, res:any) => {
    try {
        await virtualDevice.findByIdAndDelete(req.param.id)
        res.status(201).json({message: "Successfully found and deleted virtual Device"})
    } catch (err) {
        res.status(500).json({error: "Failed to Delete Device" + err})
    }

};


