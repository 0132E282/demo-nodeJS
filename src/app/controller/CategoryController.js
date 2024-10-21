const Categories = require("../model/categories");
var slugify = require('slugify')
const path = require('path');
class CategoryController {
    async index (req,res) {
        const filter = {parent: req.query.parent};
        const page = Number(req.query._page) || 1;
        const limit = Number( req.query._limit) || 10;
        const skip = (page - 1) * limit;
        if(req.query.search){
            filter['$text'] =  { $search: req.query.search };
        }
        const result = await  Categories.find({...filter}).skip(skip).limit(limit);
        const totalPage = await Categories.countDocuments() ;
        const paginate = {
            totalPage: Math.ceil(totalPage / limit) ?? 0,
            currentPage: page,
            limit: limit,
            totalDocs: Categories.length,
            prevPage: (page > 1) ? page - 1 : null,
            nextPage: ((page * limit) < totalPage) ? page + 1 : null,
        }
        const categories = result.map(category => category.toObject()); 
        res.render('category/index',{categories, paginate});
    }
    async showForm  (req,res)  {
        let category = {};
        const filter = { parent: null };
        if(req.params.id){
            filter._id = {$ne: req.params.id}
            const result = await Categories.findOne({_id: req.params.id});
            category = result?.toObject();
        }
        const categories = await Categories.find(filter);
        
        res.render('category/create-update',{categories : await Promise.all(categories.map(category => category.children())), category ,messages: {...req.flash('error')[0]}});
    }
    async  delete(req,res) {
        try {
            await Categories.deleteOne({_id: req.params.id })
            res.redirect('/category/alert/success');
           }catch (error) {
             res.redirect('/category/alert/error');
           }
    }
   async edit(req, res) {
        try {
            const formData = {...req.body, slug: slugify(req.body.name,'-'), parent: req.body.parent !== "" ? req.body.parent : null};
            if(req.file){
                formData.thumbnail =  path.join('/storage', req.file.filename);
            }
            await Categories.updateOne({ _id: req.params.id }, formData);
            res.redirect('/category/alert/success');
        } catch (error) {
            res.send(error.message)
        }
    }
    create(req,res) {
        try {
            const formData = {...req.body, slug: slugify(req.body.name), parent: req.body.parent !== "" ? req.body.parent : null};
            if( req.file){
                formData.thumbnail =  path.join('/storage', req.file.filename);
            }
            const user = new Categories(formData);
            user.save();
            res.redirect('/category/alert/success');
        } catch (error) {
            res.redirect('/category/alert/error');
        }
    }
    notification(req,res){
        res.render('site/alerts-status', {
            message: req.params.status == "success" ? 'thành công' : 'có lỗi xây ra',
            nextRoute: '/category',
            status: req.params.status
        })
    }
}

module.exports = new CategoryController();