const User = require("../model/userAccount");

// Function to Create User
exports.createUser = async (req, res) => {
    const userData = req.body;
    const newUser = new User(userData)

    try {
        await newUser.save()
        res.status(201).json({message: "Successfully Created User"})
    } catch (err) {
        res.status(500).json({message: "Failed to create user: " + err})
    }

};

// Function to Update User
exports.updateUser = async (req, res) => {
    try {
        const findUser = User.findByIdAndUpdate(req.param.id, req.body)
        res.status(200).json({message: "Successfully found and updated the user's information"})
    } catch (err) {
        res.status(500).json({message: "Failed to find or update user: " + err})
};

// Function to Delete User
exports.deleteUser = async (req, res) => {

};