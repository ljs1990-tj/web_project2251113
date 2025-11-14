const express = require('express')
const cors = require('cors') 

const stuRouter = require("./routes/student");

const app = express()
app.use(cors({
    origin : ["http://192.168.30.57:5502"],
    credentials : true
}))
app.use(express.json());

// router 영역
app.use("/student", stuRouter);


app.listen(3000, ()=>{
    console.log("server start!");
})