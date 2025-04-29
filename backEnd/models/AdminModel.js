const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


adminSchema.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const admin = await this.findOne({ email })

    if (!admin) {
        throw Error("Incorrct Email")
    }

    const match = await bcrypt.compare(password, admin.password)
    
    if(!match){
        throw new Error ("Incorrect Password");
    }

    return admin

}

module.exports = mongoose.model('Admin', adminSchema)
