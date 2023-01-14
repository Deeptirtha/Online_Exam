const qstnmodel = require("../models/qstnmodel")

const createqstn=async function(req,res){
    try{
      let data =req.body
  
     
      data.questionSetter=req.params.id
    

      const question=await qstnmodel.create(data)
      res.status(200).send({status:true,data:question})
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })}
    };

    const updateqstn=async function(req,res){
        try{
          let data =req.body
          let id=req.params.id
    
          const question=await qstnmodel.findById(id)
          if(!question)return res.status(404).send({status:false,msg:"no qstn found"})
          const update=await qstnmodel.findOneAndUpdate({_id:id},data,{new:true})
          res.status(200).send({status:true,msG:'updated',data:update})
        }
        catch (err) {
            res.status(500).send({ status: false, msg: err.message })}
        };

        const getqstn=async function(req,res){
            try{
              let question=await qstnmodel.aggregate([{ $sample: { size: 2 } }])

let qstn=[]
let ans=[]


for(i=0;i<question.length;i++){
    q={}
    a={}
    q.question=question[i].question
    q.option1=question[i].option1
    q.option2=question[i].option2
    q.option3=question[i].option3
    q.option4=question[i].option4
    a.question=question[i].question
    a.answer=question[i].answer
    a.equation=question[i].equation

    qstn.push(q)
    ans.push(a)

}
      res.status(200).send({status:true,question:qstn,ans:ans})
            }
            catch (err) {
                res.status(500).send({ status: false, msg: err.message })}
            };


            module.exports={createqstn, updateqstn,getqstn}