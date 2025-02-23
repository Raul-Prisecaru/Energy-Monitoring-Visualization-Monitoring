import virtualDevice from "../model/iotDevice";
import Device from "../model/iotDevice";
import User from "../model/userAccount";

/**
 * Function Responsible for retrieving all Devices
 * @return res - 201 response with json of all devices else 500 response
 */
export const getAllDevices = async (req: any, res:any) => {
    try {
        const allDevices = await virtualDevice.find({userId: req.user.id})
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
        const oneDevice = await virtualDevice.findById(req.user.id)
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

        const allDevices = await virtualDevice.find({userId: req.user.id})

        allDevices.forEach((device) => {
            const deviceCategory = device.deviceType;
            const totalEnergyUsage = device.energyHistory.reduce((total: any, next: any) => {
                if (next.energyUsage && next.energyDate) {
                    const todayDate = new Date()
                    if (next.energyDate.getMonth() == todayDate.getMonth() && next.energyDate.getFullYear() == todayDate.getFullYear())
                    return total + next.energyUsage
                }

                return total
            }, 0)

            if(!categoryJSONUsage[deviceCategory]) {
                categoryJSONUsage[deviceCategory] = 0;
            }

            categoryJSONUsage[deviceCategory] += (totalEnergyUsage / 1000)
        })

        console.log(categoryJSONUsage)
        res.status(201).json(categoryJSONUsage)

    } catch (err) {
        res.status(500).json({error: "There has been an error try to retrieve each category Usage: " + err})
    }
}

export const getTotalConnectedDevices = async (req: any, res: any) => {
    try {
        let counter: number = 0;
        const allDevices = await virtualDevice.find({userId: req.user.id})

        allDevices.forEach((device) => {
            counter++
        })

        res.status(200).json(counter)
    } catch (err) {
        res.status(500).json({error: "There has been an error trying to retrieve total devices for the user"})
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


            const totalEnergy: number = device.energyHistory.reduce((total: number, next: any) => {
                if (next.energyUsage) {
                    return total + next.energyUsage
                }
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


// export const getCurrentMonthCostGauge = async (req: any, res: any) => {
//     try {
//         const allDevices = await virtualDevice.find({ userId: req.user.id});
//         let totalCost = 0;
//         const currentMonth = new Date().getMonth()
//
//         allDevices.forEach((device) => {
//
//             totalCost += device.energyHistory.reduce((total:number, next:any) => {
//                 // console.log(currentMonth)
//                 if(next.energyDate){
//                     if (next.energyDate.getMonth() === currentMonth) {
//
//                         if (next.energyUsage) {
//                             return total + next.energyUsage
//                         }
//                     }
//                 }
//                 return total
//             }, 0);
//
//         })
//
//         // TODO: Change this to get the user's actual paying amount
//         const calculatedCost = ((totalCost / 1000) * 0.22).toFixed(2)
//
//         res.status(201).json(calculatedCost)
//
//
//     } catch (err) {
//         res.status(500).json({err: "Failed to retrieve the current month's cost: " + err})
//     }
//
//
// }



/**
 * Function Responsible for retrieving the current paying cost of the current month
 * @return res - 201 response with json, else 500
 */
export const getCurrentMonthCost = async (req: any, res:any) => {
    try {
        const allDevices:any = await virtualDevice.find({ userId: req.user.id});
        const foundUser:any = await User.findById(req.user.id);
        let jsonCost: any = {}

        if (!foundUser) {
            return res.status(404).json({err: "Couldn't find user"})
        }

        if (!foundUser.settings?.pricePerkWh) {
            return res.status(400).json({ error: 'Price per kWh is not set for the user' });
        }

        let totalCost = 0;
        const currentMonth = new Date().getMonth()

        allDevices.forEach((device:any) => {

            totalCost += device.energyHistory.reduce((total:number, next:any) => {
                // console.log(currentMonth)
                if(next.energyDate){
                    if (next.energyDate.getMonth() === currentMonth && next.energyDate.getFullYear() == new Date().getFullYear()) {

                        if (next.energyUsage) {
                            return total + next.energyUsage
                        }
                    }
                }
                return total
            }, 0);
        })

        jsonCost = Number(((totalCost / 1000) * foundUser.settings.pricePerkWh).toFixed(2))

        res.status(201).json(jsonCost)


    } catch (err) {
        res.status(500).json({err: "Failed to retrieve the current month's cost: " + err})
    }

}

/**
 * Function Responsible for retrieving the paying cost of the specified month and year
 * @return res - 201 response with json, else 500
 */
export const getSpecifiedMonthCost = async (req: any, res:any) => {
    try {
        const allDevices = await virtualDevice.find();
        const specifiedMonth:number = await req.params.month
        const specifiedYear:number = await req.params.year
        const foundUser: any = await User.findById(req.user.id)

        // if (!foundUser) {
        //     return res.status(404).({err: "Failed to find user"})
        // }

        let totalCost: number = 0;
        allDevices.forEach((device) => {

            totalCost += device.energyHistory.reduce((total:number, next:any) => {
                if(next.energyDate){
                    if (next.energyDate.getMonth() == specifiedMonth && next.energyDate.getFullYear() == specifiedYear) {
                        if (next.energyUsage) {
                            console.log(total + next.energyUsage)
                            return total + next.energyUsage
                        }
                    }
                }
                return total
            }, 0);

        })
        const calculatedCost = (totalCost / 1000) * foundUser.settings.pricePerkWh;
        res.status(201).json(calculatedCost)


    } catch (err) {
        res.status(500).json({err: "Failed to retrieve the current month's cost: " + err})
    }
}


/**
 * Function Responsible for retrieving the paying cost of the current year
 * @return res - 201 response with json, else 500
 */
export const getCurrentYearCost = async (req: any, res:any) => {
    try {
        const allDevices = await virtualDevice.find();
        const currentYear = new Date().getFullYear()
        let totalCost = 0;
        const foundUser = await User.findById(req.user.id)
        allDevices.forEach((device) => {

            totalCost += device.energyHistory.reduce((total:number, next:any) => {
                if(next.energyDate){
                    if (next.energyDate.getFullYear() == currentYear) {
                        if (next.energyUsage) {
                            console.log(total + next.energyUsage)
                            return total + next.energyUsage
                        }
                    }
                }
                return total
            }, 0);

        })

        if (!foundUser) {
            return res.status(404).json({err: "Couldn't Find User"})
        }

        if (!foundUser.settings) {
            return res.status(404).json({err: "User Settings Empty"})
        }

        const calculatedCost = (totalCost / 1000) * foundUser.settings.pricePerkWh

        res.status(201).json(calculatedCost)


    } catch (err) {
        res.status(500).json({err: "Failed to retrieve the current month's cost: " + err})
    }
}



/**
 * Function Responsible for retrieving the paying cost of the current year
 * @return res - 201 response with json, else 500
 */
export const getSpecifiedYearCost = async (req: any, res:any) => {
    try {
        const allDevices = await virtualDevice.find();
        const specifiedYear = await req.params.year
        let totalCost = 0;
        const foundUser = await User.findById(req.user.id)


        if (!foundUser) {
            return res.status(404).json({err: "Couldn't Find User"})
        }

        if (!foundUser.settings) {
            return res.status(404).json({err: "User Settings Empty"})
        }

        allDevices.forEach((device) => {

            totalCost += device.energyHistory.reduce((total:number, next:any) => {
                if(next.energyDate){
                    if (next.energyDate.getFullYear() == specifiedYear) {
                        if (next.energyUsage) {
                            console.log(total + next.energyUsage)
                            return total + next.energyUsage
                        }
                    }
                }
                return total
            }, 0);

        })

        // TODO: Change this to get the user's actual paying amount
        const calculatedCost = (totalCost / 1000) * foundUser.settings.pricePerkWh

        res.status(201).json(calculatedCost)


    } catch (err) {
        res.status(500).json({err: "Failed to retrieve the current month's cost: " + err})
    }
}




/** Function Responsible for retrieving cost of each month
 * @param res - 201 if successful, else 500
 */
export const getMonthlyEnergyAndCostAveragePerDevice = async (req: any, res: any) => {
    try {
        let costJson: any = {};
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const allDevice = await virtualDevice.find({userId: req.user.id});
        const foundUser = await User.findById(req.user.id);

        // Check if user and user settings exist early
        if (!foundUser) {
            return res.status(404).json({ err: "Couldn't Find User" });
        }

        if (!foundUser.settings) {
            return res.status(404).json({ err: "User Settings Empty" });
        }

        // Iterate through all devices
        allDevice.forEach((device) => {
            let totalCount = 0;
            let totalEnergy = 0;

            // Sum energyUsage for entries in the current month and year
            device.energyHistory.forEach((entry: any) => {
                if (entry.energyDate && entry.energyDate.getMonth() === currentMonth && entry.energyDate.getFullYear() === currentYear && entry.energyUsage) {
                    totalCount++;
                    totalEnergy += entry.energyUsage;
                }
            });

            // Check if there are any valid energy entries for the current month
            if (totalCount === 0) {
                costJson[device.deviceName] = ["0.00", "0.00"];
                return;
            }

            // Calculate average energy in kWh and cost
            const avgEnergyKWh = (totalEnergy) / 1000;
            if (!foundUser.settings) {
                return res.status(500).json()
            }
            const cost = avgEnergyKWh * foundUser.settings.pricePerkWh;

            if (!costJson[device.deviceName]) {
                costJson[device.deviceName] = [];
            }

            costJson[device.deviceName].push(avgEnergyKWh.toFixed(2), cost.toFixed(2));
        });

        res.status(201).json(costJson);
    } catch (err) {
        res.status(500).json({ err: "Failed to retrieve energy usage and cost per device: " + err });
    }
};

/**
 * Function Responsible for retrieving the Active Status and Current Usage of the Devices
 */

export const getDeviceActiveStatusAndUsage = async (req: any, res:any) => {
    try {

        let deviceStatus: any= {};

        const allDevice = await virtualDevice.find({userId: req.user.id});

        allDevice.forEach((device) => {
            if (device.deviceStatus) {
                if (!deviceStatus[device.deviceName]) {
                    deviceStatus[device.deviceName] = [];
                }

                deviceStatus[device.deviceName].push(
                    device.deviceStatus.active,
                    device.deviceStatus.currentEnergyUsage
                );
            }
        });
        res.status(201).json(deviceStatus)
    } catch (err) {
        res.status(500).json(err)
    }
}

/** Function Responsible for retrieving cost of each month
 * @param res - 201 if successful, else 500
 */
export const getCostHistoryMonthly = async (req: any, res: any) => {
    try {


        let costJson: { [key: string]: number } = {}
        const allDevice = await virtualDevice.find({userId: req.user.id});
        const foundUser = await User.findById(req.user.id)

        if (!foundUser) {
            return res.status(404).json({err: "Couldn't Find User"})
        }

        if (!foundUser.settings) {
            return res.status(404).json({err: "User Settings Empty"})
        }

        allDevice.forEach((device) => {
                device.energyHistory.forEach((next) => {
                    if(next.energyDate) {
                        if (next.energyDate.getFullYear() === new Date().getFullYear()) {
                            const date = new Date(next.energyDate);
                            const month = date.toLocaleString("default", {month: "long"})
                            if (!costJson[month]) {
                                costJson[month] = 0;
                            }
                            if (next.energyUsage) {

                                if (!foundUser) {
                                    return res.status(404).json({err: "Couldn't Find User"})
                                }

                                if (!foundUser.settings) {
                                    return res.status(404).json({err: "User Settings Empty"})
                                }

                                costJson[month] += ((next.energyUsage / 1000) * foundUser.settings.pricePerkWh);
                            }

                        }
                }});
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
        const allDevices = await virtualDevice.find({ userId: req.user.id });
        let totalEnergy: number = 0
        const currentMonth: number = new Date().getMonth();
        const currentYear: number = new Date().getFullYear();

        allDevices.forEach((device) => {

            totalEnergy += device.energyHistory.reduce((total: number, next: any) => {
                if (next.energyDate) {
                    if (next.energyDate.getMonth() === currentMonth && next.energyDate.getFullYear() === new Date().getFullYear()) {
                        if (next.energyUsage) {
                            return total + next.energyUsage
                        }
                    }
                    return total
                }
            }, 0);

        })
        res.status(200).json((totalEnergy / 1000).toFixed(0));

    } catch (err) {
        res.status(201).json({err: "Failed to retrieve the current month energy Usage: " + err})
    }
}


/**
 * Function Responsible for retrieving the energy Usage Cost per Month
 * @param res - 201 response with JSON, else 500 response
 */
export const getEnergyUsageCostPerMonth = async (req: any, res:any) => {
    try {
        const getCostDate: Record<number, number> = {}

        const allDevices = await virtualDevice.find();
        const foundUser = await User.findById(req.user.id)



        allDevices.forEach((device) => {

            device.energyHistory.forEach((history) => {
                if (history.energyDate) {
                    if (!getCostDate[history.energyDate.getMonth()]) {
                        getCostDate[history.energyDate.getMonth()] = 0
                    }

                }

                if (!foundUser) {
                    return res.status(404).json({err: "Couldn't Find User"})
                }

                if (!foundUser.settings) {
                    return res.status(404).json({err: "User Settings Empty"})
                }

                if (history.energyDate && history.energyUsage) {
                    getCostDate[history.energyDate.getMonth()] += (history.energyUsage * foundUser.settings.pricePerkWh)

                }
            })
        })

        res.status(201).json(getCostDate)


    } catch (err) {
        res.status(500).json({error: "There has been an error: " + err})
    }
}


export const getCostMonthGaugeChart = async (req: any, res: any) => {
    try {
        const allDevices:any = await virtualDevice.find({ userId: req.user.id});
        const foundUser:any = await User.findById(req.user.id);
        let jsonCost: any = {
            cost: 0,
            target:foundUser.settings.monthlyCostGoal
        }

        if (!foundUser) {
            return res.status(404).json({err: "Couldn't find user"})
        }

        if (!foundUser.settings?.pricePerkWh) {
            return res.status(400).json({ error: 'Price per kWh is not set for the user' });
        }

        let totalCost = 0;
        const currentMonth = new Date().getMonth()

        allDevices.forEach((device:any) => {

            totalCost += device.energyHistory.reduce((total:number, next:any) => {
                if(next.energyDate){
                    if (next.energyDate.getMonth() === currentMonth && next.energyDate.getFullYear() == new Date().getFullYear()) {

                        if (next.energyUsage) {
                            return total + next.energyUsage
                        }
                    }
                }
                return total
            }, 0);
        })

        jsonCost.cost = Number(((totalCost / 1000) * foundUser.settings.pricePerkWh).toFixed(2))

        res.status(201).json(jsonCost)


    } catch (err) {
        res.status(500).json({err: "Failed to retrieve the current month's cost: " + err})
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
          const totalEnergy: number = device.energyHistory.reduce((total:number, next:any) => {
              if (next.energyUsage) {
                  return total + next.energyUsage
              }
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
 * Function Responsible for retrieving amount of energy user has used with targeted energy Usage for current month
 * @param res - 201 Response with json else 500 response
 */
export const getMonthEnergyUsageProgress = async (req: any, res:any) => {
    try {

        const foundUser = await User.findById(req.user.id)

        if (!foundUser) {
            return res.status(404).json({err: "Couldn't Find User"})
        }

        if (!foundUser.settings) {
            return res.status(404).json({err: "User Settings Empty"})
        }

        const energyProgress = {
            total: 0,
            limit: foundUser.settings.monthlyEnergyUsageGoal
        }

        const currentMonth = new Date().getMonth()

        const allDevices = await virtualDevice.find({userId: req.user.id})

        allDevices.forEach((device) => {
            energyProgress["total"] += device.energyHistory.reduce((total: number, next: any) => {
                if (next.energyDate) {
                    if (next.energyDate.getMonth() === currentMonth && next.energyDate.getFullYear() === new Date().getFullYear()) {
                        if (next.energyUsage) {
                            return total + next.energyUsage
                        }
                    }
                    return total

                }

            }, 0)

        })
        energyProgress["total"] = Number((energyProgress["total"] / 1000).toFixed(0))
        res.status(201).json(energyProgress)

    } catch (err) {
        res.status(500).json({error: "There has been an error: " + err})
    }

}

export const getDayCostDevice = async (req:any, res: any) => {
    try {
        const deviceCost: { [key: string]: number } = {}
        const todayDay: number = new Date().getDay();
        const todayMonth: number = new Date().getMonth()
        const todayYear: number = new Date().getFullYear();
        const foundUser: any = await User.findById(req.user.id)
        const oneDevice: any = await virtualDevice.findById(req.params.id)

        const totalEnergy = oneDevice.energyHistory.reduce((total: any, next: any) => {
            if (next.energyDate.getDay() == todayDay && next.energyDate.getMonth() == todayMonth && next.energyDate.getFullYear() == todayYear) {
                if (next.energyUsage) {
                    return total + next.energyUsage
                }
            }
            return total
        }, 0)

        deviceCost[oneDevice.deviceName] = Number(((totalEnergy / 1000) * foundUser.settings.pricePerkWh).toFixed(2));
        res.status(201).json(deviceCost);

    } catch (err) {
        res.status(500).json({err: "There has been an error trying to retrieve today's cost data of the device: " + err})
    }
}

export const getMonthCostDevice = async (req: any, res: any) => {
    try {
        const deviceCost: { [key: string]: number } = {}
        const todayMonth:number = new Date().getMonth();
        const oneDevice: any = await virtualDevice.findById(req.params.id)
        const foundUser = await User.findById(req.user.id)

        if (!foundUser) {
            return res.status(404).json({err: "Couldn't Find User"})
        }

        if (!foundUser.settings) {
            return res.status(404).json({err: "User Settings Empty"})
        }


        const totalEnergy = oneDevice.energyHistory.reduce((total: any, next: any) => {
            if (next.energyDate.getMonth() == todayMonth) {
                if (next.energyUsage) {
                    return total + next.energyUsage
                }
            }
            return total
        }, 0)

        deviceCost[oneDevice.deviceName] = (totalEnergy / 1000) * foundUser.settings.pricePerkWh;
        res.status(201).json(deviceCost);

    } catch (err) {
        res.status(500).json({err: "There has been an error trying to retrieve today's cost data of the device: " + err})
    }
}

export const getYearCostDevice = async (req: any, res: any) => {
    try {
        const deviceCost: { [key: string]: number } = {}
        const todayYear:number = new Date().getFullYear();
        const oneDevice: any = await virtualDevice.findById(req.params.id)
        const foundUser = await User.findById(req.user.id)

        if (!foundUser) {
            return res.status(404).json({err: "Couldn't Find User"})
        }

        if (!foundUser.settings) {
            return res.status(404).json({err: "User Settings Empty"})
        }


        const totalEnergy = oneDevice.energyHistory.reduce((total: any, next: any) => {
            if (next.energyDate.getFullYear() == todayYear) {
                if (next.energyUsage) {
                    return total + next.energyUsage
                }
            }
            return total
        }, 0)

        deviceCost[oneDevice.deviceName] = (totalEnergy / 1000) * foundUser.settings.pricePerkWh;
        res.status(201).json(deviceCost);

    } catch (err) {
        res.status(500).json({err: "There has been an error trying to retrieve today's cost data of the device: " + err})
    }
}

export const getDayEnergyUsageDevice = async (req: any, res: any) => {
    try {
        const deviceCost: { [key: string]: number } = {}
        const todayDay:number = new Date().getDay();
        const todayMonth:number = new Date().getMonth()
        const todayYear: number = new Date().getFullYear()
        const oneDevice: any = await virtualDevice.findById(req.params.id)

        const totalEnergy = oneDevice.energyHistory.reduce((total: any, next: any) => {
            if (next.energyDate.getDay() == todayDay && next.energyDate.getMonth() == todayMonth && next.energyDate.getFullYear() == new Date().getFullYear()) {
                if (next.energyUsage) {
                    return total + next.energyUsage
                }
            }
            return total
        }, 0)

        deviceCost[oneDevice.deviceName] = Number((totalEnergy / 1000).toFixed(2))
        res.status(201).json(deviceCost);

    } catch (err) {
        res.status(500).json({err: "There has been an error trying to retrieve today's cost data of the device: " + err})
    }
}

export const getMonthEnergyUsageDevice = async (req: any, res: any) => {
    try {
        const deviceCost: { [key: string]: number } = {}
        const todayMonth:number = new Date().getMonth();
        const oneDevice: any = await virtualDevice.findById(req.params.id)

        const totalEnergy = oneDevice.energyHistory.reduce((total: any, next: any) => {
            if (next.energyDate.getMonth() == todayMonth) {
                if (next.energyUsage) {
                    return total + next.energyUsage
                }
            }
            return total
        }, 0)

        deviceCost[oneDevice.deviceName] = totalEnergy
        res.status(201).json(deviceCost);

    } catch (err) {
        res.status(500).json({err: "There has been an error trying to retrieve today's cost data of the device: " + err})
    }
}

export const getYearEnergyUsageDevice = async (req: any, res: any) => {
    try {
        const deviceCost: { [key: string]: number } = {}
        const todayYear:number = new Date().getFullYear();
        const oneDevice: any = await virtualDevice.findById(req.params.id)

        const totalEnergy = oneDevice.energyHistory.reduce((total: any, next: any) => {
            if (next.energyDate.getFullYear() == todayYear) {
                if (next.energyUsage) {
                    return total + next.energyUsage
                }
            }
            return total
        }, 0)

        deviceCost[oneDevice.deviceName] = totalEnergy
        res.status(201).json(deviceCost);

    } catch (err) {
        res.status(500).json({err: "There has been an error trying to retrieve today's cost data of the device: " + err})
    }
}

export const getEnergyHistoryDevice = async (req: any, res: any) => {
    try {
        const oneDevice = await virtualDevice.findById(req.params.id);

        const energyHistory: { [Key: string]: number } = {}

        if (oneDevice) {
        const totalEnergy = oneDevice.energyHistory.reduce((total: any, next: any) => {
            const date = new Date(next.energyDate);
            const month = date.toLocaleString("default", {month: "long"})
            if (date.getFullYear() == new Date().getFullYear()) {
                if (!energyHistory[month]) {
                    energyHistory[month] = 0
                }

                energyHistory[month] += (next.energyUsage / 1000)
            }
        }, 0)

        }

        res.status(201).json(energyHistory)


    } catch (err) {
        res.status(500).json({err: "There has been an error trying to retrieve the energy History of the device: " + err})
    }
}

export const getCostHistoryDevice = async (req: any, res: any) => {
    try {
        const oneDevice = await virtualDevice.findById(req.params.id);
        const foundUser = await User.findById(req.user.id)

        const energyHistory: { [Key: string]: number } = {}

        if (!foundUser) {
            return res.status(404).json({err: "Couldn't Find User"})
        }

        if (!foundUser.settings) {
            return res.status(404).json({err: "User Settings Empty"})
        }


        if (oneDevice) {
            const totalEnergy = oneDevice.energyHistory.reduce((total: any, next: any) => {
                const date = new Date(next.energyDate);
                const month = date.toLocaleString("default", {month: "long"})
                if (!energyHistory[month]) {
                    energyHistory[month] = 0
                }


                if (!foundUser) {
                    return res.status(404).json({err: "Couldn't Find User"})
                }

                if (!foundUser.settings) {
                    return res.status(404).json({err: "User Settings Empty"})
                }

                energyHistory[month] += (next.energyUsage / 1000) * foundUser.settings.pricePerkWh;

            }, 0)

        }

        res.status(201).json(energyHistory)


    } catch (err) {
        res.status(500).json({err: "There has been an error trying to retrieve the energy History of the device: " + err})
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
    const newDevice = new Device({
        userId: req.user.id,
        deviceName: req.body.deviceName,
        deviceType: req.body.deviceType,
        energyHistory: req.body.energyHistory
    })

    try {
        await newDevice.save()

        res.status(201).json({
            message: "Successfully created virtual Device",
            device: newDevice

        })

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

export const addEnergyHistory = async (req: any, res: any) => {
    try {
        const updatedDevice = await virtualDevice.findByIdAndUpdate(
            req.params.id,
            { $push: { energyHistory: { $each: req.body.energyHistory } } },

        );

        res.status(201).json(updatedDevice);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
};


/**
 * Method Responsible for finding and deleting specified device
 * @param res.param.id - Device ID
 */
export const deleteDevice = async (req: any, res:any) => {
    try {
        await virtualDevice.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Successfully found and deleted virtual Device" });
    } catch (err) {
        res.status(500).json({error: "Failed to Delete Device" + err})
    }

};


