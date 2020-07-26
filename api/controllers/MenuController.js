
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
        try {
        if(!body.qrcode || !body.qrcode.length){
            body.qrcode = []
            // return res.status(400).json({ msg: 'Bad Request: qrcode id not found' });
        }

        // FIND USER
        const userId = req.token && req.token.id;
        const user = await User
        .findOne({
            where: {
            id:userId,
            },
        });
        
        if(!user ||  !user.restaurant_id){
            return res.status(400).json({ msg: 'Bad Request: RestaurantId not found' });
        }
        
        // GET restaurant details
        const restaurantObj = await restaurant.findOne({
            id:user.restaurant_id
        })
        
        
            const menuCreated = await menu.create({
                name: body.name,
                restaurant_id:restaurantObj.id
            });
            for(let i=0,length=body.qrcode.length; i<length;i++){
                const qrcodeObj = await qrcode.findOne({
                    where:{
                        id:body.qrcode[i]
                    }
                })
                const qrupdate =  await qrcodeObj.update({
                    menu_id: menuCreated.id
                })
                console.log(qrupdate.dataValues)
            }
            return res.status(200).json({ response:menuCreated });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const update = async(req,res)=>{
        const { body } = req;

        console.log(body);
        try {
        if(!body.qrcode || !body.qrcode.length){
            body.qrcode = []
            // return res.status(400).json({ msg: 'Bad Request: qrcode id not found' });
        }

        // FIND USER
        const userId = req.token && req.token.id;
        const user = await User
        .findOne({
            where: {
            id:userId,
            },
        });
        
        if(!body.id){
            return res.status(400).json({ msg: 'Bad Request: menu id not found' });
        }
        if(!user ||  !user.restaurant_id){
            return res.status(400).json({ msg: 'Bad Request: RestaurantId not found' });
        }
        let menuObj = null
        if(body.name){
            menuObj = await menu.findOne({
                where: {
                    id:body.id
                }
            })
            menuObj.update({
                name: body.name,
                status: body.status || menuObj.status
            })
        }
        for(let i=0, length=body.qrcode.length; i< length;i++){
            const qrcodeObj = await qrcode.findOne({
                where:{
                    id: body.qrcode[i].id
                }
            })
            if(body.qrcode[i].selected){
                await qrcodeObj.update({
                    menu_id:body.id
                })
            }else{
                await qrcodeObj.update({
                    menu_id:null
                })
            }
        }
        
        return res.status(200).json({response:menuObj})


        }catch(e){
            console.log(e)
            return res.status(500).json({msg:'Internal Server error'})
        }
    }

    const getAll = async (req, res) => {
        try {
            const menus = await menu.findAll();
            
            return res.status(200).json({ menus });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    // const getMenus = async(req, res)=>{
    //     try {
    //         const userId = req.token && req.token.id;
    //         const user = await User
    //         .findOne({
    //             where: {
    //             id:userId,
    //             },
    //         });

    //         if(!user ||  !user.restaurant_id){
    //             return res.status(400).json({ msg: 'Bad Request: RestaurantId not found' });
    //         }

    //         const restaurantResponse = await restaurant.findOne({
    //             where:{
    //                 id:user.restaurant_id
    //             }
    //         })

    //         const qrcodes = await qrcode.findAll({
    //             where:{
    //                 restaurant_id:restaurantResponse.id
    //             }
    //         })
            
    //         let allMenuId =  [];
    //         qrcodes.map(item => {
    //             if(item.dataValues.menu_id){
    //                 allMenuId.push(item.dataValues.menu_id)
    //             }
    //         })

    //         const response = await menu.findAll({
    //             // group:['menu.name'],
    //             where : {id: {
    //                 [Op.in]: allMenuId
    //             }},
    //             include:[{
    //                 model: menuCategory,
    //                 required:false,
    //                 on:{
    //                     menu_id: { [Op.eq]: Sequelize.col('menu.id') }
    //                 },
    //                 include:[{
    //                     model: menuItem,
    //                     required:false,
    //                     on:{
    //                         menu_category_id: { [Op.eq]: Sequelize.col('menucategories.id') }
                            
    //                     }
    //                 }]
    //             }]
    //         })
    //         return res.status(200).json({response})
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({msg:'internal server error'})
    //     }
    // }

    const getMenus = async(req, res)=>{
        try {
            const userId = req.token && req.token.id;
            const user = await User
            .findOne({
                where: {
                id:userId,
                },
            });
            // FIND USER
            if(!user ||  !user.restaurant_id){
                return res.status(400).json({ msg: 'Bad Request: RestaurantId not found' });
            }

            const response = await menu.findAll({
                where:{
                    restaurant_id: user.restaurant_id,
                },
                include:[
                    {
                    model:qrcode,
                    required:false,
                    on:{
                        menu_id: { [Op.eq]: Sequelize.col('menu.id') }
                    }
                },
                {
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
        getMenus,
        update
    };
};

module.exports = MenuController;
