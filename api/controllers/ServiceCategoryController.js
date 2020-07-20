
const servicecategory = require('../models/ServiceCategory');

const ServiceCategoryController = () => {

    const create = async (req, res) => {
        const { body } = req;
        console.log(body);

        if(!body.name || !body.service_id) {
            return res.status(400).json({ msg: 'Bad Request: qrcode id not found' });
        }
        
        try {
            const response = await servicecategory.create({
                service_id: body.service_id,
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
            const services = await servicecategory.findAll();
            
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

module.exports = ServiceCategoryController;
