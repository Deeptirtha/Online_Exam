const mongoose=require('mongoose');
const objectId=mongoose.Schema.Types.ObjectId
const  questionSchema=new mongoose.Schema({

    questionSetter:{
        type:objectId,
        required:true

    },
    question:{type:String, required:true},
    option1:{type:String, required:true},
    option2:{type:String, required:true},
    option3:{type:String, required:true},
    option4:{type:String, required:true},
    answer:{type:String, required:true},
    equation:{type:String},
    solution:{type:String}
})

module.exports= mongoose.model('question', questionSchema)