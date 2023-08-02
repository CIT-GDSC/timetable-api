const express = require('express');
const router = express.Router();
const authentication = require('./authentication');



module.exports=()=>{
    authentication(router);
    return router;
}