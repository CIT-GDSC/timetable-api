const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET

const generateToken = (payload) => {
    return jwt.sign({ payload }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};



module.exports = generateToken;

