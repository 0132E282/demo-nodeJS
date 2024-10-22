const Products = require('../model/products');
const {multipleMongooseObject} = require('../util/mongoose');
class SiteController {
    async index (req,res) {
        const featureProducts = await Products.find({}).limit(8);
        const newArrivals = await Products.find({}).sort({ created_at: 1 }).limit(8);
        res.render('site/home',{featureProducts: multipleMongooseObject(featureProducts),newArrivals: multipleMongooseObject(newArrivals), layout: 'clients'})
    }
}

module.exports = new SiteController();