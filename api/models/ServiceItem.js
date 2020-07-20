
const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const serviceCategory = require('./ServiceCategory');

const hooks = {
  beforeCreate() {
    // restaurant.password = bcryptService().password(restaurant); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'serviceitems';
const serviceItem = sequelize.define('serviceitem', {
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


serviceItem.belongsTo(serviceCategory, { foreignKey: {name: 'service_category_id', allowNull:false}, foreignKeyConstraint: true });

serviceCategory.hasMany(serviceItem)


// eslint-disable-next-line
serviceItem.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = serviceItem;
