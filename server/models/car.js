const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const driverhistorySchema = mongoose.Schema ({
   
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
});
const gfSchema = mongoose.Schema({
    gf:{
        type: Boolean,
        require: true
    },
    gf_limit:{
        type:String,
        require: true
    },
    gf_lat:{
        type:String,
        require: true
    },
    gf_lon:{
        type:String,
        require: true
    }
    });


const CarSchema = mongoose.Schema({
    image: {
        type: String
    },
    number:{
        type:String,
        require: true
    },
    
    speed:{
        type:String,
        require: true
    },
    speed_limit:{
        type:String,
        require: true
    },
    admin:{
        type:String,
        require: true
    },
    geoFencing : [gfSchema],
    driverHistory : [driverhistorySchema]
   });



const Car = module.exports = mongoose.model('car',CarSchema);

//Create 
module.exports.addCar = function(newCar, callback){
    newCar.save(callback);
 }
 
 
 //Read
 module.exports.getCar = function (callback) {
     Car.find({},callback);
 }
 
 module.exports.getCarById = function (id, callback) {
     Car.findById(id, callback);
 }
 
 
 //Delete
 module.exports.deleteRole = function(id, callback){
     Car.findByIdAndRemove(rollNo,callback);
 }