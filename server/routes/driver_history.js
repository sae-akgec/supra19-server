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

// Update car status
router.get('/:id/end', (req, res, next)=>{
    let id = req.params.id
    Driverhistory.getDriverhistoryById(id,(err, history)=>{
        if (err) {
            res.json({"error":`No driverHistory exist id: ${id}`});
        } else {

            history.end_time = new Date();

            Driverhistory.addDriverhistory(history, (err, upatedHistory) =>{
                if(err){
                    console.log(err);
                    res.json({"error":"Can't Update History"});
                } else{
                    res.json(upatedHistory);
                }
            });
        }
    })
});

router.get('/car/:id', (req, res, next)=>{
    let id = req.params.id
    Driverhistory.getdriverhistoryByCarId(id, (err, histories)=>{

        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(histories);
        }
    })
});

router.get('/driver/:id', (req, res, next)=>{
    let id = req.params.id
    Driverhistory.getdriverhistoryByDriverId(id, (err, histories)=>{

        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(histories);
        }
    })
});

router.post('/', (req, res, next)=>{
    let newDriverhistory = new  Driverhistory({
        driver_id:req.body.driver_id,
        driver_name:req.body.driver_name,
        car_id :req.body.car_id,
        start_lat:req.body.start_lat,
        start_lng:req.body.start_lng,
        end_lat:req.body.end_lat,
        end_lng:req.body.end_lng,
        start_time: new Date(),
        end_time: new Date()
    });


    Driverhistory.addDriverhistory(newDriverhistory, (err, driverhistory)=>{
        if (err) {
            res.json({success:false, msg:"Failed to add the Driverhistory"});
            console.log(err);
        } else {
            res.json(driverhistory);
        }
    })

});
module.exports = router;
