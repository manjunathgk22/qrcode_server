
const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const menuCategory = require('./MenuCategory');

const hooks = {
  beforeCreate() {
    // restaurant.password = bcryptService().password(restaurant); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'menuitems';
const menuItem = sequelize.define('menuitem', {
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
    },
    images:{
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
    },
    cost:{
        type:Sequelize.FLOAT
    } 
}, { hooks, tableName });


menuItem.belongsTo(menuCategory, { foreignKey: {name: 'menu_category_id', allowNull:false}, foreignKeyConstraint: true });


// eslint-disable-next-line
menuItem.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = menuItem;
