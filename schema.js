const joi = require('joi'); 
const schemas = { 
  taskBody: joi.object().keys({ 
    id: joi.number().required(),
    email: joi.string().required(),
    password:joi.string().required(),
    firstname:joi.string().required(),
    lastname:joi.string().required(),
    mobilenumber:joi.string().required()
  }) 
}; 
module.exports = schemas;
