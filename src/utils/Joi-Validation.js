const {Joi} = require('express-validation')

const regSchema = {
    body: Joi.object({
        id: Joi.number().required(),
        email: Joi.string().email().required(),
        password:Joi.string().required(),
        firstname:Joi.string().required(),
        lastname:Joi.string().required(),
        mobilenumber:Joi.string().required()
    }).required()
}
const logSchema = {
    body:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }).required()
}



module.exports = {regSchema,logSchema}