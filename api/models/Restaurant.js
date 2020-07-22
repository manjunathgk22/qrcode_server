const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(restaurant) {
    // restaurant.password = bcryptService().password(restaurant); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'restaurants';
const restaurant = sequelize.define('restaurant', {
  name: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  logo: {
    type: Sequelize.STRING
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  gstid: {
    type: Sequelize.STRING,
    unique: true,
  },
}, { hooks, tableName });

// eslint-disable-next-line
restaurant.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = restaurant;
