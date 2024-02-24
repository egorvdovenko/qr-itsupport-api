const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');
const User = require('./user');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Service.hasMany(User, { foreignKey: 'serviceId', as: 'users' });
User.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

module.exports = Service;
