const mongoose=require('mongoose');
const objectId=mongoose.Schema.Types.ObjectId
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    clgname:{
        type:String,
        required: true
    },
 marks:{
    type:Number,
    default:0
}
})

module.exports = mongoose.model('student', studentSchema)