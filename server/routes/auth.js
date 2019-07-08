const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../config/database');
const jwt = require('jsonwebtoken');



router.post("/register", (req, res, next)=>{
    let newUser = User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        isActive: true
    })

    User.addUser(newUser, (err, user)=>{
        if(err){
            
            res.status(400);
            res.json({success:false, msg:"Failed to Register"});
        }else{
            res.status(201);
            res.json({success: true, msg:"Registerred Successfully"})
        }
    })
})

router.post("/login", (req, res, next)=>{
    let email = req.body.email
    let password = req.body.password

    User.getUserByEmail(email, (err, users)=>{
        let user = users[0]
        if(user){
            User.comparePassword(password, user.password, (status)=>{
                if(!status){
                    res.status(400);
                    res.json({success: false, msg: `Password didn't match`})
                } else{

                    const token = jwt.sign({"sub": user['_id']}, config.secret, { expiresIn: 604800});
                    res.status(200);
                    res.json({
                        success: true,
                        token : 'Bearer ' + token
                    });
                }
            })
        }else{
            res.status(400);
            res.json({success: false, msg: `User Dosen't Exist with email ${email}`})
        }
    })
})

module.exports = router;