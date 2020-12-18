const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({'_id': decodedToken._id, 'tokens.token': token})
        
        if (user) {
            req.token = token
            req.user = user
        } else {
            throw new Error()
        }

        next()
    } catch (error) {
        res.status(401).send({error: 'Not authorised'})
    }
}

module.exports = auth