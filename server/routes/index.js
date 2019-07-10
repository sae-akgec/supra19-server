const express = require('express');
const router = express.Router();
const user = require('./user');
const role = require('./role');
const car = require ('./car');
const auth = require('./auth');
const admin = require('./admin');
const Driverhistory  =  require ('./driver_history');


router.use('/user', user);
router.use("/role", role);
router.use("/car", car);
router.use("/auth", auth);
router.use("/admin", admin);
router.use("/driver_history", Driverhistory);
router.use("/driver_car", Car)
;

router.get('*', (req, res, next)=>{
    res.status(404);
    res.json({"Api":"Invalid Enpoint"});
});
module.exports = router;