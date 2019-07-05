const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoleSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    }
});


 module.exports = Role = mongoose.model('role',RoleSchema);


 //Create 
module.exports.addRole = function(newRole, callback){
    newRole.save(callback);
 }
 
 
 //Read
 module.exports.getRoles = function (callback) {
     Role.find({},callback);
 }
 
 module.exports.getRoleById = function (id, callback) {
     Role.findById(id, callback);
 }
 
 
 //Delete
 module.exports.deleteRole = function(id, callback){
     Role.findByIdAndRemove(rollNo,callback);
 }