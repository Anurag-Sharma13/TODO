const joi = require('joi')
const schemas = require('../schema')
const check = (schemas,property)=>{
    return (req,res,next)=>{
        const {error} = joi.validate(req.body,schemas);
        error == null;
        if(error){
            next()
        }else{
            const {details} = error;
            const message = details.map(i => i.messagae).join(',');
            console.log("error",message);
            res.status(422).json({error:message})
        }
    }
}
module.exports = check