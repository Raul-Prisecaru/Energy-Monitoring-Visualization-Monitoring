import User from "../model/userAccount";

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
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Successfully found and deleted the user"})
    } catch (err) {
        res.status(500).json({message: "Failed to find or delete user: " + err})
    }

};