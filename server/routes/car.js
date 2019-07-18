const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const User = require('../models/user');

router.get('/', (req, res, next)=>{
    Car.getCar((err, car)=>{
        if (err) {
            res.status = 400;
            res.json({"error":"Can't get cars"});
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
            res.status = 404
            res.json({"error":"Car with id dosen't exist"});
        } else {
            res.json(car);
        }
    })
});

// Get car by car_no
router.get('/number/:id', (req, res, next)=>{
    let carNo = req.params.id
    Car.getCarByCarNo(carNo,(err, cars)=>{
        if (err) {
            res.status = 400
            res.json({"error":"Encountred an error"});
        } else {
          if(cars[0])
            res.json(cars[0]);
          else {
            res.status = 404
            res.json({"error":"Car with carNo dosen't exist"});
          }
        }
    })
});

router.post('/share', (req, res, next)=>{
    let carId = req.body.car_id;
    let email = req.body.email;

    User.getUserByEmail(email, (err, users)=>{
        let user = users[0]
        if(user){
          Car.getCarById(carId, (err, car)=>{
              if (err) {
                  res.status(400);
                  res.json({"error":"Unable to add car"});
                  console.log(err)
              } else {
                  let car_driver = {
                      "driver_id": user._id,
                      "is_admin": true
                  }

                  car.drivers.push(car_driver)
                  Car.addCar(car, (err, upatedCar) =>{
                      if(err){
                          res.status(400);
                          res.json({"error":"Unable to upadte car"});
                      } else{
                          res.json(upatedCar);
                      }
                  })
              }
          });

        }else{
            res.status(404);
            res.json({success: false, msg: `User Dosen't Exist with email ${email}`})
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
        drivers:req.body.drivers,
        danger_email: req.body.danger_email
       });
     Car.addCar(newCar, (err, saveCar)=>{
        if (err) {
            res.json({success:false, msg:err.errmsg || "Failed to add please try again"});
        } else {
            res.json(saveCar);
        }
    });
});

// Add Driver
router.post('/:id/driver', (req, res, next)=>{
    let id = req.params.id
    Car.getCarById(id,(err, car)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            let car_driver = {
                "driver_id": req.body.driver_id,
                "is_admin": req.body.is_admin
            }

            car.drivers.push(car_driver)
            Car.addCar(car, (err, upatedCar) =>{
                if(err){
                    res.json({"error":"error"});
                } else{
                    res.json(upatedCar);
                }
            })
        }
    })
});

// Update car status
router.post('/:id/status', (req, res, next)=>{
    let id = req.params.id
    Car.getCarById(id,(err, car)=>{
        if (err) {
            res.json({"error":`No car exist id: ${id}`});
        } else {

            car.car_status.current_lat = req.body.current_lat;
            car.car_status.current_lon = req.body.current_lon;
            car.car_status.status = req.body.status;
            car.car_status.is_danger = req.body.is_danger;

            Car.addCar(car, (err, upatedCar) =>{
                if(err){
                    console.log(err);
                    res.json({"error":"Can't Update car"});
                } else{
                    res.json(upatedCar);
                }
            });
        }
    })
});

// Update car status
router.post('/:id/geofencing', (req, res, next)=>{
    let id = req.params.id
    Car.getCarById(id,(err, car)=>{
        if (err) {
            res.json({"error":`No car exist id: ${id}`});
        } else {
            car.car_status.gf = req.body.gf || car.car_status.gf;
            car.car_status.gf_limit = req.body.gf_limit || car.car_status.gf_limit;
            car.car_status.gf_lat = req.body.gf_lat || car.car_status.gf_lat;
            car.car_status.gf_lon = req.body.gf_lon || car.car_status.gf_lon;

            Car.addCar(car, (err, upatedCar) =>{
                if(err){
                    res.json({"error":"Can't update car"});
                } else{
                    res.json(upatedCar);
                }
            })
            res.json(car);
        }
    })
});
module.exports = router;
