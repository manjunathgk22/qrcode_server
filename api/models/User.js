const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');
const Restaurants = require('../models/Restaurant');
const sequelize = require('../../config/database');
const QrCode = require('../models/QrCode');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    initialAutoIncrement: 1000
  },
  username: {
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
User.belongsTo(Restaurants, { foreignKey: {name: 'restaurant_id'}, foreignKeyConstraint: true });
Restaurants.hasOne(User)
Restaurants.hasMany(QrCode)
// User.belongsTo(Restaurants);
module.exports = User;
