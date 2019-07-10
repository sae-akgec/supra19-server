const express = require('express');
const router = express.Router();
const Car = require ('../models/car')

router.get('car/:id', (req, res, next)=>{
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
db.driverIdSchema.update(
       { $push: {Car_id} }
     )