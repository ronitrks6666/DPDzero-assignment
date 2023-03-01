const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{type:String},
    password:{type:String}
})

const userModel = mongoose.model('userAuth', userSchema)
module.exports = userModel