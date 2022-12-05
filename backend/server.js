const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient } = require('mongodb');
mongoose.connect("mongodb+srv://mohghaff:1234M@cluster0.hqopxdf.mongodb.net/assignment_one?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;

const app = express();
if(!db){
    console.log("error connecting")
}else{
    console.log("Here we go!")
}



app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());

const port = process.env.port || 9090;
app.listen(port, function (){
    console.log("Running on port " + port)
})
const routes = require("./routes/employee")

app.use('/api', routes)


