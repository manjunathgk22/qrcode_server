const qrcode = require('../models/QrCode')

const CustomerController = ()=>{
    const qrMenu = async(req, res)=>{
        if(!req.body.id){
            return res.status(400).json({msg: "qrcode id not found"})
        }
        try {
            const qrCode = qrcode.findOne({
                where:{
                    id: req.body.id
                }
            })
            
            const response = await menuCategory.findAll({
                where : {menu_id: qrCode.menu_id},
                require:false,
                include:[{
                    model: menuItem,
                    required:false,
                    on:{
                        menu_category_id: { [Op.eq]: Sequelize.col('menucategory.id') }
                        
                    }
                }]
            })
            res.status(200).json({response})
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Internal Server Error'})
        }
        

    }
    return{
        qrMenu
    }
}

module.exports = CustomerController