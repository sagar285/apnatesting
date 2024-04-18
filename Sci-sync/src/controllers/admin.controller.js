const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const adminModel = require("../models/admin.model");
const sendToken = require("../utils/sendToken");
const bcrypt =require("bcrypt")
const clientModal =require("../models/client.model")


// registration api for admin
exports.adminRegistration = catchAsyncErrors(async(req,res)=>{
    const {name,email,password}=req.body;
    const admin = await adminModel.findOne({email});
    if(admin){
        try {
            res.status(200).json({adminexist:true,admin});
        } catch (error) {
           console.log("Error in admin registration",error)
           res.status(500).json({message:"Error processing request"}) 
        }
    }
    else{
        try {
            const hashedpassword = await bcrypt.hash(password,10)
        const newadmin = await adminModel.create({email,password:hashedpassword,name})
        res.status(200).json({adminexist:false,admin:newadmin})
        } catch (error) {
            console.error("Admin Registration Error",error)
            res.status(500).json({message:"Admin registration failed"})
        } 
    }
})

exports.adminLogin =catchAsyncErrors(async(req,res)=>{
    const {email,password} =req.body;
    console.log("aayi re")
    const admin = await adminModel.findOne({email})
    console.log("admin",admin)
    try {

        if(admin){
            const passwordVerify = await bcrypt.compare(password,admin.password)
            console.log(passwordVerify)
            if(passwordVerify){
                sendToken(admin,200,res)
            }
            else{
                res.status(401).json({message: "Invalid email or password"})
            }
        }
        else{
            return res.status(201).send("user does not exist with thie email")
        }
    } catch (error) {
        console.log("Login Admin Error",error)
        res.status(500).json({message:"Error in login"})
    }
})

exports.adminStatusUpdate =catchAsyncErrors(async(req,res)=>{

    const {status,id} = req.body;
    if(req.user.issuperadmin){
        try {
            const  adminstatusupdate = await adminModel.findByIdAndUpdate({_id:id},{Approve:status},{new:true})
            res.status(200).send({message:"Status Updated Successfully",data:adminstatusupdate})
        } catch (error) {
            console.log("Error in status update",error)
            res.status(500).json({message:"Error in updating admin status"})
        }
    }
    else{
        res.status(401).json({message:"This resource not accessed publicly"})
    }
  
})

// superadmin get all admin signup request who has not admin 
exports.getalladminrequest =catchAsyncErrors(async(req,res)=>{
        try {
        const adminrequest = await adminModel.find({Approve:false});
        console.log("request yhan tk aayi h")
        res.status(200).json({request:adminrequest})
    } catch (error) {
        console.log("error in getting all request",error)
        res.status(500).json({message:error.message})
    }
})

exports.clientStatusUpdate =catchAsyncErrors(async(req,res)=>{
    const {status,clientid}=req.body;
    try {
    const statusUpdate = await clientModal.findByIdAndUpdate({_id:clientid},{isapproved:status});
    res.status(200).json({statusUpdate:statusUpdate})
} catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
}
})


// super admin gets all clients who has approved

exports.getallapprovedclients =catchAsyncErrors(async(req,res)=>{
    try {
        const allapprovedclients = await clientModal.find({isapproved:true})
    res.status(200).json({allapprovedclients:allapprovedclients})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})





