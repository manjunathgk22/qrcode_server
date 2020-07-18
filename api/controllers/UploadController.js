const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const menuItem = require('../models/MenuItem');

const UploadController = () => {

    const staticUpload = async (req, res, next)=>{

        try {
            const menuitem = await MenuItem
        .findOne({
            where: {
            id:1,
            },
        });
        if(!menuitem){
            res.status(500).json({ msg: 'Internal server error: menuitem not found' });
        }
        const images = [...menuitem.dataValues.images, req.file.filename]

        response = await menuitem.update({
            images
        })
        return res.status(200).json({data:response.dataValues})
        } catch (error) {
            res.send(500)
        }
        
    }
    return {
        staticUpload
    }
};
module.exports = UploadController;
