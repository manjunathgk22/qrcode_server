
const Sequelize = require('sequelize');
const Restaurants = require('./Restaurant');
const sequelize = require('../../config/database');
const Qrcode = require('./QrCode');
const service = require('./Service');

const hooks = {
  beforeCreate() {
    // restaurant.password = bcryptService().password(restaurant); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'service_category';
const serviceCategory = sequelize.define('servicecategory', {
    status:{
        type:Sequelize.BOOLEAN,
        defaultValue: true
    },
    name:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.STRING,
        defaultValue:''
    }
}, { hooks, tableName });


serviceCategory.belongsTo(service, { foreignKey: {name: 'service_id', allowNull:false}, foreignKeyConstraint: true });

service.hasMany(serviceCategory)

// eslint-disable-next-line
serviceCategory.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = serviceCategory;
