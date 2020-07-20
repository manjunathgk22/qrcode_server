
const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Qrcode = require('./QrCode');
const Orders = require('./Orders');
const AppConstant = require('../../AppConstant');

const hooks = {
  beforeCreate() {
    // restaurant.password = bcryptService().password(restaurant); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'bills';
const bill = sequelize.define('bill', {
    discount:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    amount:{
        type:Sequelize.FLOAT
    },  
    order_ids :{
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      
    }
}, { hooks, tableName });


bill.belongsTo(Qrcode, { foreignKey: {name: 'qrcode_id', allowNull:false}, foreignKeyConstraint: true });

Qrcode.hasOne(bill)

// eslint-disable-next-line
bill.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = bill;
