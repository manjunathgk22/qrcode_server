
const menuItem = require('../models/MenuItem');
const multiparty = require('multiparty');

const MenuItemController = () => {

    const create = async (req, res) => {
        const { body } = req;
        console.log(body);
        debugger;

        let form = new multiparty.Form();

        // form.parse(req, function(err, fields, files) {
        //     Object.keys(fields).forEach(function(name) {
        //         console.log('got field named ' + name);
        //     });
        // });

        if(!body.name || !body.cost || !body.menu_category_id) {
            return res.status(400).json({ msg: 'Bad Request: qrcode id not found' });
        }
        
        try {
            const response = await menuItem.create({
                menu_category_id: body.menu_category_id,
                name: body.name,
                description: body.description || '',
                cost : body.cost
            });
            return res.status(200).json({ response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const getAll = async (req, res) => {
        try {
            const menus = await menuItem.findAll();
            
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

module.exports = MenuItemController;
