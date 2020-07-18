
const menucategory = require('../models/MenuCategory');

const MenuCategoryController = () => {

    const create = async (req, res) => {
        const { body } = req;
        console.log(body);

        if(!body.name || !body.menu_id) {
            return res.status(400).json({ msg: 'Bad Request: qrcode id not found' });
        }
        
        try {
            const response = await menucategory.create({
                menu_id: body.menu_id,
                name: body.name,
                description: body.description || ''
            });
            return res.status(200).json({ response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const getAll = async (req, res) => {
        try {
            const menus = await menucategory.findAll();
            
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

module.exports = MenuCategoryController;
