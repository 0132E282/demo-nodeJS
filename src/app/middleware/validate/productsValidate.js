const { body, validationResult } = require('express-validator');
module.exports = {
   productsValidateCreate: [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('category').not().isEmpty().withMessage('category is required'),
        body('price').not().isEmpty().withMessage('price is required'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('error', errors.mapped());
                return res.redirect('back');
            }
            next();
        }
    ],
   productsValidateUpdate: [
         body('name').not().isEmpty().withMessage('Name is required'),
        body('category').not().isEmpty().withMessage('category is required'),
        body('price').not().isEmpty().withMessage('price is required'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('error', errors.mapped());
                return res.redirect('back');
            }
            next();
        }
    ]
}