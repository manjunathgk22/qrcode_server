
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

const tableName = 'menus';
const menu = sequelize.define('menu', {
    status:{
        type:Sequelize.BOOLEAN,
        defaultValue: true
    },
    name:{
      type:Sequelize.STRING
    }
}, { hooks, tableName });


menu.belongsTo(Qrcode, { foreignKey: {name: 'qrcode_id', allowNull:false}, foreignKeyConstraint: true });

Qrcode.hasOne(menu)


// eslint-disable-next-line
menu.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = menu;
