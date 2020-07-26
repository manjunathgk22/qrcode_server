
const Sequelize = require('sequelize');
const Restaurants = require('../models/Restaurant');
const sequelize = require('../../config/database');
const menu = require('./Menu');
const service = require('./Service')
// const menu = require('./Menu');

const hooks = {
  beforeCreate() {
    // restaurant.password = bcryptService().password(restaurant); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'qrcodes';
const qrcode = sequelize.define('qrcode', {
  
    code: {
        type: Sequelize.UUID,
    },
    canonicalname: {
        type: Sequelize.STRING,
        defaultValue:''
    },
    name:{
      type: Sequelize.STRING,
      unique: 'compositeIndex',
      allowNull:false
    },
    status:{
      type:Sequelize.BOOLEAN,
      defaultValue: true
    },
    occupied: {
      type:Sequelize.BOOLEAN,
      defaultValue: false
    }
}, { hooks, tableName });

qrcode.belongsTo(Restaurants, { foreignKey: {name: 'restaurant_id', unique: 'compositeIndex', allowNull:false}, foreignKeyConstraint: true });
qrcode.belongsTo(menu, {foreignKey: {name: 'menu_id'}})
qrcode.belongsTo(service, {foreignKey: {name: 'service_id'}})

Restaurants.hasMany(qrcode)
menu.hasMany(qrcode);
service.hasMany(qrcode);

// eslint-disable-next-line
qrcode.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = qrcode;
