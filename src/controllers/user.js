const UserModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");



//========================================================creating-user===============================================================
let creatUser = async function (req, res) {
  try {
    let data = req.body;
   
    if (Object.keys(data).length == 0) {return res.status(400).send({ status: false, message: "Body is empty can't craeate data" })}
    let newarr = ["name", "email", "phone", "password"];
    for (field of newarr) {
      if (!data[field])return res.status(400).send({status: false,msg: `${field} is required,input valid ${field}`})}


    let oldUser = await UserModel.findOne({$or: [{ phone: data.phone }, { email: data.email }]})
    if (oldUser) {return res.status(400).send({status: false,message: "User already exist with this phone no or email Id"})}
    let user = await UserModel.create(data);
    res.status(201).send({ status: true, msg: "User created successfully",data:user })} 
    catch (err) {
    res.status(500).send({ status: false, msg: err.message });
   }
};

//=============================================================================login-user======================================================

const loginUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0 ) {return res.status(400).send({ status: false, message: "Body is empty can't find data" })}
    if (data.hasOwnProperty("email") && data.hasOwnProperty("phone") ) {return res.status(400).send({ status: false, message: "please provide any one between email and phone no" })}
    if (!data.hasOwnProperty("email")) {
      if (!data.hasOwnProperty("phone")) {return res.status(400).send({status: false,message: "please enter mobile no or email id to login"})}}
    if (!data.hasOwnProperty("password")) {return res.status(400).send({ status: false, message: "please enter password to login" })}
    let user = await UserModel.findOne({$or: [{ email: data.email, password: data.password },{ phone: data.phone, password: data.password }]});

    if (!user) {return res.status(404).send({ status: false, msg: "no user found" })}
    let token = jwt.sign({ ID: user._id }, "token-secret", {expiresIn: "10d"});
    res.status(200).send({ status: true, message: token })}
     catch (err) {
    res.status(500).send({ status: false, msg: err.message })}
};
module.exports = { creatUser, loginUser };