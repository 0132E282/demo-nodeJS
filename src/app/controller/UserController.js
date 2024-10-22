const User = require("../model/user");
const bcrypt = require('bcrypt');


class UserController {

    //  show the users
    //  ?[_limit] number item paginate
    //  ?[_page] number current page
    //  ?[search] find all user matched
   async index(req, res){
        try {
            const options = {}
            const page = Number(req.query._page) || 1;
            const limit = Number( req.query._limit) || 10;
            const skip = (page - 1) * limit;
            //  người dùng tìm kiếm
            if(req.query.search){
                options['$text'] =  { $search: req.query.search }
            }
            await User.find(options).skip(skip).limit(limit)
            .then(async (users)=>{
                // lấy tổng số lượng người dùng
                const totalPage = await User.countDocuments() ;
                // hiện thị thông tin trang
                const paginate = {
                    totalPage: Math.ceil(totalPage / limit) ?? 0,
                    currentPage: page,
                    limit: limit,
                    totalDocs: users.length,
                    prevPage: (page > 1) ? page - 1 : null,
                    nextPage: ((page * limit) < totalPage) ? page + 1 : null,
                }
                // chuyển đổi người dùng thành object
                users = users.map(user => user.toObject())
                res.render('users/index', { users, paginate, router: `/users/${users._id}`});
            });
        } catch (error) {
            res.render('users/index');
        }
    }
    // show form create/update users
    //  ?[id] user
   async showForm(req, res){
        try {
            // áp dụng cho người dùng cập nhập
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
                 // sữ lý lỗi
        }
    }
    // create new user
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
    //  message user when update or create
    notification(req, res, next){
        res.render('users/alertsStatus', {
            message: req.params.status == "success" ? 'thành công' : 'có lỗi xây ra',
            nextRoute: '/users',
            status: req.params.status
        })
    }
    // update update 
    // [id] users
   async edit (req, res) {
      try {
        await User.updateOne({_id: req.params.id},  { $set: req.body })
        res.redirect('users/alert/success');
      }catch (error) {
        res.redirect('users/alert/error');
      }
    }
    //  delete one user
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
