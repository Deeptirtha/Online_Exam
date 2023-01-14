const express=require("express")
const router=express.Router()
const {creatUser,loginUser}=require("../src/controllers/user")
const  { creatStudent, loginStudent }=require("../src/controllers/student")

const  { authentication, authorization }=require("../src/middleware/auth")

//=====================================================User========================================================================
router.post("/user",creatUser)

router.post("/userlogin",loginUser) 
//====================================================student========================================================================
router.post('/student',creatStudent)

router.post("/studentlogin",loginStudent) 



router.all("/*", function (req, res) {
res.status(404).send({status: false,msg: "Galat api me ayela bhidu"})})
  


module.exports = router;