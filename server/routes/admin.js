const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }),(req, res, next)=>{
    res.json("Hello");
});

module.exports = router;