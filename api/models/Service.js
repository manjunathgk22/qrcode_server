
const Sequelize = require('sequelize');
const Restaurants = require('../models/Restaurant');
const sequelize = require('../../config/database');
const Qrcode = require('./QrCode');
const menuCategory = require('./MenuCategory');

const hooks = {
  beforeCreate() {
    // restaurant.password = bcryptService().password(restaurant); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'services';
const service = sequelize.define('service', {
    status:{
        type:Sequelize.BOOLEAN,
        defaultValue: true
    }
}, { hooks, tableName });


service.belongsTo(Restaurants, { foreignKey: {name: 'restaurant_id', allowNull:false}, foreignKeyConstraint: true });

// Qrcode.hasOne(service)
Restaurants.hasMany(service)



// eslint-disable-next-line
service.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = service;
