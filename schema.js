const joi = require('joi'); 
const { password } = require('pg/lib/defaults');

// const regSchema =
//     joi.object({ 
//     id: joi.number().required(),
//     email: joi.string().required(),
//     password:joi.string().required(),
//     firstname:joi.string().required(),
//     lastname:joi.string().required(),
//     mobilenumber:joi.string().required()
//   })

// const logSchema=
//   joi.object({
//       email:joi.string().email().required(),
//       password:joi.string().required()
//   })

// module.exports = {regSchema,logSchema};

const schemas = { 
    logSchema: joi.object().keys({ 
      email: joi.string().required(),
      password: joi.string().required() 
    }),
    regSchema: joi.object().keys({
        id: joi.number().required(),
        email: joi.string().email().required(),
        password:joi.string().required(),
        firstname:joi.string().required(),
        lastname:joi.string().required(),
        mobilenumber:joi.string().required()
    })

    
};

module.exports = schemas