const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose")
const user= require("../models/usermodel")


const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present in header" })
  
     jwt.verify(token, "token-secret", function (err, decodedToken) {
            if (err) { return res.status(401).send({  status: false, msg: "invalid Token comming" }) }
           else{
            req.decodedToken = decodedToken
            next()
            }
        })}

    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const authorization = async function (req, res, next) {
    try {
        let Id = req.params.Id;

        if (!isValidObjectId(Id)) return res.status(400).send({ status: false, msg: "Enter a valid blog Id" })

        let UserData = await user.findOne({ _id: req.params.Id })
        if (!UserData) return res.status(404).send({ status: false, msg: "No such user found" })

        let userId = UserData._id
        if (userId!= req.decodedToken.Id) return res.status(403).send({ status: false, msg: "you do not have authorization to this " });
        else { next() }
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports= {authentication,authorization}
