
const menu = require('../models/Menu');

const MenuController = () => {

    const create = async (req, res) => {
        const { body } = req;
        console.log(body);

        if(!body.qrcode_id){
            return res.status(400).json({ msg: 'Bad Request: qrcode id not found' });
        }
        
        try {
            const response = await menu.create({
                qrcode_id: body.qrcode_id
            });
            return res.status(200).json({ response });
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

    return {
        create,
        getAll,
    };
};

module.exports = MenuController;
