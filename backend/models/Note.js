const mongoose = require("mongoose")
// const { schema } = require("moongose/models/user_model")
const {Schema} = mongoose;

// we create schema. Schema means a structure jis structure mae data database mae jaye gaa

const NotesSchema = new Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        
    },
    tag:{
        type:String,
        default:'personal'
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }
}) 

module.exports = mongoose.model('notes',NotesSchema);