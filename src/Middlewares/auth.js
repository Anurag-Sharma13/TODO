const jwt = require('jsonwebtoken')
const {secretKey} = require('../utils/utils')
const authenticate = async(req, res, next) => {
  const tokenHeader = req.header('Authorization')
  // console.log(tokenHeader)
  if (!tokenHeader.startsWith('Bearer '))
  {
    return res.status(400).json({
      "err": "invalid token"
    })
  }
  
  try{
    const token = tokenHeader.split(' ')[1]
    // console.log(token)
    if (token) {
      const decoded = await jwt.verify(token, secretKey)
      req.userId = decoded["id"]
      // console.log(req.userId, decoded)
      next()
    }
    else {
      return res.status(400).json({
        "err": "invalid token"
      })
    }
  }catch(err){
    return res.status(400).json({
      err: err.message
    })
  }
}


module.exports = authenticate
