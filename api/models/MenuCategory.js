
const Sequelize = require('sequelize');
const Restaurants = require('./Restaurant');
const sequelize = require('../../config/database');
const Qrcode = require('./QrCode');
const menu = require('./Menu');

const hooks = {
  beforeCreate() {
    // restaurant.password = bcryptService().password(restaurant); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'menu_category';
const menuCategory = sequelize.define('menucategory', {
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


menuCategory.belongsTo(menu, { foreignKey: {name: 'menu_id', allowNull:false}, foreignKeyConstraint: true });

menu.hasMany(menuCategory)

// eslint-disable-next-line
menuCategory.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = menuCategory;
