const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const driverhistorySchema = mongoose.Schema ({
        id: {
            type: String,
            required: true
        },
        ride_coordinates: {
            type: String,
            required: true, 
            unique: true
        },
        avg_speed:{
            type:String,
            require: true
        },
        start_time:{
            type:String,
            require: true
        },
       end_time:{
            type:String,
            require: true
        },
        driverhistory:{
            type:String,
            require: true
        }
    }
)
module.exports = DriverHistory = mongoose.model('driver_history',driverhistorySchema);
//Read
module.exports.getdriverhistory = function (callback) {
    driverhistory.find({},callback);
}

module.exports.getdriverhistoryById = function (id, callback) {
    driverhistory.find({id: id}, callback);
}

//Delete
module.exports.deletedriverhistory = function(id, callback){
    driverhistory.findByidAndRemove(rollNo,callback);
}