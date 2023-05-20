const { addUnit, getUnits, updateUnit, getUnitByCode } = require("../../controllers/unitController")
const express = require("express")
const router = express.Router()



router.post('/add', addUnit);

router.put('/update', updateUnit);

router.get('/get', getUnits);


router.get('/getbycode', getUnitByCode);

module.exports = router;


