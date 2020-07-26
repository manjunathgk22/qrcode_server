
const menuItem = require('../models/MenuItem');
const multiparty = require('multiparty');

const MenuItemController = () => {

    const create = async (req, res) => {
        const { body } = req;
        console.log(body);

        if(!body.name || !body.cost || !body.menu_category_id) {
            return res.status(400).json({ msg: 'Bad Request: name or cost or category id not found' });
        }
        
        try {
            const response = await menuItem.create({
                menu_category_id: body.menu_category_id,
                name: body.name,
                description: body.description || '',
                cost : body.cost,
                images: body.images|| []
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

    const update = async (req, res)=>{
        try {
            const id = req.body.id;
            const menuitem = await menuItem
            .findOne({
                where: {
                id,
                },
            });
            if(req.body.id){
                delete req.body.id;
            }
            let obj = {...menuitem, ...req.body}
            obj.images = [...menuitem.images, ...req.body.images||[]]
            const response =  await menuitem.update({
                ...obj
            })
            return res.status(200).json({response})
        } catch (error) {
            console.log(error)
          return res.status(500).json({msg:'Internal server error'})
        }
      }

    return {
        create,
        getAll,
        update
    };
};

module.exports = MenuItemController;
