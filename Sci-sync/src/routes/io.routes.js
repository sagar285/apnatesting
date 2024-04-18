const express = require("express");
const router = express.Router();
const multer = require('multer');
const {  TextToImage, TextToVideo, TextToAudio } = require("../controllers/io.controller");
const { isAuthenticated } = require("../middleware/auth");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/user/uploadsurvey',isAuthenticated, upload.fields([{ name: 'image', maxCount: 1 },]), TextToImage);
router.post('/user/uploadvideossurvey',isAuthenticated, upload.fields([{ name: 'video', maxCount: 1 },]), TextToVideo);
router.post('/user/uploadaudiosurvey',isAuthenticated, upload.fields([{ name: 'audio', maxCount: 1 },]), TextToAudio);





       
module.exports = router;