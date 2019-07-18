const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Car = require('../models/car');
const History = require('../models/driver_history');
const passport = require('passport');

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
    User.getUserById(req.user['_id'], (err, user)=>{
        if (err) {
            res.json({"error":`User with ${id} not found`});
            req.status(400);
        } else {
            res.json(user);
        }
    })
});

router.get('/', (req, res, next)=>{
    User.getUsers((err, users)=>{
        if (err) {
            res.json({"error":`Users with not found`});
            req.status(400);
        } else {
            res.json(users);
        }
    })
});

router.get('/cars', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
    let id = req.user['_id'];
    User.getUserById(id, (err, user)=>{
        if (err) {
            res.json({"error":`User with ${id} not found`});
            req.status(400);
        } else {
            Car.getCarByDriverId(id, (err, cars)=>{
                if(err){
                  res.json({"error":`Cars with ${id} not found`});
                  req.status(400);
                }else {
                  res.json(cars);
                }
            })
        }
    })
});

router.get('/history', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
    let id = req.user['_id'];
    User.getUserById(id, (err, user)=>{
        if (err) {
            res.json({"error":`User with ${id} not found`});
            req.status(400);
        } else {
            History.getdriverhistoryByDriverId(id, (err, historys)=>{
              if(err){
                res.json({"error":`History with ${id} not found`});
                req.status(400);
              } else{
                res.json(historys);
              }
            })
        }
    })
});

// Update car status
router.get('/on/:id',passport.authenticate('jwt', { session: false }), (req, res, next)=>{
    let id = req.params.id
    let user_id = req.user['_id'];
    Car.getCarById(id,(err, car)=>{
        if (err) {
            res.json({"error":`No car exist id: ${id}`});
        } else {
            car.car_status.driver_id = user_id;
            car.car_status.status = true;
            car.car_status.is_danger = false;

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
router.get('/off/:id',passport.authenticate('jwt', { session: false }), (req, res, next)=>{
    let id = req.params.id
    let user_id = req.user['_id'];
    Car.getCarById(id,(err, car)=>{
        if (err) {
            res.json({"error":`No car exist id: ${id}`});
        } else {
            car.car_status.driver_id = user_id;
            car.car_status.status = false;
            car.car_status.is_danger = false;

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
module.exports = router;
