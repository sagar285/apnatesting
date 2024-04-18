const express = require("express");
const { 
  registerUser, 
  resendOTP, 
  verifyOTP,
  registerUserGoogle,
userProfileUpdate,
  verifyUser,
  getusersurl
} = require("../controllers/partner.controller");
const { isAuthenticated } = require("../middleware/auth"); 
const { addSurveyRequest, getallSurevyRequestforUser } = require("../controllers/surveyrequest.controller");
const { getAllSurveysforuser } = require("../controllers/survey.controller");

const router = express.Router();

// User registration route
router.post('/user/register', registerUser);
router.post('/user/registerGoogle', registerUserGoogle);



router.put('/user/userProfileUpdate',isAuthenticated ,userProfileUpdate);
router.post('/user/verifyUser',isAuthenticated ,verifyUser);


// Route to resend OTP
router.post('/user/resend-otp', resendOTP);

// Route to verify OTP
router.post('/user/verify-otp', verifyOTP);

// User send request for survey

router.post('/user/suerveyRequest',isAuthenticated,addSurveyRequest)

router.post("/user/usergetallsurveys",isAuthenticated,getAllSurveysforuser)


// user get all survey request related to this user only

router.post("/user/getsurveysRequest",isAuthenticated,getallSurevyRequestforUser)


router.post("/user/getuserurl",isAuthenticated,getusersurl)

// You can add other user-related routes here
// router.post('/user/some-action', someControllerFunction);

module.exports = router;
