const Products = require("../model/products");
var slugify = require('slugify')
const path = require('path');
const Categories = require("../model/categories.js");
class ProductsController {
    async index (req,res) {
        const filter = {parent: req.query.parent};
        const page = Number(req.query._page) || 1;
        const limit = Number( req.query._limit) || 10;
        const skip = (page - 1) * limit;
        
        if(req.query.search){
            filter['$text'] =  { $search: req.query.search };
        }
        
        const result = await Products.find({...filter}).skip(skip).limit(limit).populate('category');
        const totalPage = await Products.countDocuments() ;
        const paginate = {
            totalPage: Math.ceil(totalPage / limit) ?? 0,
            currentPage: page,
            limit: limit,
            totalDocs: Products.length,
            prevPage: (page > 1) ? page - 1 : null,
            nextPage: ((page * limit) < totalPage) ? page + 1 : null,
        }

        const products = result.map(Products => Products.toObject()); 
        res.render('products/index',{products, paginate});
    }
    async showForm  (req,res)  {
        let product = null;
        if(req.params.id){
            const result = await Products.findOne({ _id: req.params.id}).populate('category');
            product = result.toObject();
        }
        const categories = await Categories.find({parent: null});
        res.render('products/create-update',{categories: await Promise.all(categories.map(category => category.children())), product,messages: {...req.flash('error')[0]}});
    }
    async  delete(req,res) {
        try {
            await Products.deleteOne({_id: req.params.id})
            res.redirect('alert/success');
           }catch (error) {
             res.redirect('alert/error');
           }
    }
   async edit(req, res) {
        try {
            const formData = {...req.body, slug: slugify(req.body.name), parent: req.body.parent !== "" ? req.body.parent : null};
            // Kiểm tra và xử lý 'photo_url'
            if (req.files && req.files['thumbnail']) {
                formData.thumbnail = path.join('/storage', req.files['thumbnail'][0].filename);
            }
    
            // Kiểm tra và xử lý 'images'
            if (req.files && req.files['images']) {
                formData.images = Array.from(req.files['images']).map((image) => path.join('/storage', image.filename));
            }
            await Products.updateOne({ _id: req.params.id }, formData);
            res.redirect('alert/success');
        } catch (error) {
            res.send(error.message)
        }
    }
   async create(req,res) {
      try {
        const formData = {...req.body, slug: slugify(req.body.name), parent: req.body.parent !== "" ? req.body.parent : null};
        // Kiểm tra và xử lý 'photo_url'
        if (req.files && req.files['thumbnail']) {
            formData.thumbnail = path.join('/storage', req.files['thumbnail'][0].filename);
        }

        // Kiểm tra và xử lý 'images'
        if (req.files && req.files['images']) {
            formData.images = Array.from(req.files['images']).map((image) => path.join('/storage', image.filename));
        }
       const products = await new Products(formData)
       products.save();
       res.redirect('alert/success')
      } catch (error) {
        
      }
    }
}

module.exports = new ProductsController();