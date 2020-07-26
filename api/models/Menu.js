
const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const restaurant = require('./Restaurant');


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


menu.belongsTo(restaurant, { foreignKey: {name: 'restaurant_id', allowNull:false}, foreignKeyConstraint: true });

// Qrcode.hasOne(menu)
restaurant.hasMany(menu)


// eslint-disable-next-line
menu.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = menu;
