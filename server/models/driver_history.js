const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const driverhistorySchema = mongoose.Schema ({
    driver_id:{
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
    
    start_long:{
        type:String,
        require: true
    },
    
    end_lat:{
        type:String,
        require: true
    },

    end_long:{
        type:String,
        require: true
    },
   
    start_time:{
        type:String,
        require: true
    },
   
    end_time :{
        type:String,
        require: true
    },
    isAdmin : {
        type:Boolean
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
