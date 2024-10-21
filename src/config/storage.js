const multer = require('multer');
const path = require('path');
// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/storage')
      },
    filename: function (req, file, cb) {
        console.log(file);
        const extension =file && path.extname(file.originalname); // Lấy đuôi file
        cb(null, file.fieldname + '-' + Date.now() + extension); // Tạo tên file với đuôi
   }
});

// Export storage để sử dụng trong các file khác
const upload = multer({ storage: storage });

module.exports = upload;