
const Order = require('../models/Orders');
const MenuItem = require('../models/MenuItem')
const multiparty = require('multiparty');
const menu = require('../models/Menu');

const OrderController = () => {

    const create = async (req, res) => {
        const { body } = req;

        if(!body.menu_item_id || !body.qrcode_id) {
            return res.status(400).json({ msg: 'Bad Request: name or cost or category id not found' });
        }
        
        try {

            const menuitem = await MenuItem.findOne({
                where:{
                    id:body.menu_item_id
                }
            })

            if(!menuitem){
                return res.status(400).json({ msg: 'Bad Request: menu item  not found' });
            }

            const obj = {
                name: menuitem.name,
                description: menuitem.description,
                cost: menuitem.cost
            }

            const response = await Order.create({
                menu_item_id: body.menu_item_id,
                qrcode_id: body.qrcode_id,
                ...obj
            });
            return res.status(200).json({ response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const getAll = async (req, res) => {
        try {
            const menus = await Order.findAll();
            
            return res.status(200).json({ menus });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const update = async (req, res)=>{

        if(!req.body.status) {
            return res.status(400).json({ msg: 'Bad Request: name or cost or category id not found' });
        }
        try {
            const id = req.body.id;
            const order = await Order
            .findOne({
                where: {
                id,
                },
            });
            order.update({
              status: req.body.status
            })
        } catch (error) {
          return res.status(500).json({msg:'Internal server error'})
        }
      }

    return {
        create,
        getAll,
        update
    };
};

module.exports = OrderController;
