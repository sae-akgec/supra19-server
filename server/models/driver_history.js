const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const driverhistorySchema = mongoose.Schema ({
    driver_id:{
        type:String,
        require: true
    },
    driver_name:{
        type:String,
        require: true
    },
    car_id : {
        type:String,
        require:true
    },
    start_lat :{
        type:String,
        require: true
    },
    start_lng:{
        type:String,
        require: true
    },
    end_lat:{
        type:String,
        require: true
    },
    end_lng:{
        type:String,
        require: true
    },
    start_time:{
        type:String,
        require: true
    },
    end_time :{
        type:String
    }}
)
module.exports = DriverHistory = mongoose.model('driver_history',driverhistorySchema);

//Create
module.exports.addDriverhistory = function (newCar, callback) {
    newCar.save(callback);
}

//Read
module.exports.getdriverhistory = function (callback) {
    DriverHistory.find({},callback);
}

module.exports.getDriverhistoryById = function (id, callback) {
    DriverHistory.findById(id, callback);
}

module.exports.getdriverhistoryByCarId = function (id, callback) {
    DriverHistory.find({car_id: id}, callback);
}

module.exports.getdriverhistoryByDriverId = function (id, callback) {
    DriverHistory.find({driver_id: id}, callback);
}

//Delete
module.exports.deletedriverhistory = function(id, callback){
    DriverHistory.findByidAndRemove(rollNo,callback);
}
