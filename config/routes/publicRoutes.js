const publicRoutes = {
  'POST /user': 'UserController.register',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',
  'POST /registerHotel': 'RestaurantController.register',
  'GET /getdetails' : 'QrcodeController.getDetails'
};

module.exports = publicRoutes;
