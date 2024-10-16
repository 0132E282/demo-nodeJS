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
                res.render('index', { users, paginate, router: `/users/${users._id}`});
            });
        } catch (error) {
            res.render('index');
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
                 // gửi đi người dùng tìm kiếm, thông tinh error form khi người dùng thực không thành công middleware  cập nhập
                 res.render('update',{
                     user: user.toObject(),
                     messages: req.flash('error')
                 })
               });
            }else{
                  //thông tinh error form khi người dùng thực không thành công middleware  tạo
                res.render('create',{ messages: {...req.flash('error')[0]}})
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
        res.redirect('alert/success');
      } catch (error) {
         res.redirect('alert/error');
      }
    }
    //  message user when update or create
    notification(req, res, next){
        res.render('alertsStatus', {
            message: req.params.status == "success" ? 'thành công' : 'có lỗi xây ra',
            nextRoute: '/users',
            status: req.params.status
        })
    }
    // update update 
    // [id] users
   async edit (req, res) {
      try {
        const user = await User.updateOne({_id: req.params.id},  { $set: req.body })
        res.redirect('alert/success');
      }catch (error) {
        res.redirect('alert/error');
      }
    }
    //  delete one user
    async remove (req, res) {
        try {
           await User.deleteOne({_id: req.params.id })
            res.redirect('alert/success');
          }catch (error) {
            res.redirect('alert/error');
          }
    }
}

module.exports = new UserController();
