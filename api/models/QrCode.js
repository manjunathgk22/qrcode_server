
const Sequelize = require('sequelize');
const Restaurants = require('../models/Restaurant');
const sequelize = require('../../config/database');

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
    status:{
      type:Sequelize.BOOLEAN,
      defaultValue: false
    }
}, { hooks, tableName });

qrcode.belongsTo(Restaurants, { foreignKey: {name: 'restaurant_id', allowNull:false}, foreignKeyConstraint: true });

// eslint-disable-next-line
qrcode.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = qrcode;