const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
    User.getUserById(req.user['_id'], (err, user)=>{
        if (err) {
            res.json({"error":`User with ${id} not found`});
            req.statusCode(400);
        } else {
            res.json(user);
        }
    })
});


module.exports = router;    