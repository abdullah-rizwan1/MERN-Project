const jwt = require('jsonwebtoken')
const HttpCodes = require('../constants/httpCodes')
const ErrorResponse = require('../composer/error-response')
const AppMessages = require('../constants/appMessages')
const dotenv = require('dotenv')

dotenv.config()

exports.verifyToken = (req,res,next) => {
    const token = req.header('authoriztion-token')
    if (!token) {
        return res.status(HttpCodes.UNAUTHORIZED).send(new ErrorResponse(AppMessages.ACCESS_DENIED))
    }
    
    try {
        const decoded = jwt.verify(token, process.env.jwt)
        req.id = decoded.id
        next()
    } catch(error) {
        res.status(HttpCodes.UNAUTHORIZED).send(new ErrorResponse(AppMessages.INVALID_TOKEN))
    }
}
