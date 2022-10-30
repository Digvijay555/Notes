const mongoose = require("mongoose")
const CONNECTION_URL ="mongodb://localhost:27017/notes?directConnection=true"

const connectToMongo=()=>{
    mongoose.connect(CONNECTION_URL)
    .then(()=>{console.log('connection successful');})
    .catch((e)=>{
        console.log('no connection')
    })
}


module.exports=connectToMongo;