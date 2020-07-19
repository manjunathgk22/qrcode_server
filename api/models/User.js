const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');
const Restaurants = require('../models/Restaurant');
const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};
User.belongsTo(Restaurants, { foreignKey: {name: 'restaurant_id', allowNull:false}, foreignKeyConstraint: true });
// Restaurants.hasOne(User, { foreignKey : {name: 'id'}})
// User.belongsTo(Restaurants);
module.exports = User;
