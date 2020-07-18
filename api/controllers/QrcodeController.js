const User = require('../models/User')
const Qrcode = require("../models/QrCode");
const  QRCode = require('qrcode')
const { v4: uuidv4 } = require('uuid');

const QrcodeController = () => {
    const create = async (req, res) => {
        const { body } = req;
        console.log(body);

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
        
        try {
            const response = await Qrcode.create({
                code: uuidv4(),
                restaurant_id: user.restaurant_id,
                canonicalname: body.canonicalname
            });
            
            response.dataValues.datacode  = await QRCode.toDataURL(response.code)
            return res.status(200).json({ response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const getAll = async (req, res) => {
        try {
            const qrcodes = await Qrcode.findAll();
            

            return res.status(200).json({ qrcodes });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    return {
        create,
        getAll,
    };
};

module.exports = QrcodeController;
