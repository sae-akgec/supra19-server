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
router.get('/:id', (req, res, next)=>{
    let id = req.params.id
    Car.getCarById(id,(err, car)=>{
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
        geoFencing:req.body.geo_fencing,
        driverId:req.body.driverId,
       });
    console.log(newCar);
     Car.addCar(newCar, (err, car)=>{
        if (err) {
            res.json({success:false, msg:"Failed to add the Car"});
        } else {
            res.json({success:true, msg:"Car added"});                                                                                     XMLDocument
        }
    })

});
router.post('/driver/:id', (req, res, next)=>{
    let id = req.params.id
    Car.getCarById(id,(err, car)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            var car_driver = {
                "driverId": req.body.driver_id,
                "isAdmin": req.body.is_admin
            }

            car.driverId.push(car_driver)
            Car.addCar(car, (err, upatedCar) =>{
                if(err){
                    res.json({"error":"error"}); 
                } else{
                    res.json(upatedCar);
                }
            })
            res.json(car);
        }
    })
});




  



module.exports = router;