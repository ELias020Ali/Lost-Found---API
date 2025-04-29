const Admin = require('../models/AdminModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}


const loginAdmin = async (req, res) => {
    const {email, password} = req.body

    try{
        const admin = await Admin.login(email, password)

        const token = createToken(admin._id)

        res.status(200).json({ _id: admin._id, email, token, role: 'admin' });

    } catch (error) {
        res.status(400).json({error: error.message})

    }

}


const signupAdmin = async (req, res) => {

    const {firstname, lastname, email, password} = req.body

    try{
        const admin = await Admin.signup(firstname, lastname, email, password)

        const token = createToken(admin._id)

        res.status(200).json({ _id: admin._id, email, token });

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



module.exports = { loginAdmin, signupAdmin, deleteUser }