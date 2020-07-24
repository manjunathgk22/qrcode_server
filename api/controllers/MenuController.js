
const menu = require('../models/Menu');
const User = require('../models/User');
const restaurant = require('../models/Restaurant');
const qrcode = require('../models/QrCode');
const menuCategory = require('../models/MenuCategory');
const menuItem = require('../models/MenuItem');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const MenuController = () => {

    const create = async (req, res) => {
        const { body } = req;
        const result = [];
        console.log(body);

        if(!body.qrcode || !body.qrcode.length){
            return res.status(400).json({ msg: 'Bad Request: qrcode id not found' });
        }
        
        try {
            for(let i=0,length=body.qrcode.length; i<length;i++){
                const response = await menu.create({
                    qrcode_id: body.qrcode[i],
                    name: body.name
                });
                result.push(response.dataValues)
            }
            return res.status(200).json({ response:result });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const getAll = async (req, res) => {
        try {
            const menus = await menu.findAll();
            
            return res.status(200).json({ menus });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const getMenus = async(req, res)=>{
        try {
            const userId = req.token && req.token.id;
            const user = await User
            .findOne({
                where: {
                id:userId,
                },
            });

            const restaurantResponse = await restaurant.findOne({
                where:{
                    id:user.restaurant_id
                }
            })

            const qrcodes = await qrcode.findAll({
                where:{
                    restaurant_id:restaurantResponse.id
                }
            })

            allQrcodes = qrcodes.map(item => item.dataValues.id)
            const response = await menu.findAll({
                where : {qrcode_id: {
                    [Op.in]: allQrcodes
                }},
                include:[{
                    model: menuCategory,
                    required:false,
                    on:{
                        menu_id: { [Op.eq]: Sequelize.col('menu.id') }
                        
                    },
                    include:[{
                        model: menuItem,
                        required:false,
                        on:{
                            menu_category_id: { [Op.eq]: Sequelize.col('menucategories.id') }
                            
                        }
                    }]
                }]
            })
            return res.status(200).json({response})
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg:'internal server error'})
        }
        
        


        
    }

    return {
        create,
        getAll,
        getMenus
    };
};

module.exports = MenuController;
