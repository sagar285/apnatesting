const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const surveyrequestModel = require("../models/surveyrequest.model");
const userdb = require("../models/profile.model")
const admin = require('firebase-admin');

// this function only for partner or users in mobile app


const serviceAccount = require('../firebase/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.addSurveyRequest =catchAsyncErrors(async(req,res)=>{
    const {surveyid}=req.body;
    console.log(surveyid)

    try {
        const isuseralready =await  surveyrequestModel.findOne({$and:[{userid:req.user._id},{surveyid:surveyid}]})
        console.log(isuseralready)
         if(isuseralready){
           return  res.status(200).json({message:"You survey request already has been approved"});
         }
        const user = await userdb.findById(req.user._id)
        if(user){
            user.surveyList.push(surveyid); 
        }
        const surveyrequest = await surveyrequestModel.create({userid:req.user._id,surveyid});
        res.status(200).json({message:"Request has been Approved"})
    } catch (error) {
        console.log("Error in requesting survey",error)
    }
})

// this function only acceesed by admin 

exports.getAllSurveyRequest =catchAsyncErrors(async(req,res)=>{
    const {surveyid} =req.body;
    console.log(surveyid);
    try {
        const allsurveyrequest = await surveyrequestModel.find({ surveyid:surveyid}).populate("userid").populate("surveyid")
        console.log(allsurveyrequest)
        return res.status(200).json({allrequest:allsurveyrequest})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in Backend"})
    }
})


// update survey request only super admin can do this

exports.updateSurveyRequest =catchAsyncErrors(async(req,res)=>{
    const {status,id}=req.body;
    try {
        const updateStatus = await surveyrequestModel.findByIdAndUpdate({_id:id},{status:status},{new:true}).populate("userid")
        const message = {
            notification: {
                title:"Data App",
                body:` Your survey requst hs been ${status}`,
            },   
              data:{
                navigationId:'Home'
            }, 
            token: "fBaJ55i-S6yXFVh3QaIJKj:APA91bGwBVLMMJuSMKXMiBzJw7_Fd-PF3Iwvkbv2XoLXvUl-ogczISSNelqsqW84zM9oSl3VGUoVsAmPnQaBm-upORs-GcXr1pDSa25Yhm_NmAlM7gFii0V9jTnHCS0-XQAhNJk8TiwU"
        };
        const response = await admin.messaging().send(message);
        res.status(200).json({updatedata:updateStatus});
    } catch (error) {
        console.log("error in update survey request")
        res.status(500).json({message:error.message})
    }
})


// all survey request related to one particular user

exports.getallSurevyRequestforUser =catchAsyncErrors(async(req,res)=>{
    try {
        const data = await surveyrequestModel.find({userid:req.user._id}).populate(["userid","surveyid"])
        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})