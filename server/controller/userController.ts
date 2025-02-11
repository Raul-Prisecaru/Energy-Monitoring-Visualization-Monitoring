import User from "../model/userAccount";
import virtualDevice from "../model/iotDevice";

// Function to get all users

export const getAllUsers = async (req: any, res:any) => {
    try {
        const allUsers = await User.find()
        res.json(allUsers)
    } catch (err) {
        res.status(500).json( {message: "Failed to retrieve all users" + err} )
    }
};

export const getOneUser = async (req: any, res:any) => {
    try {
        const oneUser = await User.findById(req.params.id)
        res.json(oneUser)
    } catch (err) {
        res.status(500).json( { message: "Failed to retrieve the user" + err })
    }
}

export const getUserPriceCostSettings = async (req: any, res: any) => {
    try {
        const foundUser = await User.findById(req.user.id)
        const userSettings = {
            pricePerkWh: 0,
            costGoals: 0,
            energyGoals: 0
        }
        if (!foundUser) {
            return res.status(500).json("Unable to find user")
        }
        if (!foundUser.settings) {
            return res.status(500).json("User does not have a price configured")
        }


        userSettings["pricePerkWh"] = foundUser.settings.pricePerkWh
        userSettings["costGoals"] = foundUser.settings.monthlyCostGoal
        userSettings["energyGoals"] = foundUser.settings.monthlyEnergyUsageGoal


        res.status(201).json(userSettings);
    } catch (err) {
        res.status(500).json({err: "Failed to retrieve user current paying price: " + err})
    }
}

export const updateUserCostEnergyPaying = async (req: any, res: any) => {
    try {
        const newCost = req.body.newCost

        console.log(newCost)
        const foundUser =  await User.findById(req.user.id)
        if (!foundUser) {
            return res.status(500).json({error: "Failed to Find User"})
        }
        if(!foundUser.settings) {
            return res.status(500).json({error: "Failed to Find User Settings"})
        }
        await foundUser.updatePricePerkWh(Number(newCost))
        res.status(200).json({success: "Successfully updated user paying price"})
    } catch (err) {
        res.status(500).json({error: "Failed to update user's settings for energy paying price: " + err})
    }
}

export const updateUserUsageEnergyGoal = async (req: any, res: any) => {
    try {
        const newCostGoal = req.body.newCostGoal;

        const foundUser = await User.findById(req.user.id)

        if(!foundUser) {
            return res.status(500).json({error: "Failed to find user"})
        }

        if(!foundUser.settings) {
            return res.status(500).json({error: "Failed to find user settings"})
        }

        await foundUser.updateMonthlyEnergyUsageGoal(newCostGoal)
        res.status(200).json({success: "Successfully updated user energy goal"})

    } catch (err) {
        res.status(500).json({error: "Failed to update user's settings for energy paying goals: " + err})
    }
}

export const updateUserCostGoal = async (req: any, res: any)=> {
    try {
        const userCostGoal = req.body.userCostGoal;
        const foundUser = await User.findById(req.user.id)

        if(!foundUser) {
            return res.status(500).json({error: "Failed to find user"})
        }

        if(!foundUser.settings) {
            return res.status(500).json({error: "Failed to find user settings"})
        }

        await foundUser.updateMonthlyCostGoal(userCostGoal)
        res.status(200).json({success: "Successfully updated user energy goal"})

    } catch (err) {
        res.status(500).json({error: "Failed to update user's settings for energy paying goals: " + err})
    }
}

// Function to Create User
export const createUser = async (req: any, res:any) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try {
        await newUser.save()
        res.status(201).json({message: "Successfully Created User"})
    } catch (err) {
        res.status(500).json({message: "Failed to create user: " + err})
    }

};

// Function to Update User
export const updateUser = async (req: any, res:any) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({message: "Successfully found and updated the user's information"})
    } catch (err) {
        res.status(500).json({message: "Failed to find or update user: " + err})
    }
};


export const patchUser = async (req: any, res: any) => {
    try {
        await User.findByIdAndUpdate(req.user.id, req.body)
        res.status(200).json({message: "Successfully found and updated the user's information"})
    } catch (err) {
        res.status(500).json({err: "Failed to update user's information"})
    }
}

// Function to Delete User
export const deleteUser = async (req: any, res:any) => {
    try {
       await User.findByIdAndDelete(req.user.id)

        res.status(200).json({message: "Successfully found and deleted the user"})
    } catch (err) {
        res.status(500).json({message: "Failed to find or delete user: " + err})
    }

};