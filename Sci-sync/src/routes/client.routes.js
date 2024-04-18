const express = require("express");
const { clientRegistration, clientLogin, allsurveysofclients } = require("../controllers/client.controller");
const { isadminAuthenticated } = require("../middleware/auth");
const router = express.Router();


router.post("/client/registration",clientRegistration)

router.post("/client/login",clientLogin)

router.post("/client/getallsurveys",isadminAuthenticated,allsurveysofclients)


module.exports = router;