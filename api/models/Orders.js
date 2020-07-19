
const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Qrcode = require('./QrCode');
const menuItem = require('./MenuItem');
const AppConstant = require('../../AppConstant');

const hooks = {
  beforeCreate() {
    // restaurant.password = bcryptService().password(restaurant); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'orders';
const order = sequelize.define('order', {
    status:{
        type:Sequelize.STRING,
        defaultValue: AppConstant.ORDER_STATUS.open
    },
    name:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.STRING,
        defaultValue:''
    },
    cost:{
        type:Sequelize.FLOAT
    }  
    
}, { hooks, tableName });


order.belongsTo(menuItem, { foreignKey: {name: 'menu_item_id', allowNull:false}, foreignKeyConstraint: true });
order.belongsTo(Qrcode, { foreignKey: {name: 'qrcode_id', allowNull:false}, foreignKeyConstraint: true });


// eslint-disable-next-line
order.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = order;
