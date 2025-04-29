const express = require('express');

const { getAllUsers, signupUser, loginUser, getUserById, deleteUser  } = require('../controller/userController')

const { loginAdmin, signupAdmin  } = require('../controller/adminController')

const router = express.Router()

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.delete('/:id', deleteUser);


router.post('/loginadmin', loginAdmin)

router.post('/signupadmin', signupAdmin)



module.exports = router