const path = require('path');
const express = require('express');
const router = express.Router();
const userRouter = require(path.join(__dirname, 'userRouter.js'));
const categoryRouter = require(path.join(__dirname, 'categoryRoute.js'));
const productsRouter = require(path.join(__dirname, 'productsRoute'));

router.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});


// user-route
router.use('/users', userRouter);
router.use('/category', categoryRouter);
router.use('/products', productsRouter);
router.use(':any/alert/:status', function(req,res){
    res.render('site/alerts-status', {
        message: req.params.status == "success" ? 'thành công' : 'có lỗi xây ra',
        nextRoute: '/Products',
        status: req.params.status
    })
});


module.exports = router;