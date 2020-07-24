const Restaurant = require('../models/Restaurant');
const User = require('../models/User')
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
        images : body.images || ['']
      });

      return res.status(200).json({ response });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const getSingleRestaurant = async (req, res)=>{
    try {
        const userId = req.token && req.token.id;
        const user = await User
        .findOne({
            where: {
            id:userId,
            },
        });
      
        const restaurant = await Restaurant
        .findOne({
            where: {
            id: user.dataValues.restaurant_id,
            },
        });
        res.status(200).json({response:restaurant})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg:'Internal server error'})
    }
  }

  const update = async (req, res)=>{
    try {
        const id = req.body.id;
        const restaurant = await Restaurant
        .findOne({
            where: {
            id,
            },
        });
        delete req.body.id;
        let obj = {...restaurant, ...req.body}
        obj.images = [...restaurant.images, ...req.body.images||[]]
        const response =  await restaurant.update({
          ...obj
        })
        return res.status(200).json({response})
    } catch (error) {
      console.log(error)
      return res.status(500).json({msg:'Internal server error'})
    }
  }

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
    update,
    getSingleRestaurant
  };
};

module.exports = RestaurantController;
