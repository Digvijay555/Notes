const connectToMongo = require("./db")
const express = require("express")
var cors = require('cors')

connectToMongo();

const app = express();
const port = 5000//process.env.PORT || 5000
 
app.use(cors())

//middleware
app.use(express.json())

//available routes
app.use('/api/auth', require('./routes/auth'))
//notes routes
app.use('/api/notes', require('./routes/notes'))

app.listen(port,()=>{
    console.log(`server is running at port no ${port} `)
});