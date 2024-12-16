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

};

// Function to Delete User
exports.deleteUser = async (req, res) => {

};