const express = require("express");
const router = express.Router();
const { adminRegistration, adminLogin, adminStatusUpdate, getalladminrequest,clientStatusUpdate, getallapprovedclients } = require("../controllers/admin.controller");
const { isadminAuthenticated, issuperadminAuthenticated } = require("../middleware/auth");
const { getAllSurveyRequest, updateSurveyRequest } = require("../controllers/surveyrequest.controller");
const { allClientsAdminSide } = require("../controllers/client.controller");

// admin registration
router.post("/admin/register",adminRegistration)

router.post("/admin/login",adminLogin)

// admin approved status update

router.put("/admin/statusUpdate",isadminAuthenticated,adminStatusUpdate)

// admin get all survey peding request of all users

router.post("/admin/surveyRequest",isadminAuthenticated,getAllSurveyRequest)

// admin get users accessed for give permissions of admin

router.post("/admin/superadmin/request",issuperadminAuthenticated,getalladminrequest)

// 

router.put("/admin/surveyRequest/statusUpdate",issuperadminAuthenticated,updateSurveyRequest)


router.post("/admin/getallapprovedclients",issuperadminAuthenticated,getallapprovedclients)

// adminget all clients

router.post("/admin/allClients",issuperadminAuthenticated,allClientsAdminSide)

router.post("/admin/clients/statusUpdate",issuperadminAuthenticated,clientStatusUpdate)


module.exports =router;