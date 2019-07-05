const express = require('express');
const router = express.Router();
const Role = require('../models/role');

router.get('/', (req, res, next)=>{
    Role.getRoles((err, role)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(role);
        }
    })
});


router.post('/', (req, res, next)=>{
    let newRole =new  Role({
        name: req.body.name,
    });

    Role.addRole(newRole, (err, role)=>{
        if (err) {
            res.json({success:false, msg:"Failed to add the Role"});
            console.log(err);
        } else {
            res.json({success:true, msg:"Role added"});                                                                                     XMLDocument
        }
    })

});



module.exports = router;