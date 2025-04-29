const User = require('../models/UserModel') 
const jwt = require('jsonwebtoken') 

const createToken = (_id) => { 
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}); 
      res.status(200).json(users); 
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };
  

const getUserById = async (req, res) => {
    const { id } = req.params; 

    try {
        const user = await User.findById(id)
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user); 
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.login(email, password) 

        const token = createToken(user._id) 

        res.status(200).json({ _id: user._id, email, token, role: 'user' });

    } catch (error) {
        res.status(400).json({error: error.message})

    }

}


const signupUser = async (req, res) => {

    const {firstname, lastname, email, password} = req.body

    try{
        const user = await User.signup(firstname, lastname, email, password) 

        const token = createToken(user._id) 

        res.status(200).json({ _id: user._id, email, token }); 

    } catch (error) {
        res.status(400).json({error: error.message})

    }

}

const deleteUser = async (req, res) => {
    const { id } = req.params; 
  
    try {
      const deletedUser = await User.findByIdAndDelete(id); 
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  };

module.exports = { getAllUsers, signupUser, loginUser, getUserById, deleteUser }
