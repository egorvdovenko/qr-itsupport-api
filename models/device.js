const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');
const Ticket = require('./ticket');

const Device = sequelize.define('Device', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inventoryNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Device.hasMany(Ticket, { foreignKey: 'deviceId', as: 'tickets' });
Ticket.belongsTo(Device, { foreignKey: 'deviceId', as: 'device' });

module.exports = Device;
