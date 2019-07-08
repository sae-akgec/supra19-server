const express = require('express');
const router = express.Router();
const Car = require('../models/car');

router.get('/', (req, res, next)=>{
    Car.getCar((err, car)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(car);
        }
    })
});
router.post('/', (req, res, next)=>{
    let newCar = new  Car({
        image:req.body.image,
        number:req.body.number,
        speed:req.body.speed,
        speed_limit:req.body.speed_limit,
        admin:req.body.admin,
        geoFencing:req.body.geo_fencing,
        driverHistory:req.body.driver_history
    });

    
    Car.addCar(newCar, (err, car)=>{
        if (err) {
            res.json({success:false, msg:"Failed to add the Car"});
            console.log(err);
        } else {
            res.json({success:true, msg:"Car added"});                                                                                     XMLDocument
        }
    })

});





module.exports = router;