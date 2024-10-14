const path = require('path');
const express = require('express');
const router = express.Router();
const userRouter = require(path.join(__dirname,'userRouter.js'));


router.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});


// user-route
router.use('/users', userRouter);

module.exports = router;