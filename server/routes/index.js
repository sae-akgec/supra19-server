const express = require('express');
const router = express.Router();
const user = require('./user');
const role = require('./role');
const auth = require('./auth');
const admin = require('./admin');

router.use('/user', user);
router.use("/role", role);
router.use("/auth", auth);
router.use("/admin", admin);

router.get('*', (req, res, next)=>{
    res.statusCode(404);
    res.json({"Api":"Invalid Enpoint"});
});
module.exports = router;