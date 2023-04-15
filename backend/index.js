const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const Jimp = require('jimp');
// to allow cross origin requests
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// this is an middleware added for requests to get the post data
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(allowCrossDomain);

// to access database
const mongojs=  require("mongojs");
const cs = "mongodb+srv://abhishek:abhishek@cluster0.gimxr.mongodb.net/global?retryWrites=true&w=majority"
const collections = mongojs(cs,["global"]);

// create
app.post("/create",(req,res)=>{
    console.log("inside create backend");
    var d = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        img: req.body.img
    }
    collections.globaldata.insert(d,function(err,doc){
		if(err){
			res.send("Error occured");
		}
		else{
			res.send(true);
		}
	})
    
})

// read
app.post("/read",(req,res)=>{
    console.log("inside read backend");
    var d = {
        email: req.body.email,
        password: req.body.password
    }
    collections.globaldata.find(d,(err,docs)=>{
        if(err){
            console.log("error");
        }
        else{
            res.send(docs)
        }
    })
})

//update
app.post("/update",(req,res)=>{
    var d = {
        email: req.body.email,
        password: req.body.password
    }
    var newvalues = { $set: {firstname: req.body.firstname,lastname: req.body.lastname,img: req.body.img} };
    collections.globaldata.updateOne(d,newvalues,(err,docs)=>{
        if(err){
            console.log("error");
        }
        else{
            res.send(true);
        }
    })
})

app.post("/delete",(req,res)=>{
    var d = {
        email: req.body.email,
        password: req.body.password
    }
    collections.globaldata.remove(d,(err,doc)=>{
        if(err){
            console.log("error");
        }
        else{
            res.send(true);
        }
    })
})

app.listen(8000,()=>{
    console.log("server started");
})
