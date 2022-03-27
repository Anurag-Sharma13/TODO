const jwt = require('jsonwebtoken')
const secretKey = "youhavetobeverycarefulaboutthesecretkey"

const createToken = async () => {
    try {

        const token = await jwt.sign({id:"retrsaf",expiryTime:'2m'}, secretKey)
        console.log(token)
    }
    catch (error) {
        console.log("token has not created")
    }

}
createToken()


module.exports = { createToken, secretKey }

