const User = require('../models/User')
const Qrcode = require("../models/QrCode");
const  QRCode = require('qrcode')
const { v4: uuidv4 } = require('uuid');
const menuItem = require('../models/MenuItem');
const menuCategory = require('../models/MenuCategory');
const ServiceItem = require('../models/ServiceItem');
const ServiceCategory = require('../models/ServiceCategory')
const menu = require('../models/Menu');
const Service = require('../models/Service')
const Sequelize = require('sequelize');
const service = require('../models/Service');
const pdfGenerator = require('../../utils/pdfgenerator')
const Restaurant = require('../models/Restaurant')
const Op = Sequelize.Op;

const QrcodeController = () => {
    const create = async (req, res) => {
        const { body } = req;
        let result = [];
        let content = []
        console.log(body);

        if(!body.name){
            return res.status(400).json({msg: 'Bad Request name not present'})
        }

        // FIND USER
        const userId = req.token && req.token.id;
        const user = await User
        .findOne({
            where: {
            id:userId,
            },
        });
        
        if(!user.restaurant_id){
            return res.status(400).json({ msg: 'Bad Request: RestaurantId not found' });
        }
        
        // GET restaurant details
        const restaurant = await Restaurant.findOne({
            id:user.restaurant_id
        })

        try {
            
            // Normalise Name
            const nameResponse = await Qrcode.findAll({
                where:{
                    name: { [Op.like]: `%${body.name}%`},
                    restaurant_id:user.restaurant_id,
                }
            })

            for(let i = nameResponse.length+1 ,j=0; j<body.numberOfqrcodes;j++, i++ ){
                // CREATE QRCODES
                let createObj = {
                    code: uuidv4(),
                    name:body.name + i,
                    restaurant_id: user.restaurant_id,
                    canonicalname: body.canonicalname || ''
                }
                if(body.menu_id){
                    createObj.menu_id = body.menu_id
                }
                const response = await Qrcode.create({
                    ...createObj
                });
                
                const datacode  = await QRCode.toDataURL(response.code)
                
                content.push({
                    text: restaurant.dataValues.name,
                    alignment:'center',
                    fontSize:22,
                    bold: true,
                    font : 'Roboto',
                    margin: [0, 0, 20, 0 ]
                },
                {
                    text:body.name + i,
                    fontSize:18,
                    alignment:'center'
                },
                {
                    image: datacode,
                    width: 300,
                    alignment:'center',
                    margin: [0, 0, 20, 0 ]
                },)
                result.push(response)
            }
            
            const pdf = await pdfGenerator({
                pageMargins: [10, 10, 10, 10],
                content: content,
            })
            return res.status(200).json({ data:{
                result,
                pdf
            } });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error " + (err.original? err.original.detail: '') });
        }
    };

    const getAll = async (req, res) => {
        try {
            const userId = req.token && req.token.id;
            const user = await User
            .findOne({
                where: {
                id:userId,
                },
            });
            
            if(!user.restaurant_id){
                return res.status(400).json({ msg: 'Bad Request: RestaurantId not found' });
            }

            const qrcodes = await Qrcode.findAll({
                where: {
                    restaurant_id: user.restaurant_id
                }
            });
            return res.status(200).json({ qrcodes });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const getMenus = async (req, res)=>{
        if(!req.body.id){
            return res.status(400).json({msg: "qrcode id not found"})
        }
        
        try {
            const {id} = await  menu.findOne({
                where:{qrcode_id: req.body.id}
            })
            
            const response = await menuCategory.findAll({
                where : {menu_id: id},
                include:[{
                    model: menuItem,
                    required:false,
                    on:{
                        menu_category_id: { [Op.eq]: Sequelize.col('menucategory.id') }
                        
                    }
                }]
            })

            const data = response.map(row => row.dataValues)
            console.log({response})
            console.log(response.length)
            return res.status(200).json({response: data})
        } catch (error) {
            console.log(error)
            return res.status(400).json({response: 'Internal Server error'})
        }
        
    }
    const getDetails = async (req, res)=>{
        if(!req.query.qrcode){
            return res.status(400).json({msg: "qrcode id not found"})
        }
        
        try {
            const qrObj = await  Qrcode.findOne({
                where:{
                    id: req.query.qrcode
                }
            })

            // const {id} = await  menu.findOne({
            //     where:{qrcode_id: qrCode.id}
            // })

            // const {id:serviceId} = await  service.findOne({
            //     where:{qrcode_id: req.body.id}
            // })
            
            
            // const serviceObj = await ServiceCategory.findAll({
            //     where : {service_id: serviceId},
            //     include:[{
            //         model: ServiceItem,
            //         required:false,
            //         on:{
            //             service_category_id: { [Op.eq]: Sequelize.col('servicecategory.id') }
                        
            //         }
            //     }]
            // })

            const response = await menuCategory.findAll({
                where : {menu_id: qrObj.menu_id},
                require:false,
                include:[{
                    model: menuItem,
                    required:false,
                    on:{
                        menu_category_id: { [Op.eq]: Sequelize.col('menucategory.id') }
                        
                    }
                }]
            })

            const menuData = response.map(row => row.dataValues)
            // const services = serviceObj.map(row => row.dataValues)
            console.log({response})
            console.log(response.length)
            return res.status(200).json({response: {menuData}})
        } catch (error) {
            console.log(error)
            return res.status(400).json({response: 'Internal Server error'})
        }
        
    }

    return {
        create,
        getAll,
        getMenus,
        getDetails
    };
};

module.exports = QrcodeController;
