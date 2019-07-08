const express = require('express');
const router = express.Router();
const Driverhistory = require('../models/driver_history');

router.get('/', (req, res, next)=>{
    Driverhistory.getDriverhistory((err, driver_history)=>{
        
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(driver_history);
        }
    })
});

router.post('/', (req, res, next)=>{
    let newDriverhistory = new  Driverhistory({
        driver_id:req.body.driver_id,
        start_lat:req.body.start_lat,
        start_long:req.body.start_long,
        end_lat:req.body.end_lat,
        end_long:req.body.end_long,
        start_time:req.body.start_time,
        end_time:req.body.end_time
    });

    
    Driverhistory.addDriverhistory(newDriverhistory, (err, driverhistory)=>{
        if (err) {
            res.json({success:false, msg:"Failed to add the Driverhistory"});
            console.log(err);
        } else {
            res.json({success:true, msg:"Driverhistory added"});                                                                                     XMLDocument
        }
    })

});






module.exports = router;