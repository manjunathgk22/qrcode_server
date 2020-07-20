
const service = require('../models/Service');

const ServiceController = () => {

    const create = async (req, res) => {
        const { body } = req;
        console.log(body);

        if(!body.qrcode_id){
            return res.status(400).json({ msg: 'Bad Request: qrcode id not found' });
        }
        
        try {
            const response = await service.create({
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
            const services = await service.findAll();
            
            return res.status(200).json({ services });
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

module.exports = ServiceController;
