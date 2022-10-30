const mongoose = require("mongoose")
// const { schema } = require("moongose/models/user_model")
const {Schema} = mongoose;
// we create schema. Schema means a structure jis structure mae data database mae jaye gaa

const UserSchema = new Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }
}) 

const User = mongoose.model('user',UserSchema);
User.createIndexes()
module.exports = User

// module.exports = mongoose.model('user',UserSchema)