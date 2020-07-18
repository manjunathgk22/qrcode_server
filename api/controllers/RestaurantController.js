const Restaurant = require('../models/Restaurant');

const RestaurantController = () => {
  const register = async (req, res) => {
    console.log(req);
    const { body } = req;
    console.log(body);
    try {
      const response = await Restaurant.create({
        name: body.name,
        address: body.address,
        gstid: body.gstid,
      });

      return res.status(200).json({ response });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getAll = async (req, res) => {
    try {
      const users = await Restaurant.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    register,
    getAll,
  };
};

module.exports = RestaurantController;
