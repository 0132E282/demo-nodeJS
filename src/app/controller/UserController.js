const User = require("../model/user");
const bcrypt = require('bcrypt');


class UserController {

    //  show the users
   async index(req, res){
        try {
            const options = {}
            const page = Number(req.query._page) || 1;
            const limit = Number( req.query._limit) || 10;
            const skip = (page - 1) * limit;
            if(req.query.search){
                options['$text'] =  { $search: req.query.search }
            }
            await User.find(options).skip(skip).limit(limit)
            .then(async (users)=>{
                const totalPage = await User.countDocuments() ;
                const paginate = {
                    totalPage: Math.ceil(totalPage / limit) ?? 0,
                    currentPage: page,
                    limit: limit,
                    totalDocs: users.length,
                    prevPage: (page > 1) ? page - 1 : null,
                    nextPage: ((page * limit) < totalPage) ? page + 1 : null,
                }
                users = users.map(user => user.toObject())
                res.render('users/index', { users, paginate, router: `/users/${users._id}`});
            });
        } catch (error) {
            res.render('users/index');
        }
    }
   async showForm(req, res){
        try {
            if(req.params.id){
               await User.findById(req.params.id)
               .then((user) => {
                 res.render('users/update',{
                     user: user.toObject(),
                     messages: req.flash('error')
                 })
               });
            }else{
                res.render('users/create',{ messages: {...req.flash('error')[0]}})
            }
        } catch (error) {
            
        }
    }
   async create(req, res){
      try {
        const formData = {...req.body};
        const user = new User(formData);
        user.save();
        res.redirect('users/alert/success');
      } catch (error) {
         res.redirect('users/alert/error');
      }
    }
    notification(req, res, next){
        res.render('users/alertsStatus', {
            message: req.params.status == "success" ? 'thành công' : 'có lỗi xây ra',
            nextRoute: '/users',
            status: req.params.status
        })
    }
   async edit (req, res) {
      try {
        await User.updateOne({_id: req.params.id},  { $set: req.body })
        res.redirect('users/alert/success');
      }catch (error) {
        res.redirect('users/alert/error');
      }
    }
    async remove (req, res) {
        try {
           await User.deleteOne({_id: req.params.id })
            res.redirect('users/alert/success');
          }catch (error) {
            res.redirect('users/alert/error');
          }
    }
}

module.exports = new UserController();