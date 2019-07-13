const mongoose = require('mongoose');

const driverIdSchema = mongoose.Schema({
    driver_id: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        required: true
    }
});

const carStatusSchema = mongoose.Schema({
  gf: {
      type: Boolean
  },
  gf_limit: {
      type: String
  },
  gf_lat: {
      type: String
  },
  gf_lon: {
      type: String
  },
  current_lat: {
    type: String
  },
  current_lon: {
    type: String
  },
  status: {
    type: Boolean
  },
  is_danger:{
    type: Boolean
  }
});

const carSchema = mongoose.Schema({
    image: {
        type: String
    },
    car_no: {
        type: String,
        require: true
    },
    speed: {
        type: String,
        require: true
    },
    speed_limit: {
        type: String,
        require: true
    },
    car_status: {
      type: carStatusSchema
    },

    drivers: [{
        type: driverIdSchema
    }]
});


const Car = module.exports = mongoose.model('cars', carSchema);

//Create
module.exports.addCar = function (newCar, callback) {
    newCar.save(callback);
}


//Read
module.exports.getCar = function (callback) {
    Car.find({}, callback);
}

module.exports.getCarById = function (id, callback) {
    Car.findById(id, callback);
}

//Delete
module.exports.deleteCar = function (id, callback) {
    Car.findByIdAndRemove(id, callback);
}
