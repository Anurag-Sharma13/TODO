const res = require('express/lib/response')
const joi = require('joi')
const schemas = require('../schema')
const check = (schemas,property)=>{
    return (req,res,next)=>{
        const {error} = schemas[property].validate(req.body,schemas);
        valid=error == null;
        if(valid){
            next()
        }else{
            const {details} = error;
            // console.log(details)
            const message = details.map(i => i.message).join(',');
            res.status(422).json({error:message})
        }
    }
}






// const regBody = (req,res,next)=>{
//     const result = regSchema.validate(req.body)
//     if(result.error){
//         res.status(400).send(result.error.details[0].message)
//         // console.log(result.error.details[0].message)
//     }
//     else{
//         next()
//     }
// }

// const logBody = (req,res,next)=>{
//     const result = logSchema.validate(req.body)
//     if(result.error){
//         res.status(400).send(result.error.details[0].message)
//         // console.log(result.error.details[0].message)
//     }
//     else{
//         next()
//     }
// }
// module.exports = {regBody,logBody}




// const check = (some,req,res,next) => {
//     const result = some.validate(req.body)
//     if(result.error){
//         res.status(400).send(result.error.details[0].message)
//         // console.log(result.error.details[0].message)
//     }
//     else{
//         next()
//     }
// }

module.exports = check