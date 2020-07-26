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
  'GET /restaurant/getrestaurant': 'RestaurantController.getSingleRestaurant',
  'PUT /restaurant/update' : 'RestaurantController.update',
  'GET /users': 'UserController.getAll',
  'POST /qrcode/generate' : 'QrcodeController.create',
  'GET /qrcode/getqrcodes': 'QrcodeController.getAll',
  'POST /menu/create' : 'MenuController.create',
  'PUT /menu/update' : 'MenuController.update',
  'GET /menus/getmenus': 'MenuController.getMenus',
  'POST /menucategory/create' : 'MenuCategoryController.create',
  'PUT /menucategory/update' : 'MenuCategoryController.update',
  'GET /menucategory/getcategories': 'MenuCategoryController.getAll',
  'POST /menuitem/create' : 'MenuItemController.create',
  'PUT /menuitem/update' : 'MenuItemController.update',
  'GET /menuitem/getitem': 'MenuItemController.getAll',

  'POST /service/create' : 'ServiceController.create',
  'GET /services/getmenus': 'ServiceController.getAll',
  'POST /servicecategory/create' : 'ServiceCategoryController.create',
  'GET /servicecategory/getcategories': 'ServiceCategoryController.getAll',
  'POST /serviceitem/create' : 'ServiceItemController.create',
  'GET /serviceitem/getitem': 'ServiceItemController.getAll',
  'POST /uploadStatic' : {
    path: 'UploadController.staticUpload',
    middlewares : [upload.single('file')]
  },
  'POST /order/create' : 'OrderController.create',
  'GET /order/getorders': 'OrderController.getAll',
  'POST /bill/create' : 'BillController.create',
};

module.exports = privateRoutes;
