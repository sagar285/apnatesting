
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const uuid = require('uuid').v4;
const crypto =require("crypto");
const ioModel = require("../models/io.model");
const dotenv =require("dotenv")
dotenv.config()

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

  

const s3Client = new S3Client({
  region:process.env.AWS_REGION,
  credentials: {
    accessKeyId:process.env.AWS_ACCESSKEY,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
  } 
})
// Function to upload file to AWS S3
const uploadFile =(fileBuffer, fileName, mimetype)=>{
  console.log(mimetype)
  const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype
    } 
return s3Client.send(new PutObjectCommand(uploadParams));
}
// user send survey data


exports.TextToImage = async(req,res)=>{
    const {surveyid,datatype,input}=req.body;
    console.log(req.body)
    try {
       const imageFile = req.files['image']?.[0];
     
    const imgname = imageFile && generateFileName()  
    await uploadFile(imageFile?.buffer, imgname, imageFile.mimetype);
    const  imgurl =`https://d2xw2of6hxx7fn.cloudfront.net/${imgname}`
        const newIo = await ioModel.create({userid:req.user._id,surveyid,input:input,output:imgname})    
        return res.status(200).send({newsurvey:true,message:"your entry succefully uploaded"});
    } catch (error) {
        console.log("error in text to image",error)
        res.status(500).send(error)
    }
}


exports.TextToAudio = async(req,res)=>{
    const {surveyid,datatype,input}=req.body;
    console.log(req.body)
    try {
       const audioFile = req.files['audio']?.[0];
     
    const audioname = audioFile && generateFileName()  
    // await uploadFile(imageFile?.buffer, imgname, imageFile.mimetype);
    const AudioUploadUrl = audioFile ? await getPresignedUrl(audioFile,audioname) : null;
    const fileExtension = audioFile.originalname.split('.').pop();
    const  audiourl =`https://d2xw2of6hxx7fn.cloudfront.net/${audioname}.${fileExtension}`
        const newIo = await ioModel.create({userid:req.user._id,surveyid,input:input,output:audiourl})    
        res.status(200).json({ AudioUploadUrl});
    } catch (error) {
        console.log("error in text to image",error)
        res.status(500).send(error)
    }
}


exports.TextToVideo = async(req,res)=>{
    const {surveyid,datatype,input}=req.body;
    console.log(req.body)
    try {
       const VideoFile = req.files['video']?.[0];
     
    const videoname = VideoFile && generateFileName()  
    // await uploadFile(imageFile?.buffer, imgname, imageFile.mimetype);
    const VideoUploadUrl = VideoFile ? await getPresignedUrl(VideoFile,videoname) : null;
    const fileExtension = VideoFile.originalname.split('.').pop();
    const  videourl =`https://d2xw2of6hxx7fn.cloudfront.net/${videoname}.${fileExtension}`
        const newIo = await ioModel.create({userid:req.user._id,surveyid,input:input,output:videourl})
        console.log("succesfulll"); 
        res.status(200).json({ VideoUploadUrl});
    } catch (error) {
        console.log("error in text to image",error)
        res.status(500).send(error)
    }
}



const getPresignedUrl = async (file,name) => {
  const fileExtension = file.originalname.split('.').pop();
  const fileName = `${name}.${fileExtension}`;
  console.log("fileExtension getPresignedUrl",fileName)

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return signedUrl;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw error;
  }
};