const crypto = require('crypto');
const secret = "analytics_data";



export const generateRandomString=()=> crypto.randomBytes(128).toString('base64');
export const authentication = (salt, password)=>{
    return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex');
}