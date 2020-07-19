const path = require("path")
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    cb(null, path.join(process.cwd(), '/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/-/g, '') +  Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })

const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'POST /qrcode/generate' : 'QrcodeController.create',
  'GET /qrcodes': 'QrcodeController.getAll',
  'POST /menu/create' : 'MenuController.create',
  'GET /menus/getmenus': 'MenuController.getAll',
  'POST /menucategory/create' : 'MenuCategoryController.create',
  'GET /menucategory/getcategories': 'MenuCategoryController.getAll',
  'POST /menuitem/create' : 'MenuItemController.create',
  'GET /menuitem/getitem': 'MenuItemController.getAll',
  'POST /uploadStatic' : {
    path: 'UploadController.staticUpload',
    middlewares : [upload.single('file')]
  },
  'POST /order/create' : 'OrderController.create',
  'GET /order/getorders': 'OrderController.getAll',
  'POST /bill/create' : 'BillController.create',
};

module.exports = privateRoutes;
