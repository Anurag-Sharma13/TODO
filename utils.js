const jwt = require('jsonwebtoken')
const secretKey = "youhavetobeverycarefulaboutthesecretkey"

const createToken = async (userID) => {
    try {
        // console.log(userID)
        const token = await jwt.sign({id:userID,expiryTime:'2m'}, secretKey)
        console.log(token)
    }
    catch (error) {
        console.log("token has not created")
    }

}   

module.exports = { createToken, secretKey }

