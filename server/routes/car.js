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
        car_no:req.body.car_no,
        speed:req.body.speed,
        speed_limit:req.body.speed_limit,
        car_status:req.body.car_status,
        drivers:req.body.driverId,
       });
     Car.addCar(newCar, (err, saveCar)=>{
        if (err) {
            res.json({success:false, msg:"Failed to add the Car"});
        } else {
            res.json(saveCar);                                                                                
        }
    });
});

router.post('/driver/:id', (req, res, next)=>{
    let id = req.params.id
    Car.getCarById(id,(err, car)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            let car_driver = {
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
