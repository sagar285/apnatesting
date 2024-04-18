const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const clientModal =require("../models/client.model");
const Survey = require("../models/survey.model");
const sendToken = require("../utils/sendToken");
const bcrypt =require("bcrypt")




exports.clientRegistration = catchAsyncErrors(async(req,res)=>{
    const {name,email,password}=req.body;
    const client = await clientModal.findOne({email});
    if(client){
        try {
            res.status(200).json({clientexist:true,client});
        } catch (error) {
           console.log("Error in client registration",error)
           res.status(500).json({message:"Error processing request"}) 
        }
    }
    else{
        try {
            const hashedpassword = await bcrypt.hash(password,10)
        const newclient = await clientModal.create({email,password:hashedpassword,name})
        res.status(200).json({clientexist:false,client:newclient})
        } catch (error) {
            console.error("Admin Registration Error",error)
            res.status(500).json({message:"Admin registration failed"})
        } 
    }
})

exports.clientLogin =catchAsyncErrors(async(req,res)=>{
    const {email,password} =req.body;
    console.log("request coming");
    const client = await clientModal.findOne({email})
    try {
        if(client){
            const passwordVerify =  bcrypt.compare(password,client.password)
            if(passwordVerify){
                sendToken(client,200,res)
            }
            else{
                res.status(401).json({message: "Invalid email or password"})
            }
        }
    } catch (error) {
        console.log("Login Admin Error",error)
        res.status(500).json({message:"Error in login"})
    }
})



// only admin access this 
exports.allClientsAdminSide =catchAsyncErrors(async(req,res)=>{
    try {
        const allclients = await clientModal.find()
        console.log(allclients)
        res.status(200).json({clients:allclients})
    } catch (error) {
        console.log("error in get clients information")
        res.status(500).json({message:error.message})
    }
})


// all surveys related to this clients

exports.allsurveysofclients =catchAsyncErrors(async(req,res)=>{
    try {
        console.log("req.user._id",req?.user?._id)
        const allsurveys = await Survey.find({clientid:req?.user?._id})
        res.status(200).json({allsurveys:allsurveys})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

