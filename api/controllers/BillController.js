
const Order = require('../models/Orders');
const MenuItem = require('../models/MenuItem')
const multiparty = require('multiparty');
const Bill = require('../models/Bills');
const AppConstant = require('../../AppConstant');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const BillController = () => {

    const create = async (req, res) => {
        const { body } = req;

        if(!body.qrcode_id) {
            return res.status(400).json({ msg: 'Bad Request:  qrcode_id  not found' });
        }
        
        try {

            const orders = await Order.findAll({
                where:{
                    qrcode_id: body.qrcode_id,
                    status: { [Op.not]: AppConstant.ORDER_STATUS.billed}  
                }
            })
            if(!orders.length) {
                return res.status(400).json({ msg: 'No open orders' });
            }
            let amount = 0;
            let orders_id = [];

            orders.map(item =>{
                const values = item.dataValues;
                amount += item.cost;
                orders_id.push(item.id)
            })
            

            const response = await Bill.create({
                order_id: orders_id,
                qrcode_id: body.qrcode_id,
                amount,
            });

            if(!response){
                return res.status(500).json({ msg: "Internal server error: failed to generate Bill" });
            }

            const response1 = await Order.update({
                status: AppConstant.ORDER_STATUS.billed,
                },
                {
                where:{
                    id: {[Op.in]: orders_id}
                }
            })

            return res.status(200).json({ response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const getAll = async (req, res) => {
        try {
            const menus = await Order.findAll();
            
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

module.exports = BillController;
