const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    lastName:{    
        type:String,
        require: false
    }, 
    password:{
        type:String,
        require: true
    },
    isActive:{
        type: Boolean,
        require: true
    }
});


const User = module.exports = mongoose.model('users', userSchema);

//Create 
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}


//Read
module.exports.getUsers = function (callback) {
    User.find({},callback);
}


module.exports.getUserByEmail = function (email, callback) {
    User.find({email: email}, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}


//Delete
module.exports.deleteUser = function(id, callback){
    User.findByIdAndRemove(rollNo,callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(isMatch);
    });
}
