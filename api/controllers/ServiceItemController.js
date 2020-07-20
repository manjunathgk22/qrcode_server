
const ServiceItem = require('../models/ServiceItem');

const ServiceItemController = () => {

    const create = async (req, res) => {
        const { body } = req;
        console.log(body);

        if(!body.name || !body.cost || !body.service_category_id) {
            return res.status(400).json({ msg: 'Bad Request: name or cost or category id not found' });
        }
        
        try {
            const response = await ServiceItem.create({
                service_category_id: body.service_category_id,
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
            const services = await ServiceItem.findAll();
            
            return res.status(200).json({ services });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal server error" });
        }
    };

    const update = async (req, res)=>{
        try {
            const id = req.body.id;
            const serviceItem = await ServiceItem
            .findOne({
                where: {
                id,
                },
            });
            let obj = {...serviceItem, ...req.body}
            obj.images = [...serviceItem.images, ...req.body.images||[]]
            serviceItem.update({
              ...obj
            })
        } catch (error) {
          return res.status(500).json({msg:'Internal server error'})
        }
      }

    return {
        create,
        getAll,
        update
    };
};

module.exports = ServiceItemController;
