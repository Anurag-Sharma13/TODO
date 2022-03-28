const jwt = require('jsonwebtoken')
const secretKey = require('../utils')
const authenticate = (req, res, next) => {
  const tokenHeader = req.header.x-apiKey
  const token = tokenHeader
  jwt.verify(token, secretKey, (err, result) => {
    if (err) {
      return res.status(403)
    }
    if (result) {
      next()

    }

  })

}

module.exports = authenticate
